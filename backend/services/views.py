from rest_framework import viewsets, permissions
from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('title')
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

# Create your views here.
