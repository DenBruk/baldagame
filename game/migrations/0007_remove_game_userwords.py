# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-12 07:28
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0006_game_userwords'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='userWords',
        ),
    ]