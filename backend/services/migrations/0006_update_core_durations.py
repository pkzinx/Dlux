from django.db import migrations


def update_core_durations(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    target_map = {
        'corte': 40,
        'corte + barba': 60,
        # Alinhar variantes comuns
        'corte masculino': 40,
    }

    for title, minutes in target_map.items():
        for s in Service.objects.filter(title__iexact=title):
            s.duration_minutes = minutes
            s.save(update_fields=['duration_minutes'])


class Migration(migrations.Migration):
    dependencies = [
        ('services', '0005_update_more_durations'),
        ('services', '0004_update_durations'),
    ]

    operations = [
        migrations.RunPython(update_core_durations, migrations.RunPython.noop),
    ]