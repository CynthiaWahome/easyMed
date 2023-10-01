# Generated by Django 4.2.5 on 2023-10-01 08:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('inventory', '0001_initial'),
        ('patient', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LabTestCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=45)),
            ],
        ),
        migrations.CreateModel(
            name='PatientIdentifier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lab_number', models.CharField(max_length=45)),
                ('patient_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='patient.patient')),
            ],
        ),
        migrations.CreateModel(
            name='LabTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=45)),
                ('test_element', models.CharField(max_length=45)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('cost', models.CharField(max_length=45)),
                ('created_by', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('patient_identifier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laboratory.patientidentifier')),
                ('sale_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory.sale_order')),
            ],
        ),
        migrations.CreateModel(
            name='LabResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=45)),
                ('test_element', models.CharField(max_length=45)),
                ('value', models.CharField(max_length=45)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('patient_identifier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laboratory.patientidentifier')),
            ],
        ),
        migrations.CreateModel(
            name='LabReagent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('cas_number', models.CharField(max_length=255)),
                ('molecular_weight', models.DecimalField(decimal_places=2, max_digits=10)),
                ('purity', models.DecimalField(decimal_places=2, max_digits=10)),
                ('sale_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory.sale_order')),
            ],
        ),
    ]
