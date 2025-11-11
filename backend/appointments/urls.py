from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import AppointmentViewSet, PublicAppointmentCreate, PublicAppointmentCancel

router = DefaultRouter()
router.register(r'', AppointmentViewSet, basename='appointments')

# Ensure the public endpoint does not get shadowed by router detail routes
urlpatterns = [
    path('public/', PublicAppointmentCreate.as_view(), name='public_appointment_create'),
    path('cancel/', PublicAppointmentCancel.as_view(), name='public_appointment_cancel'),
] + router.urls