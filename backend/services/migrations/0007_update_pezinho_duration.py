from django.db import migrations


def set_pezinho_duration(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    for s in Service.objects.filter(title__iexact='Pezinho perfil acabamento'):
        s.duration_minutes = 5
        s.save(update_fields=['duration_minutes'])


class Migration(migrations.Migration):
    dependencies = [
        ('services', '0006_update_core_durations'),
    ]

    operations = [
        migrations.RunPython(set_pezinho_duration, migrations.RunPython.noop),
    ]