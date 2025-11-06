from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer
from users.models import User


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
