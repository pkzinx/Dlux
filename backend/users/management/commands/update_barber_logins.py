from django.core.management.base import BaseCommand
from django.db import transaction
from users.models import User


class Command(BaseCommand):
    help = "Atualiza/garante logins dos barbeiros com senha padrão."

    def handle(self, *args, **options):
        password = "102415@Kpm"
        target_usernames = ["Alafy", "Kaue", "Emerson", "Rikelv", "Kevin"]

        created_count = 0
        updated_count = 0

        with transaction.atomic():
            for name in target_usernames:
                # Procurar por username case-insensitive
                user = User.objects.filter(username__iexact=name).first()
                if user is None:
                    user = User(username=name)
                    created_count += 1
                else:
                    # Normalizar para grafia canônica
                    if user.username != name:
                        user.username = name
                    updated_count += 1

                # Garantir papel de barbeiro quando disponível
                if hasattr(User, 'BARBER'):
                    user.role = User.BARBER

                # Preencher display_name se vazio
                if getattr(user, 'display_name', '') in (None, ''):
                    user.display_name = name

                # Atualizar senha
                user.set_password(password)
                user.save()
                self.stdout.write(self.style.SUCCESS(f"Usuario '{name}' atualizado (id={user.id})"))

        self.stdout.write(self.style.NOTICE(f"Criados: {created_count}, Atualizados: {updated_count}"))