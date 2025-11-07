from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('audit', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MaintenanceRun',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, unique=True)),
                ('last_run_date', models.DateField(blank=True, null=True)),
            ],
        ),
    ]