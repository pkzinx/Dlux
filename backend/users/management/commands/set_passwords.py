from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Atualiza as senhas de usuários específicos pelo username (case-insensitive)."

    def handle(self, *args, **options):
        User = get_user_model()

        # Mapeamento solicitado pelo usuário
        mapping = {
            "Kevin": "Kevin842",
            "Kaue": "Kaue531",
            "Alafy": "Alafy297",
            "Rikelv": "Rikelv603",
            "Emerson": "Emerson914",
        }

        updated = 0
        missed = []

        for username, new_password in mapping.items():
            user = User.objects.filter(username__iexact=username).first()
            if not user:
                self.stdout.write(self.style.WARNING(f"Usuário não encontrado: {username}"))
                missed.append(username)
                continue

            user.set_password(new_password)
            user.save(update_fields=["password"])
            updated += 1
            self.stdout.write(self.style.SUCCESS(f"Senha atualizada: {user.username}"))

        self.stdout.write(self.style.NOTICE(f"Total atualizadas: {updated}"))
        if missed:
            self.stdout.write(self.style.WARNING(f"Não encontrados: {', '.join(missed)}"))