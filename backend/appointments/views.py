from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import status
from .models import Appointment
from services.models import Service
from django.db.models import Q
from .serializers import AppointmentSerializer
from users.models import User
from decimal import Decimal
from django.utils.text import slugify


class IsAdminOrOwnRecords(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj: Appointment):
        if request.user.role == User.ADMIN:
            return True
        return obj.barber_id == request.user.id


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all().order_by('start_datetime')
    serializer_class = AppointmentSerializer
    permission_classes = [IsAdminOrOwnRecords]

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        barber_id = self.request.query_params.get('barberId')
        if user.role == User.BARBER:
            qs = qs.filter(barber=user)
        elif barber_id:
            qs = qs.filter(barber_id=barber_id)
        date = self.request.query_params.get('date')
        if date:
            qs = qs.filter(start_datetime__date=date)
        return qs

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True, methods=['patch'], url_path='status')
    def update_status(self, request, pk=None):
        appt = self.get_object()
        status = request.data.get('status')
        if status not in dict(Appointment.STATUS_CHOICES):
            return Response({'detail': 'Status inválido.'}, status=400)
        appt.status = status
        appt.save()
        return Response(AppointmentSerializer(appt).data)


class PublicAppointmentCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        # Basic validation: ensure barber exists and is a barber
        barber_id = data.get('barber') or data.get('barberId')
        service_id = data.get('service') or data.get('serviceId')

        # Permitir resolução por nome/username do barbeiro
        if not barber_id:
            barber_name = data.get('barber_name') or data.get('barberName') or data.get('barberUsername')
            if barber_name:
                candidate = User.objects.filter(role=User.BARBER).filter(Q(username__iexact=barber_name) | Q(display_name__iexact=barber_name)).first()
                if candidate:
                    barber_id = candidate.id
                else:
                    # Se não existir, criar automaticamente um barbeiro com esse nome
                    base_username = slugify(barber_name) or 'barber'
                    username = base_username
                    suffix = 1
                    while User.objects.filter(username=username).exists():
                        username = f"{base_username}{suffix}"
                        suffix += 1
                    new_barber = User.objects.create(username=username, role=User.BARBER, display_name=barber_name)
                    new_barber.set_unusable_password()
                    new_barber.save()
                    barber_id = new_barber.id

        # Permitir resolução por título do serviço e criar se não existir
        if not service_id:
            service_title = data.get('service_title') or data.get('serviceTitle')
            if service_title:
                svc = Service.objects.filter(title__iexact=service_title).first()
                if not svc:
                    # Heurística simples para definir duração padrão
                    title_lower = service_title.lower()
                    duration = 30
                    if ('corte' in title_lower) and ('barba' in title_lower):
                        duration = 60
                    elif 'corte' in title_lower:
                        duration = 40
                    elif 'barba' in title_lower:
                        duration = 30
                    try:
                        svc = Service.objects.create(
                            title=service_title,
                            price=Decimal('0.00'),
                            duration_minutes=duration,
                            active=True,
                        )
                    except Exception:
                        svc = None
                if svc:
                    service_id = svc.id

        if not barber_id or not service_id:
            return Response({'detail': 'Barbeiro e serviço são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            barber = User.objects.get(pk=barber_id, role=User.BARBER)
        except User.DoesNotExist:
            return Response({'detail': 'Barbeiro inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        # Use serializer to validate and create
        payload = {
            'barber': barber.id,
            'client_name': data.get('client_name') or data.get('clientName'),
            'client_phone': data.get('client_phone') or data.get('clientPhone'),
            'service': service_id,
            'start_datetime': data.get('start_datetime') or data.get('startDatetime'),
            'end_datetime': data.get('end_datetime') or data.get('endDatetime'),
            'notes': data.get('notes')
        }
        serializer = AppointmentSerializer(data=payload)
        if serializer.is_valid():
            try:
                appt = serializer.save()
            except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(AppointmentSerializer(appt).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
