# Generated by Django 2.1.3 on 2018-12-16 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_researcher_max_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='researcher',
            name='max_id',
            field=models.IntegerField(default=1),
        ),
    ]
