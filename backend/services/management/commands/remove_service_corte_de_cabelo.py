from django.core.management.base import BaseCommand
from services.models import Service


class Command(BaseCommand):
    help = "Remove serviços com título 'Corte de Cabelo' (case-insensitive)."

    def handle(self, *args, **options):
        qs = Service.objects.filter(title__iexact='Corte de Cabelo')
        count = qs.count()
        if count == 0:
            self.stdout.write(self.style.WARNING("Nenhum serviço 'Corte de Cabelo' encontrado."))
            return
        qs.delete()
        self.stdout.write(self.style.SUCCESS(f"Removidos {count} serviço(s) com título 'Corte de Cabelo'."))