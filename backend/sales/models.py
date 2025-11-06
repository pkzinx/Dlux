from django.db import models
from users.models import User
from appointments.models import Appointment


class Sale(models.Model):
    PAYMENT_METHODS = [
        ('cash', 'Dinheiro'),
        ('pix', 'Pix'),
        ('card', 'Cartão'),
    ]

    barber = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sales')
    appointment = models.ForeignKey(Appointment, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHODS)
    status = models.CharField(max_length=20, default='paid')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Venda {self.id} - {self.amount} ({self.payment_method})"

# Create your models here.
