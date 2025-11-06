from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in, user_logged_out

from .models import AuditLog
from appointments.models import Appointment
from sales.models import Sale


@receiver(post_save, sender=Appointment)
def log_appointment_change(sender, instance: Appointment, created, **kwargs):
    AuditLog.objects.create(
        actor=getattr(instance, '_actor', None),
        action='create' if created else 'update',
        target_type='Appointment',
        target_id=str(instance.pk),
        payload={
            'barber': instance.barber_id,
            'client_name': instance.client_name,
            'start': instance.start_datetime.isoformat(),
            'end': instance.end_datetime.isoformat(),
            'status': instance.status,
        }
    )


@receiver(post_save, sender=Sale)
def log_sale_change(sender, instance: Sale, created, **kwargs):
    AuditLog.objects.create(
        actor=getattr(instance, '_actor', None),
        action='create' if created else 'update',
        target_type='Sale',
        target_id=str(instance.pk),
        payload={
            'barber': instance.barber_id,
            'amount': str(instance.amount),
            'payment_method': instance.payment_method,
            'status': instance.status,
        }
    )


@receiver(user_logged_in)
def log_login(sender, user, request, **kwargs):
    AuditLog.objects.create(
        actor=user,
        action='login',
        target_type='User',
        target_id=str(user.pk),
        payload={'username': user.username}
    )


@receiver(user_logged_out)
def log_logout(sender, user, request, **kwargs):
    if user:
        AuditLog.objects.create(
            actor=user,
            action='logout',
            target_type='User',
            target_id=str(user.pk),
            payload={'username': user.username}
        )