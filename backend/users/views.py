from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse
import csv
from .models import User
from django.utils import timezone
from appointments.models import Appointment
from services.models import Service
from sales.models import Sale
from django.db.models import Sum, Count, Q
from django.core.paginator import Paginator



@login_required
def painel_index(request: HttpRequest):
    user: User = request.user  # type: ignore
    if user.role == User.BARBER:
        return redirect('dashboard_barber')
    return redirect('dashboard_admin')


@login_required
def dashboard_barber(request: HttpRequest):
    user: User = request.user  # type: ignore
    now = timezone.localtime()
    # Auto-concluir agendamentos passados
    Appointment.objects.filter(status='scheduled', end_datetime__lte=now).update(status='done')
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timezone.timedelta(days=1)

    appts_today = Appointment.objects.filter(
        barber=user,
        start_datetime__gte=today_start,
        start_datetime__lt=today_end,
    ).order_by('start_datetime')

    sales_today = Sale.objects.filter(
        barber=user,
        created_at__gte=today_start,
        created_at__lt=today_end,
        status='paid'
    )

    appts_done_today = appts_today.filter(status='done')
    appts_value_today = appts_done_today.aggregate(total=Sum('service__price'))['total'] or 0
    sales_value_today = sales_today.aggregate(total=Sum('amount'))['total'] or 0
    day_revenue = (appts_value_today or 0) + (sales_value_today or 0)

    kpis = {
        'appointments_count': appts_today.count(),
        'sales_count': sales_today.count(),
        'sales_total': day_revenue,
        'next_appointment': appts_today.first(),
    }

    return render(request, 'dashboard_barber.html', {
        'kpis': kpis,
        'appointments_today': appts_today,
    })


@login_required
def dashboard_admin(request: HttpRequest):
    now = timezone.localtime()
    # Auto-concluir agendamentos passados
    Appointment.objects.filter(status='scheduled', end_datetime__lte=now).update(status='done')
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timezone.timedelta(days=1)

    appts_today = Appointment.objects.filter(
        start_datetime__gte=today_start,
        start_datetime__lt=today_end,
    )
    sales_today = Sale.objects.filter(
        created_at__gte=today_start,
        created_at__lt=today_end,
        status='paid'
    )

    status_breakdown = appts_today.values('status').annotate(c=Count('id'))
    appts_done_today = appts_today.filter(status='done')
    appts_value_today = appts_done_today.aggregate(total=Sum('service__price'))['total'] or 0
    sales_value_today = sales_today.aggregate(total=Sum('amount'))['total'] or 0
    sales_total = (appts_value_today or 0) + (sales_value_today or 0)
    # Exibir número de barbeiros como 5
    barbers_count = 5

    return render(request, 'dashboard_admin.html', {
        'kpis': {
            'appointments_count': appts_today.count(),
            'sales_count': sales_today.count(),
            'sales_total': sales_total,
            'barbers_count': barbers_count,
        },
        'status_breakdown': status_breakdown,
        'appointments_today': appts_today.order_by('start_datetime')[:10],
    })


@login_required
def panel_appointments(request: HttpRequest):
    user: User = request.user  # type: ignore
    now = timezone.localtime()
    # Auto-concluir agendamentos passados
    Appointment.objects.filter(status='scheduled', end_datetime__lte=now).update(status='done')
    # Histórico completo, incluindo passados, mais recentes primeiro
    if user.role == User.ADMIN:
        qs = Appointment.objects.all().order_by('-start_datetime')
        is_admin = True
    else:
        qs = Appointment.objects.filter(barber=user).order_by('-start_datetime')
        is_admin = False

    # Exportação CSV
    if request.GET.get('export') == 'csv':
        rows = qs.select_related('barber', 'service').order_by('-start_datetime')
        response = HttpResponse(content_type='text/csv; charset=utf-8')
        response['Content-Disposition'] = 'attachment; filename="agendamentos.csv"'
        writer = csv.writer(response)
        if is_admin:
            writer.writerow(['Data', 'Hora', 'Barbeiro', 'Cliente', 'Telefone', 'Serviço', 'Status'])
        else:
            writer.writerow(['Data', 'Hora', 'Cliente', 'Telefone', 'Serviço', 'Status'])
        for a in rows:
            date_str = timezone.localtime(a.start_datetime).strftime('%d/%m/%Y')
            time_str = timezone.localtime(a.start_datetime).strftime('%H:%M')
            base = [date_str, time_str]
            if is_admin:
                base.append(getattr(a.barber, 'display_name', None) or getattr(a.barber, 'username', ''))
            base.extend([a.client_name, a.client_phone or '', getattr(a.service, 'title', ''), a.status])
            writer.writerow(base)
        return response

    # Paginação: 15 por página
    page_number = request.GET.get('page', 1)
    paginator = Paginator(qs, 15)
    page_obj = paginator.get_page(page_number)

    return render(request, 'panel_appointments.html', {
        'appointments_page': page_obj,
        'paginator': paginator,
        'is_admin': is_admin,
    })


@login_required
def panel_finances(request: HttpRequest):
    user: User = request.user  # type: ignore
    now = timezone.localtime()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timezone.timedelta(days=1)
    month_start = today_start.replace(day=1)

    sales_filter = {}
    appts_filter = {}
    is_admin = user.role == User.ADMIN
    if not is_admin:
        sales_filter['barber'] = user
        appts_filter['barber'] = user

    sales_today = Sale.objects.filter(created_at__gte=today_start, created_at__lt=today_end, **sales_filter)
    sales_month = Sale.objects.filter(created_at__gte=month_start, created_at__lt=today_end, **sales_filter)
    appts_completed_today = Appointment.objects.filter(status='done', start_datetime__gte=today_start, start_datetime__lt=today_end, **appts_filter)
    # Month-to-date done appointments (needed for KPIs and breakdowns)
    appts_month_done = Appointment.objects.filter(status='done', start_datetime__gte=month_start, start_datetime__lt=today_end, **appts_filter)

    # KPIs baseados em agendamentos concluídos + vendas pagas
    appts_today_value = appts_completed_today.aggregate(total=Sum('service__price'))['total'] or 0
    appts_month_value = appts_month_done.aggregate(total=Sum('service__price'))['total'] or 0
    sales_today_value = sales_today.filter(status='paid').aggregate(total=Sum('amount'))['total'] or 0
    sales_month_value = sales_month.filter(status='paid').aggregate(total=Sum('amount'))['total'] or 0
    kpis = {
        'today_revenue': (appts_today_value or 0) + (sales_today_value or 0),
        'month_revenue': (appts_month_value or 0) + (sales_month_value or 0),
        'sales_count': sales_today.count(),
        'appts_completed': appts_completed_today.count(),
    }

    # Participação do barbeiro (Hoje) baseada somente em serviços concluídos
    if not is_admin:
        uname = (user.username or '').lower()
        # Total de serviços concluídos do próprio barbeiro hoje
        self_services_today = appts_completed_today.aggregate(total=Sum('service__price'))['total'] or 0
        share_today = 0
        if uname in ['rikelv', 'emerson', 'kevin']:
            # 60% do total dos serviços do próprio barbeiro
            share_today = self_services_today * 0.60
        elif uname in ['kaue', 'alefi', 'alafy']:
            # 40% dos serviços dos três barbeiros + 100% dos próprios serviços
            others_q = Q(barber__username__iexact='rikelv') | Q(barber__username__iexact='emerson') | Q(barber__username__iexact='kevin')
            others_services_today = Appointment.objects.filter(
                status='done',
                start_datetime__gte=today_start,
                start_datetime__lt=today_end,
            ).filter(others_q).aggregate(total=Sum('service__price'))['total'] or 0
            share_today = (others_services_today * 0.40) + (self_services_today * 1.00)
        kpis['barber_share_today'] = round(share_today, 2)

    recent_sales = Sale.objects.filter(**sales_filter).order_by('-created_at')[:10]

    # Breakdowns for month-to-date (done appointments)
    breakdown_by_service = appts_month_done.values('service__id', 'service__title').annotate(
        count=Count('id'),
        total_value=Sum('service__price')
    ).order_by('-total_value')
    breakdown_by_barber = appts_month_done.values('barber__id', 'barber__display_name', 'barber__username').annotate(
        count=Count('id'),
        total_value=Sum('service__price')
    ).order_by('-total_value')

    # CSV export (month-to-date paid sales)
    if request.GET.get('export') == 'csv':
        rows = sales_month.filter(status='paid').select_related('barber').order_by('-created_at')
        response = HttpResponse(content_type='text/csv; charset=utf-8')
        response['Content-Disposition'] = 'attachment; filename="financas_mensal.csv"'
        writer = csv.writer(response)
        # Header differs for admin vs barber view
        if is_admin:
            writer.writerow(['Data', 'Hora', 'Barbeiro', 'Valor', 'Pagamento', 'Status'])
        else:
            writer.writerow(['Data', 'Hora', 'Valor', 'Pagamento', 'Status'])
        for s in rows:
            date_str = timezone.localtime(s.created_at).strftime('%d/%m/%Y')
            time_str = timezone.localtime(s.created_at).strftime('%H:%M')
            if is_admin:
                writer.writerow([
                    date_str,
                    time_str,
                    getattr(s.barber, 'display_name', None) or getattr(s.barber, 'username', ''),
                    str(s.amount),
                    s.get_payment_method_display(),
                    s.status,
                ])
            else:
                writer.writerow([
                    date_str,
                    time_str,
                    str(s.amount),
                    s.get_payment_method_display(),
                    s.status,
                ])
        return response

    return render(request, 'panel_finances.html', {
        'kpis': kpis,
        'recent_sales': recent_sales,
        'completed_today': appts_completed_today.order_by('end_datetime'),
        'is_admin': is_admin,
        'breakdown_by_service': breakdown_by_service,
        'breakdown_by_barber': breakdown_by_barber,
        'all_services': Service.objects.filter(active=True).order_by('title'),
    })


@login_required
def panel_profile(request: HttpRequest):
    # Dados já disponíveis via request.user
    return render(request, 'panel_profile.html')

# Create your views here.
