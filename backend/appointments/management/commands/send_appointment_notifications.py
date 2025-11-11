from django.core.management.base import BaseCommand
from django.utils import timezone
from appointments.models import Appointment, NotificationSubscription, AppointmentNotification
from appointments.fcm import send_push
import datetime


class Command(BaseCommand):
    help = 'Envio de notificações push para agendamentos: 30 minutos (saudação) e 10 minutos (alerta).'

    def handle(self, *args, **options):
        now = timezone.now()
        # Janela de 1 min para capturar eventos, assumindo execução a cada minuto
        window_30_start = now + datetime.timedelta(minutes=30)
        window_30_end = now + datetime.timedelta(minutes=31)
        window_10_start = now + datetime.timedelta(minutes=10)
        window_10_end = now + datetime.timedelta(minutes=11)

        # Selecionar agendamentos ativos nas janelas
        appts_30 = Appointment.objects.filter(
            status=Appointment.STATUS_SCHEDULED,
            start_datetime__gte=window_30_start,
            start_datetime__lt=window_30_end,
        )
        appts_10 = Appointment.objects.filter(
            status=Appointment.STATUS_SCHEDULED,
            start_datetime__gte=window_10_start,
            start_datetime__lt=window_10_end,
        )

        sent_count = 0

        # 30 minutos: saudação
        for appt in appts_30:
            if AppointmentNotification.objects.filter(appointment=appt, type=AppointmentNotification.TYPE_GREETING_30).exists():
                continue
            subs = NotificationSubscription.objects.filter(appointment=appt)
            if not subs.exists():
                continue
            # Mensagem
            barber_name = getattr(appt.barber, 'display_name', None) or getattr(appt.barber, 'username', '')
            service_title = getattr(appt.service, 'title', '')
            start_local = timezone.localtime(appt.start_datetime).strftime('%H:%M')
            title = f'Lembrete: {service_title} às {start_local}'
            body = f'Olá! {barber_name} te espera para {service_title} em 30 minutos.'
            data = {'type': 'greeting_30', 'appointmentId': str(appt.id), 'service': service_title}
            any_sent = False
            for s in subs:
                ok = send_push(s.token, title, body, data)
                any_sent = any_sent or ok
            if any_sent:
                AppointmentNotification.objects.create(appointment=appt, type=AppointmentNotification.TYPE_GREETING_30)
                sent_count += 1

        # 10 minutos: alerta
        for appt in appts_10:
            if AppointmentNotification.objects.filter(appointment=appt, type=AppointmentNotification.TYPE_ALERT_10).exists():
                continue
            subs = NotificationSubscription.objects.filter(appointment=appt)
            if not subs.exists():
                continue
            barber_name = getattr(appt.barber, 'display_name', None) or getattr(appt.barber, 'username', '')
            service_title = getattr(appt.service, 'title', '')
            start_local = timezone.localtime(appt.start_datetime).strftime('%H:%M')
            title = f'Alerta: {service_title} às {start_local} em 10 minutos'
            body = f'Não esqueça! Seu horário de {service_title} com {barber_name} é em 10 minutos.'
            data = {'type': 'alert_10', 'appointmentId': str(appt.id), 'service': service_title}
            any_sent = False
            for s in subs:
                ok = send_push(s.token, title, body, data)
                any_sent = any_sent or ok
            if any_sent:
                AppointmentNotification.objects.create(appointment=appt, type=AppointmentNotification.TYPE_ALERT_10)
                sent_count += 1

        self.stdout.write(self.style.SUCCESS(f'Notificações enviadas: {sent_count}'))