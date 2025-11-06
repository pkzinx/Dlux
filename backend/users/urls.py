from django.urls import path
from django.contrib.auth import views as auth_views
from .views import (
    painel_index,
    dashboard_barber,
    dashboard_admin,
    panel_appointments,
    panel_finances,
    panel_profile,
)

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/login/'), name='logout'),
    path('painel/', painel_index, name='painel_index'),
    path('painel/barbeiro/', dashboard_barber, name='dashboard_barber'),
    path('painel/admin/', dashboard_admin, name='dashboard_admin'),
    path('painel/agendamentos/', panel_appointments, name='panel_appointments'),
    path('painel/financas/', panel_finances, name='panel_finances'),
    path('painel/perfil/', panel_profile, name='panel_profile'),
]