from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'barber', 'service', 'start_datetime', 'end_datetime', 'status')
    list_filter = ('status', 'barber', 'service')
    search_fields = ('client_name', 'client_phone')
    date_hierarchy = 'start_datetime'

# Register your models here.
