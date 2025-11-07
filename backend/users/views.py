from django.shortcuts import render, redirect
from decimal import Decimal, ROUND_HALF_UP
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse
import csv
from .models import User
from django.utils import timezone
from appointments.models import Appointment, TimeBlock
import datetime
from services.models import Service
from sales.models import Sale, Withdrawal
from audit.models import AuditLog
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
    now_local = timezone.localtime()
    # Auto-concluir agendamentos passados (comparação em UTC)
    Appointment.objects.filter(status='scheduled', end_datetime__lte=timezone.now()).update(status='done')
    today_start = now_local.replace(hour=0, minute=0, second=0, microsecond=0)
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
    now_local = timezone.localtime()
    # Auto-concluir agendamentos passados (comparação em UTC)
    Appointment.objects.filter(status='scheduled', end_datetime__lte=timezone.now()).update(status='done')
    today_start = now_local.replace(hour=0, minute=0, second=0, microsecond=0)
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
    now_local = timezone.localtime()
    # Auto-concluir agendamentos passados (comparação em UTC)
    Appointment.objects.filter(status='scheduled', end_datetime__lte=timezone.now()).update(status='done')
    # Histórico completo, incluindo passados, mais recentes primeiro
    special_all_view = (getattr(user, 'username', '') or '').lower() in ['kaue', 'alafy', 'alafi', 'alefi']
    if user.role == User.ADMIN or special_all_view:
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
    # Auto-concluir agendamentos passados (comparação em UTC)
    Appointment.objects.filter(status='scheduled', end_datetime__lte=timezone.now()).update(status='done')
    now = timezone.localtime()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timezone.timedelta(days=1)
    month_start = today_start.replace(day=1)

    sales_filter = {}
    appts_filter = {}
    is_admin = user.role == User.ADMIN
    # Usuários especiais (Kaue/Alafy) devem enxergar o resumo por serviço do mês
    # somado de todos os barbeiros, mesmo não sendo admin.
    special_full_access_usernames = {"kaue", "alafy", "alafi", "alefi"}
    is_special_finances_view = str(getattr(user, 'username', '')).lower() in special_full_access_usernames
    if not is_admin:
        sales_filter['barber'] = user
        appts_filter['barber'] = user

    # Handle withdrawal POST (Kaue/Alafy only)
    special_full_access_usernames = {"kaue", "alafy", "alafi", "alefi"}
    is_special_finances_view = str(getattr(user, 'username', '')).lower() in special_full_access_usernames
    if request.method == 'POST' and (not is_admin) and is_special_finances_view:
        amount_str = (request.POST.get('withdraw_amount') or '').strip().replace(',', '.')
        note = (request.POST.get('withdraw_note') or '').strip()
        try:
            amt = Decimal(amount_str)
            if amt <= 0:
                raise ValueError('Informe um valor positivo para retirada.')
        except Exception:
            # Ignore errors silently in view; template can show client-side validation
            amt = None
        if amt:
            w = Withdrawal.objects.create(user=user, amount=amt, note=note)
            # Audit log for withdrawal
            try:
                AuditLog.objects.create(
                    actor=user,
                    action='create',
                    target_type='Withdrawal',
                    target_id=str(w.pk),
                    payload={'amount': str(amt), 'note': note}
                )
            except Exception:
                pass

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
        # Concluídos Hoje deve incluir vendas registradas hoje
        'appts_completed': appts_completed_today.count() + sales_today.count(),
    }

    # Faturamento total do mês (todos os barbeiros) somente para Kaue/Alafy
    if (not is_admin) and is_special_finances_view:
        appts_month_all_value = Appointment.objects.filter(
            status='done',
            start_datetime__gte=month_start,
            start_datetime__lt=today_end,
        ).aggregate(total=Sum('service__price'))['total'] or 0
        sales_month_all_paid_value = Sale.objects.filter(
            created_at__gte=month_start,
            created_at__lt=today_end,
            status='paid',
        ).aggregate(total=Sum('amount'))['total'] or 0
        # Subtrair retiradas do mês para visão total
        withdrawals_month_total = Withdrawal.objects.filter(
            created_at__gte=month_start,
            created_at__lt=today_end,
        ).aggregate(total=Sum('amount'))['total'] or Decimal('0')
        kpis['month_total_all'] = ((appts_month_all_value or 0) + (sales_month_all_paid_value or 0)) - (withdrawals_month_total or Decimal('0'))

    # Participação do barbeiro (Mês) baseada somente em serviços concluídos
    if not is_admin:
        uname = (user.username or '').lower()
        # Total de serviços concluídos do próprio barbeiro no mês (appts_month_done já aplica filtro do barbeiro)
        self_services_month = appts_month_done.aggregate(total=Sum('service__price'))['total'] or Decimal('0')
        share_month: Decimal = Decimal('0')
        if uname in ['rikelv', 'emerson', 'kevin']:
            # 60% do total dos serviços do próprio barbeiro no mês
            share_month = self_services_month * Decimal('0.60')
        elif uname in ['kaue', 'alefi', 'alafy', 'alafi']:
            # 40% dos serviços dos três barbeiros (rikelv, emerson, kevin) no mês + 100% dos próprios serviços no mês
            others_q = Q(barber__username__iexact='rikelv') | Q(barber__username__iexact='emerson') | Q(barber__username__iexact='kevin')
            others_services_month = Appointment.objects.filter(
                status='done',
                start_datetime__gte=month_start,
                start_datetime__lt=today_end,
            ).filter(others_q).aggregate(total=Sum('service__price'))['total'] or Decimal('0')
            share_month = (others_services_month * Decimal('0.40')) + (self_services_month * Decimal('1.00'))
        # Garantir duas casas decimais
        kpis['barber_share_month'] = share_month.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)

    recent_sales = Sale.objects.filter(**sales_filter).order_by('-created_at')[:10]

    # Breakdowns for month-to-date (done appointments)
    # Fonte para o resumo por serviço:
    # - Admin: todos os barbeiros
    # - Kaue/Alafy: todos os barbeiros
    # - Demais barbeiros: apenas seus próprios serviços
    breakdown_source_qs = (
        Appointment.objects.filter(
            status='done',
            start_datetime__gte=month_start,
            start_datetime__lt=today_end,
        ) if (is_admin or is_special_finances_view) else appts_month_done
    )

    breakdown_by_service = breakdown_source_qs.values('service__id', 'service__title').annotate(
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
        'is_special_finances_view': is_special_finances_view,
        'can_withdraw': (not is_admin) and is_special_finances_view,
        'breakdown_by_service': breakdown_by_service,
        'breakdown_by_barber': breakdown_by_barber,
        'all_services': Service.objects.filter(active=True).order_by('title'),
    })


@login_required
def panel_profile(request: HttpRequest):
    # Permitir que barbeiros criem bloqueios de horários para o dia atual
    user: User = request.user  # type: ignore
    message = None
    message_type = 'success'

    # Seleção de data: padrão hoje, permite até 30 dias à frente
    today = timezone.localdate()
    max_date = today + timezone.timedelta(days=30)
    selected_date_str = request.POST.get('date') or request.GET.get('date')
    try:
        selected_date = datetime.date.fromisoformat(selected_date_str) if selected_date_str else today
    except Exception:
        selected_date = today

    # Clamp ao intervalo permitido
    if selected_date < today or selected_date > max_date:
        selected_date = today
        message = 'Data fora do intervalo permitido; ajustada para hoje.'
        message_type = 'danger'

    if request.method == 'POST' and user.role == User.BARBER:
        try:
            action = (request.POST.get('action') or '').strip()
            if action == 'unblock_one':
                blk_id = request.POST.get('block_id')
                if not blk_id:
                    raise ValueError('Bloco inválido para desbloqueio.')
                # Remover apenas bloqueios do próprio barbeiro na data selecionada
                deleted, _ = TimeBlock.objects.filter(id=blk_id, barber=user, date=selected_date).delete()
                if deleted:
                    message = 'Bloqueio removido com sucesso.'
                    try:
                        AuditLog.objects.create(
                            actor=user,
                            action='delete',
                            target_type='TimeBlock',
                            target_id=str(blk_id),
                            payload={'date': selected_date.isoformat(), 'type': 'unblock_one'}
                        )
                    except Exception:
                        pass
                else:
                    raise ValueError('Bloqueio não encontrado.')
            elif action == 'unblock_day':
                deleted, _ = TimeBlock.objects.filter(barber=user, date=selected_date).delete()
                if deleted:
                    message = 'Dia desbloqueado com sucesso.'
                    try:
                        AuditLog.objects.create(
                            actor=user,
                            action='delete',
                            target_type='TimeBlock',
                            target_id='ALL',
                            payload={'date': selected_date.isoformat(), 'type': 'unblock_day', 'deleted_count': deleted}
                        )
                    except Exception:
                        pass
                else:
                    message = 'Nenhum bloqueio para remover nesta data.'
            else:
                full_day = bool(request.POST.get('full_day'))
                reason = (request.POST.get('reason') or '').strip()
                if full_day:
                    blk = TimeBlock.objects.create(barber=user, date=selected_date, full_day=True, reason=reason)
                    message = 'Dia inteiro bloqueado com sucesso.'
                    try:
                        AuditLog.objects.create(
                            actor=user,
                            action='create',
                            target_type='TimeBlock',
                            target_id=str(blk.pk),
                            payload={'date': selected_date.isoformat(), 'full_day': True, 'reason': reason}
                        )
                    except Exception:
                        pass
                else:
                    start_str = request.POST.get('start_time')
                    end_str = request.POST.get('end_time')
                    if not start_str or not end_str:
                        raise ValueError('Informe início e fim do intervalo.')
                    try:
                        start_parts = [int(p) for p in start_str.split(':')]
                        end_parts = [int(p) for p in end_str.split(':')]
                        start_time = timezone.datetime.now().replace(hour=start_parts[0], minute=start_parts[1], second=0, microsecond=0).time()
                        end_time = timezone.datetime.now().replace(hour=end_parts[0], minute=end_parts[1], second=0, microsecond=0).time()
                    except Exception:
                        raise ValueError('Horários inválidos.')
                    blk = TimeBlock(barber=user, date=selected_date, start_time=start_time, end_time=end_time, full_day=False, reason=reason)
                    blk.clean()
                    blk.save()
                    message = 'Intervalo bloqueado com sucesso.'
                    try:
                        AuditLog.objects.create(
                            actor=user,
                            action='create',
                            target_type='TimeBlock',
                            target_id=str(blk.pk),
                            payload={
                                'date': selected_date.isoformat(),
                                'full_day': False,
                                'start_time': start_time.isoformat(),
                                'end_time': end_time.isoformat(),
                                'reason': reason,
                            }
                        )
                    except Exception:
                        pass
        except Exception as e:
            message_type = 'danger'
            message = str(e)

    blocks_day = TimeBlock.objects.filter(barber=user, date=selected_date).order_by('full_day', 'start_time')
    return render(request, 'panel_profile.html', {
        'message': message,
        'message_type': message_type,
        'blocks_today': blocks_day,
        'selected_date': selected_date,
        'min_date': today.strftime('%Y-%m-%d'),
        'max_date': max_date.strftime('%Y-%m-%d'),
    })

# Create your views here.

@login_required
def panel_history(request: HttpRequest):
    user: User = request.user  # type: ignore
    special_view = (getattr(user, 'username', '') or '').lower() in {'kaue', 'alafy'}
    if not special_view:
        return redirect('painel_index')

    # Mostrar apenas retiradas, bloqueios e edições de agendamentos
    from django.db.models import Q
    logs = AuditLog.objects.filter(
        Q(target_type__in=['Withdrawal', 'TimeBlock']) |
        Q(target_type='Appointment', action='update')
    ).select_related('actor').order_by('-timestamp')[:200]

    return render(request, 'panel_history.html', {
        'logs': logs,
    })
