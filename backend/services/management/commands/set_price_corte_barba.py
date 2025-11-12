from django.core.management.base import BaseCommand
from decimal import Decimal
from services.models import Service


class Command(BaseCommand):
    help = "Atualiza o preço de 'Corte + Barba' para 45,00 (case-insensitive)."

    def handle(self, *args, **options):
        target_title = 'Corte + Barba'
        new_price = Decimal('45.00')

        qs = Service.objects.filter(title__iexact=target_title)
        count = qs.count()
        if count == 0:
            self.stdout.write(self.style.WARNING("Serviço 'Corte + Barba' não encontrado."))
            return

        for s in qs:
            s.price = new_price
            s.save(update_fields=['price'])

        self.stdout.write(self.style.SUCCESS(f"Preço atualizado para R$ {new_price} em {count} registro(s)."))