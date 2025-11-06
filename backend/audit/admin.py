from django.contrib import admin
from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'actor', 'action', 'target_type', 'target_id')
    list_filter = ('action', 'target_type')
    search_fields = ('actor__username', 'target_type', 'target_id')

# Register your models here.
