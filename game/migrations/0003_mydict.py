# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-08 20:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0002_auto_20171001_2014'),
    ]

    operations = [
        migrations.CreateModel(
            name='myDict',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=100)),
            ],
        ),
    ]
