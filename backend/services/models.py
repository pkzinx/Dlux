from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=120)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    duration_minutes = models.PositiveIntegerField(default=30)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

# Create your models here.
