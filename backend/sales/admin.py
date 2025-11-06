from django.contrib import admin
from .models import Sale


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'barber', 'amount', 'payment_method', 'status', 'created_at')
    list_filter = ('payment_method', 'status', 'barber')
    search_fields = ('barber__username',)

# Register your models here.
