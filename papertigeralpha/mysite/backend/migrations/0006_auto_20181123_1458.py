# Generated by Django 2.1.3 on 2018-11-23 19:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20181123_1457'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='picture',
            new_name='files',
        ),
    ]