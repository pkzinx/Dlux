from django.db import migrations


def fix_synonyms(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    # Ajustes de títulos já existentes com preço incorreto (0)
    fixes = {
        'Corte de Cabelo': '30.00',
        # adicione aqui outras variações conhecidas se necessário
    }
    for title, price in fixes.items():
        for s in Service.objects.filter(title__iexact=title):
            s.price = price
            s.active = True
            s.save(update_fields=['price', 'active'])


class Migration(migrations.Migration):
    dependencies = [
        ('services', '0002_update_prices'),
    ]

    operations = [
        migrations.RunPython(fix_synonyms, migrations.RunPython.noop),
    ]