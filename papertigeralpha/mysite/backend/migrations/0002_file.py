# Generated by Django 2.1.3 on 2018-11-23 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('filepath', models.FileField(null=True, upload_to='files/', verbose_name='')),
            ],
        ),
    ]