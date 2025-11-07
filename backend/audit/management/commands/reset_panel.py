from django.core.management.base import BaseCommand
from django.db import transaction

from audit.models import AuditLog
from appointments.models import Appointment, TimeBlock
from sales.models import Sale, Withdrawal


class Command(BaseCommand):
    help = "Zera dados transacionais do painel (vendas, retiradas, agendamentos, bloqueios, logs). Mantém usuários e serviços."

    def add_arguments(self, parser):
        parser.add_argument('--yes', action='store_true', help='Confirma execução sem prompt')

    def handle(self, *args, **options):
        confirm = options.get('yes', False)
        if not confirm:
            self.stderr.write(self.style.WARNING('Use --yes para confirmar o reset.'))
            return

        with transaction.atomic():
            sales_deleted, _ = Sale.objects.all().delete()
            withdrawals_deleted, _ = Withdrawal.objects.all().delete()
            appts_deleted, _ = Appointment.objects.all().delete()
            blocks_deleted, _ = TimeBlock.objects.all().delete()
            logs_deleted, _ = AuditLog.objects.all().delete()

        self.stdout.write(self.style.SUCCESS(
            f"Reset concluído: vendas={sales_deleted}, retiradas={withdrawals_deleted}, agendamentos={appts_deleted}, bloqueios={blocks_deleted}, logs={logs_deleted}"
        ))