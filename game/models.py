# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.

class myDict(models.Model):
    word = models.CharField(max_length=100)

    def __unicode__(self):
        return self.word

class Game(models.Model):
    gameCreator = models.ForeignKey(User,
        on_delete=models.CASCADE,
        related_name="gameCreator_user")
    token = models.CharField(max_length=5)
    gameWinner = models.ForeignKey(settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="gameWinner_user",blank=True,null=True)
    particapants = models.ManyToManyField(User)
    Player1score = models.IntegerField(default=0)
    Player2score = models.IntegerField(default=0)
    Player3score = models.IntegerField(default=0)
    GameStartStatus = models.IntegerField(default=0)
    currentTurn = models.IntegerField(default=0)
    word = models.CharField(max_length=5,default='БАЛДА')

