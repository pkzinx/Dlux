from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Cria usuários iniciais: 3 barbeiros e 2 admins (Kaue e Alefi).'

    def handle(self, *args, **options):
        User = get_user_model()

        users_data = [
            {'username': 'kaue', 'password': 'ChangeMe123!', 'role': 'admin', 'display_name': 'Kaue'},
            {'username': 'alefi', 'password': 'ChangeMe123!', 'role': 'admin', 'display_name': 'Alefi'},
            {'username': 'kevin', 'password': 'ChangeMe123!', 'role': 'barber', 'display_name': 'Kevin'},
            {'username': 'barber1', 'password': 'ChangeMe123!', 'role': 'barber', 'display_name': 'Barbeiro 1'},
            {'username': 'barber2', 'password': 'ChangeMe123!', 'role': 'barber', 'display_name': 'Barbeiro 2'},
        ]

        for data in users_data:
            user, created = User.objects.get_or_create(username=data['username'], defaults={
                'role': data['role'],
                'display_name': data['display_name'],
            })
            if created:
                user.set_password(data['password'])
                if data['role'] == 'admin':
                    user.is_staff = True
                    user.is_superuser = True
                user.save()
                self.stdout.write(self.style.SUCCESS(f"Criado: {user.username} ({data['role']})"))
            else:
                self.stdout.write(self.style.WARNING(f"Já existe: {user.username}"))