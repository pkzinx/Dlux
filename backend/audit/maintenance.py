from django.db import transaction
from django.utils import timezone

from .models import MaintenanceRun, AuditLog
from appointments.models import Appointment
from sales.models import Sale


def monthly_purge_if_due():
    today = timezone.localdate()
    # Executar somente no dia 5 de cada mês
    if today.day != 5:
        return
    with transaction.atomic():
        mr, _ = MaintenanceRun.objects.select_for_update().get_or_create(name='monthly_purge')
        # Evitar reexecução no mesmo mês
        if mr.last_run_date and mr.last_run_date.year == today.year and mr.last_run_date.month == today.month:
            return

        # Purga dos dados transacionais para manter banco leve
        # Observação: mantemos usuários e serviços
        Sale.objects.all().delete()
        Appointment.objects.all().delete()
        AuditLog.objects.all().delete()

        mr.last_run_date = today
        mr.save(update_fields=['last_run_date'])