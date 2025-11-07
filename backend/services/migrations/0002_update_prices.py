from django.db import migrations


def upsert_services(apps, schema_editor):
    Service = apps.get_model('services', 'Service')
    items = [
        ('Barba', '20.00'),
        ('Corte', '30.00'),
        ('Corte + Barba', '45.00'),
        ('Corte + Escova', '35.00'),
        ('Corte + Luzes', '70.00'),
        ('Corte + Sobrancelha', '35.00'),
        ('Escova', '10.00'),
        ('Hidratação', '25.00'),
        ('Luzes', '40.00'),
        ('Pezinho perfil acabamento', '10.00'),
        ('Progressiva', '50.00'),
        ('Sobrancelha', '20.00'),
        ('Tintura na barba', '25.00'),
    ]
    for title, price in items:
        obj, created = Service.objects.get_or_create(title=title, defaults={'price': price, 'duration_minutes': 30, 'active': True})
        if not created:
            obj.price = price
            obj.active = True
            obj.save(update_fields=['price', 'active'])


class Migration(migrations.Migration):
    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(upsert_services, migrations.RunPython.noop),
    ]