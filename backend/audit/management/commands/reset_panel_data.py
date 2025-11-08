from django.core.management.base import BaseCommand
from django.db import transaction

from appointments.models import Appointment, TimeBlock
from sales.models import Sale, Withdrawal
from audit.models import AuditLog


class Command(BaseCommand):
    help = "Reseta dados operacionais do painel (agendamentos, bloqueios, vendas, retiradas e logs)."

    def add_arguments(self, parser):
        parser.add_argument(
            '--keep-logs', action='store_true', default=False,
            help='Mantém AuditLog (por padrão, os logs são removidos)'
        )

    @transaction.atomic
    def handle(self, *args, **options):
        keep_logs = options.get('keep_logs', False)

        self.stdout.write(self.style.WARNING('Iniciando reset de dados operacionais...'))

        # Remover vendas primeiro para evitar referências a agendamentos
        sales_deleted, _ = Sale.objects.all().delete()
        self.stdout.write(f"Vendas removidas: {sales_deleted}")

        withdrawals_deleted, _ = Withdrawal.objects.all().delete()
        self.stdout.write(f"Retiradas removidas: {withdrawals_deleted}")

        # Remover agendamentos e bloqueios
        appointments_deleted, _ = Appointment.objects.all().delete()
        self.stdout.write(f"Agendamentos removidos: {appointments_deleted}")

        blocks_deleted, _ = TimeBlock.objects.all().delete()
        self.stdout.write(f"Bloqueios removidos: {blocks_deleted}")

        if not keep_logs:
            logs_deleted, _ = AuditLog.objects.all().delete()
            self.stdout.write(f"Logs removidos: {logs_deleted}")
        else:
            self.stdout.write("Logs mantidos por opção --keep-logs")

        self.stdout.write(self.style.SUCCESS('Reset concluído com sucesso.'))