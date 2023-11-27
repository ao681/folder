# Generated by Django 4.0.1 on 2022-02-04 10:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('checkout', '0001_initial'),
        ('store', '0003_product_pdf_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='customer',
        ),
        migrations.RemoveField(
            model_name='order',
            name='total',
        ),
        migrations.AddField(
            model_name='order',
            name='transaction',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, to='checkout.transaction'),
        ),
    ]
