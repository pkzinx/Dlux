from django.db import models
from users.models import User


class AuditLog(models.Model):
    ACTIONS = [
        ('create', 'Create'),
        ('update', 'Update'),
        ('delete', 'Delete'),
        ('login', 'Login'),
        ('logout', 'Logout'),
    ]

    actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=16, choices=ACTIONS)
    target_type = models.CharField(max_length=64)
    target_id = models.CharField(max_length=64)
    payload = models.JSONField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.timestamp} - {self.actor} - {self.action} {self.target_type}:{self.target_id}"

# Create your models here.


class MaintenanceRun(models.Model):
    name = models.CharField(max_length=64, unique=True)
    last_run_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} last={self.last_run_date}"
