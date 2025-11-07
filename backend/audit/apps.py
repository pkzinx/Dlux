from django.apps import AppConfig


class AuditConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'audit'
    def ready(self):
        from . import signals  # noqa
        # Dispara verificação de manutenção mensal no startup do app
        try:
            from .maintenance import monthly_purge_if_due
            monthly_purge_if_due()
        except Exception:
            # Nunca derrubar a app por falha de manutenção
            pass
