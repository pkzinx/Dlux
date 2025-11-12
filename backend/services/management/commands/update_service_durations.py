from django.core.management.base import BaseCommand
from services.models import Service


class Command(BaseCommand):
    help = "Atualiza durações dos serviços conforme solicitado (case-insensitive)."

    def handle(self, *args, **options):
        mapping = {
            "corte + luzes": 60,
            "corte + sobrancelha": 40,
            "pezinho perfil acabamento": 10,
            "progressiva": 60,
        }

        total_updated = 0
        for title, minutes in mapping.items():
            qs = Service.objects.filter(title__iexact=title)
            count = qs.count()
            for s in qs:
                s.duration_minutes = minutes
                s.save(update_fields=["duration_minutes"])
            if count:
                self.stdout.write(self.style.SUCCESS(f"Atualizado '{title}' para {minutes} minutos ({count} registro(s))"))
                total_updated += count
            else:
                self.stdout.write(self.style.WARNING(f"Serviço não encontrado: '{title}'"))

        self.stdout.write(self.style.NOTICE(f"Total de serviços atualizados: {total_updated}"))