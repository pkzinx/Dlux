from django.core.management.base import BaseCommand
from django.db import models
from users.models import User


class Command(BaseCommand):
    help = (
        "Remove os barbeiros 'barbeiro 1' e 'barbeiro 2' (username/display_name) "
        "e garante que exista apenas um barbeiro 'Kaue'."
    )

    def handle(self, *args, **options):
        removed = 0
        kept_kaue_id = None

        # Remover barbeiro 1 e 2 por username ou display_name (case-insensitive)
        to_delete = User.objects.filter(role=User.BARBER).filter(
            models.Q(username__iexact='barbeiro 1') | models.Q(display_name__iexact='barbeiro 1') |
            models.Q(username__iexact='barbeiro 2') | models.Q(display_name__iexact='barbeiro 2')
        )
        removed += to_delete.count()
        to_delete.delete()

        # Garantir apenas um Kaue
        kaue_qs = User.objects.filter(role=User.BARBER).filter(
            models.Q(username__iexact='kaue') | models.Q(display_name__iexact='kaue')
        ).order_by('id')
        if kaue_qs.exists():
            keep = kaue_qs.first()
            kept_kaue_id = keep.id
            duplicates = kaue_qs.exclude(id=keep.id)
            dup_count = duplicates.count()
            if dup_count:
                duplicates.delete()
                removed += dup_count

        self.stdout.write(self.style.SUCCESS(
            f"Concluído. Removidos {removed} registros. Kaue mantido com id={kept_kaue_id}."
        ))