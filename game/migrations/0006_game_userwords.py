# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-12 06:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0005_game_currentturn'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='userWords',
            field=models.ManyToManyField(to='game.myDict'),
        ),
    ]
