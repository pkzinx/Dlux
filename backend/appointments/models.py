from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from users.models import User
from services.models import Service


class Appointment(models.Model):
    STATUS_SCHEDULED = 'scheduled'
    STATUS_DONE = 'done'
    STATUS_CANCELLED = 'cancelled'
    STATUS_CHOICES = [
        (STATUS_SCHEDULED, 'Agendado'),
        (STATUS_DONE, 'Finalizado'),
        (STATUS_CANCELLED, 'Cancelado'),
    ]

    barber = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': User.BARBER}, related_name='appointments')
    client_name = models.CharField(max_length=120)
    client_phone = models.CharField(max_length=32)
    service = models.ForeignKey(Service, on_delete=models.PROTECT)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default=STATUS_SCHEDULED)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['barber', 'start_datetime']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.client_name} - {self.service.title} ({self.start_datetime:%d/%m %H:%M})"

    def clean(self):
        # calcular end_datetime se não fornecido
        if not self.end_datetime and self.service:
            self.end_datetime = self.start_datetime + timezone.timedelta(minutes=self.service.duration_minutes)

        # validar conflito: (existing.start < new.end) AND (new.start < existing.end)
        if self.barber_id and self.start_datetime and self.end_datetime:
            qs = Appointment.objects.filter(barber=self.barber, status=self.STATUS_SCHEDULED)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            conflict = qs.filter(start_datetime__lt=self.end_datetime, end_datetime__gt=self.start_datetime).exists()
            if conflict:
                raise ValidationError('Conflito de horário: barbeiro já possui agendamento nesse intervalo.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

# Create your models here.
