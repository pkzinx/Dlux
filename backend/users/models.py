from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    BARBER = 'barber'
    ADMIN = 'admin'
    ROLE_CHOICES = [
        (BARBER, 'Barbeiro'),
        (ADMIN, 'Administrador'),
    ]

    role = models.CharField(max_length=16, choices=ROLE_CHOICES, default=BARBER)
    display_name = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    phone = models.CharField(max_length=32, blank=True)

    def __str__(self):
        return self.display_name or self.username

# Create your models here.
