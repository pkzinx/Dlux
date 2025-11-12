from django.core.management.base import BaseCommand
from django.db import transaction

from appointments.models import Appointment, TimeBlock
from sales.models import Sale, Withdrawal
from audit.models import AuditLog


class Command(BaseCommand):
    help = "Purge test data: appointments, time blocks, sales, withdrawals, audit logs. Users and services remain untouched."

    def handle(self, *args, **options):
        with transaction.atomic():
            # Delete sales first to avoid FK constraints to appointments
            sales_count = Sale.objects.count()
            Sale.objects.all().delete()

            withdrawals_count = Withdrawal.objects.count()
            Withdrawal.objects.all().delete()

            # Appointments and time blocks
            appt_count = Appointment.objects.count()
            Appointment.objects.all().delete()

            tblock_count = TimeBlock.objects.count()
            TimeBlock.objects.all().delete()

            # Audit logs
            audit_count = AuditLog.objects.count()
            AuditLog.objects.all().delete()

        self.stdout.write(self.style.SUCCESS(
            f"Purged data: Sales={sales_count}, Withdrawals={withdrawals_count}, Appointments={appt_count}, TimeBlocks={tblock_count}, AuditLogs={audit_count}"
        ))