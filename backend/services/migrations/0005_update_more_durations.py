from django.db import migrations


def update_more_durations(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    synonyms = {
        'corte de cabelo': 30,
    }
    for title, minutes in synonyms.items():
        for s in Service.objects.filter(title__iexact=title):
            s.duration_minutes = minutes
            s.save(update_fields=['duration_minutes'])


class Migration(migrations.Migration):
    dependencies = [
        ('services', '0004_update_durations'),
    ]

    operations = [
        migrations.RunPython(update_more_durations, migrations.RunPython.noop),
    ]