from django.db import migrations


def update_durations(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    # Mapeamento principal solicitado
    target_map = {
        'corte masculino': 30,
        'corte + barba': 45,
        'barba tradicional': 20,
        'corte degradê + barba': 60,
        'sobrancelha': 15,
        'corte infantil': 40,
        'corte + hidratação': 50,
        'pigmentação barba': 25,
        'camuflagem capilar': 30,
        'corte + barba + hidratação': 90,
    }

    # Sinônimos e títulos já existentes no sistema para alinhar durações
    synonyms = {
        'corte': 'corte masculino',
        'barba': 'barba tradicional',
        'tintura na barba': 'pigmentação barba',
    }

    # Atualizar por igualdade case-insensitive
    for title, minutes in target_map.items():
        for s in Service.objects.filter(title__iexact=title):
            s.duration_minutes = minutes
            s.save(update_fields=['duration_minutes'])

    # Aplicar sinônimos
    for existing_title, canonical in synonyms.items():
        minutes = target_map.get(canonical)
        if minutes:
            for s in Service.objects.filter(title__iexact=existing_title):
                s.duration_minutes = minutes
                s.save(update_fields=['duration_minutes'])


class Migration(migrations.Migration):
    dependencies = [
        ('services', '0003_fix_synonyms_prices'),
    ]

    operations = [
        migrations.RunPython(update_durations, migrations.RunPython.noop),
    ]