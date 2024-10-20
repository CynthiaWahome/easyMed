# Generated by Django 5.0.8 on 2024-08-24 10:13

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('inventory', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LabEquipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('category', models.CharField(choices=[('none', 'None'), ('rs232', 'RS232'), ('tcp', 'TCP'), ('netshare', 'NETSHARE')], default='none', max_length=10)),
                ('ip_address', models.GenericIPAddressField(null=True)),
                ('port', models.CharField(max_length=20, null=True)),
                ('data_format', models.CharField(choices=[('hl7', 'HL7'), ('astm', 'ASTM')], default='hl7', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='LabTestProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='ProcessTestRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reference', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Specimen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
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
                ('item_number', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory.item')),
            ],
        ),
        migrations.CreateModel(
            name='LabTestPanel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('unit', models.CharField(max_length=255)),
                ('ref_value_low', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('ref_value_high', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('is_qualitative', models.BooleanField(default=False)),
                ('is_quantitative', models.BooleanField(default=True)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory.item')),
                ('test_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laboratory.labtestprofile')),
                ('specimen', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='laboratory.specimen')),
            ],
        ),
        migrations.CreateModel(
            name='LabTestRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.TextField(null=True)),
                ('requested_on', models.TimeField(auto_now_add=True, null=True)),
                ('has_result', models.BooleanField(default=False)),
                ('created_on', models.DateField(auto_now_add=True)),
                ('requested_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('test_profile', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='laboratory.labtestprofile')),
                ('process', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='laboratory.processtestrequest')),
            ],
        ),
        migrations.CreateModel(
            name='LabTestRequestPanel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('result', models.CharField(max_length=45, null=True)),
                ('test_code', models.CharField(max_length=100, null=True)),
                ('category', models.CharField(default='none', max_length=30)),
                ('result_approved', models.BooleanField(default=False)),
                ('approved_on', models.DateTimeField(blank=True, null=True)),
                ('lab_test_request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laboratory.labtestrequest')),
                ('test_panel', models.ForeignKey(on_delete=models.SET('Deleted Panel'), to='laboratory.labtestpanel')),
            ],
        ),
        migrations.CreateModel(
            name='EquipmentTestRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('equipment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laboratory.labequipment')),
                ('test_request_panel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laboratory.labtestrequestpanel')),
            ],
        ),
        migrations.CreateModel(
            name='PatientSample',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_sample_code', models.CharField(max_length=100)),
                ('is_sample_collected', models.BooleanField(default=False)),
                ('lab_test_request', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='laboratory.labtestrequest')),
                ('process', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='laboratory.processtestrequest')),
                ('specimen', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='laboratory.specimen')),
            ],
        ),
        migrations.AddField(
            model_name='labtestrequestpanel',
            name='patient_sample',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='laboratory.patientsample'),
        ),
        migrations.CreateModel(
            name='PublicLabTestRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appointment_date', models.DateField()),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('cancelled', 'Cancelled')], default='pending', max_length=10)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('date_changed', models.DateField(auto_now=True)),
                ('lab_request', models.FileField(blank=True, max_length=254, null=True, upload_to='Lab Test Requests/public-requests', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf', 'img', 'png', 'jpg'])])),
                ('sample_collected', models.BooleanField(blank=True, default=False, null=True)),
                ('sample_id', models.CharField(blank=True, max_length=100, null=True)),
                ('test_profile', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='laboratory.labtestprofile')),
            ],
        ),
    ]
