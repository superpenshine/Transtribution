# Generated by Django 3.0.2 on 2020-02-19 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_auto_20200212_0228'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='password',
            field=models.CharField(max_length=128),
        ),
    ]