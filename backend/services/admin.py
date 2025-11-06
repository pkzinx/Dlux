from django.contrib import admin
from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'duration_minutes', 'active')
    list_filter = ('active',)
    search_fields = ('title',)

# Register your models here.
