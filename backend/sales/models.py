from django.db import models
from users.models import User
from appointments.models import Appointment
from services.models import Service


class Sale(models.Model):
    PAYMENT_METHODS = [
        ('cash', 'Dinheiro'),
        ('pix', 'Pix'),
        ('card', 'Cartão'),
    ]

    barber = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sales')
    appointment = models.ForeignKey(Appointment, on_delete=models.SET_NULL, null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=200, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHODS)
    status = models.CharField(max_length=20, default='paid')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        label = self.description or (self.service.title if self.service else 'Venda')
        return f"{label} #{self.id} - {self.amount} ({self.payment_method})"

class Withdrawal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='withdrawals')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Retirada #{self.id} - {self.user.username} - {self.amount}"

# Create your models here.
