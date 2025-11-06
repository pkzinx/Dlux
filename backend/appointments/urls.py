from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import AppointmentViewSet, PublicAppointmentCreate

router = DefaultRouter()
router.register(r'', AppointmentViewSet, basename='appointments')

# Ensure the public endpoint does not get shadowed by router detail routes
urlpatterns = [
    path('public/', PublicAppointmentCreate.as_view(), name='public_appointment_create'),
] + router.urls