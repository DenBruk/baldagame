# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-14 17:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0007_remove_game_userwords'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='word',
            field=models.CharField(default='\u0411\u0410\u041b\u0414\u0410', max_length=5),
        ),
    ]