from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest
from .models import User
from django.utils import timezone
from appointments.models import Appointment
from sales.models import Sale
from django.db.models import Sum, Count



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

    kpis = {
        'appointments_count': appts_today.count(),
        'sales_count': sales_today.count(),
        'sales_total': sales_today.aggregate(total=Sum('amount'))['total'] or 0,
        'next_appointment': appts_today.first(),
    }

    return render(request, 'dashboard_barber.html', {
        'kpis': kpis,
        'appointments_today': appts_today,
    })


@login_required
def dashboard_admin(request: HttpRequest):
    now = timezone.localtime()
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
    sales_total = sales_today.aggregate(total=Sum('amount'))['total'] or 0
    barbers_count = User.objects.filter(role=User.BARBER).count()

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
    end = now + timezone.timedelta(days=7)
    if user.role == User.ADMIN:
        qs = Appointment.objects.filter(start_datetime__gte=now, start_datetime__lte=end).order_by('start_datetime')
        is_admin = True
    else:
        qs = Appointment.objects.filter(barber=user, start_datetime__gte=now, start_datetime__lte=end).order_by('start_datetime')
        is_admin = False
    return render(request, 'panel_appointments.html', {
        'upcoming_appointments': qs,
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

    kpis = {
        'today_revenue': sales_today.filter(status='paid').aggregate(total=Sum('amount'))['total'] or 0,
        'month_revenue': sales_month.filter(status='paid').aggregate(total=Sum('amount'))['total'] or 0,
        'sales_count': sales_today.count(),
        'appts_completed': appts_completed_today.count(),
    }

    recent_sales = Sale.objects.filter(**sales_filter).order_by('-created_at')[:10]

    # Breakdowns for month-to-date (done appointments)
    appts_month_done = Appointment.objects.filter(status='done', start_datetime__gte=month_start, start_datetime__lt=today_end, **appts_filter)
    breakdown_by_service = appts_month_done.values('service__id', 'service__title').annotate(
        count=Count('id'),
        total_value=Sum('service__price')
    ).order_by('-total_value')
    breakdown_by_barber = appts_month_done.values('barber__id', 'barber__display_name', 'barber__username').annotate(
        count=Count('id'),
        total_value=Sum('service__price')
    ).order_by('-total_value')

    return render(request, 'panel_finances.html', {
        'kpis': kpis,
        'recent_sales': recent_sales,
        'completed_today': appts_completed_today.order_by('end_datetime'),
        'is_admin': is_admin,
        'breakdown_by_service': breakdown_by_service,
        'breakdown_by_barber': breakdown_by_barber,
    })


@login_required
def panel_profile(request: HttpRequest):
    # Dados já disponíveis via request.user
    return render(request, 'panel_profile.html')

# Create your views here.
