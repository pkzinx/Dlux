from django.core.management.base import BaseCommand
from decimal import Decimal
from services.models import Service


class Command(BaseCommand):
    help = "Normaliza preço de variações de 'Corte + Barba' para R$ 45,00 (case-insensitive)."

    def handle(self, *args, **options):
        new_price = Decimal('45.00')
        # Variações comuns: "corte + barba", "corte e barba", "corte & barba", com ou sem espaços
        patterns = [
            r'^corte\s*\+\s*barba$',
            r'^corte\s*e\s*barba$',
            r'^corte\s*&\s*barba$',
            r'^corte\s*\+\s*barba\s*$',
        ]

        total = 0
        for pat in patterns:
            qs = Service.objects.filter(title__iregex=pat)
            count = qs.count()
            for s in qs:
                s.price = new_price
                s.active = True
                s.save(update_fields=['price', 'active'])
            if count:
                self.stdout.write(self.style.SUCCESS(f"Atualizado {count} registro(s) via padrão '{pat}'."))
            total += count

        if total == 0:
            # Fallback: igualdade direta case-insensitive
            qs = Service.objects.filter(title__iexact='Corte + Barba')
            count = qs.count()
            for s in qs:
                s.price = new_price
                s.active = True
                s.save(update_fields=['price', 'active'])
            if count:
                self.stdout.write(self.style.SUCCESS(f"Atualizado {count} registro(s) via fallback 'Corte + Barba'."))
            total += count

        self.stdout.write(self.style.NOTICE(f"Total de serviços ajustados para R$ {new_price}: {total}"))