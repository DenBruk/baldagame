# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from models import Game
# Create your views here.
from django.contrib.auth.models import User
from django.shortcuts import render_to_response, redirect
from django.http import HttpResponse
from models import Game,myDict
from django.contrib import auth
import json
from channels import Group
from django.http import HttpResponse
from django.db.models.functions import Length
counter = 0
import random
def show(request,game_id):
    if request.user.is_authenticated():
        username = auth.get_user(request).username
        id = auth.get_user(request).id
        myGame = Game.objects.get(pk=game_id)

        args = {'particapants': myGame.particapants,'username':username,'id':id,'game_id':game_id,'startword':myGame.word}
        if myGame.currentTurn==0:
            return render_to_response('mainField.html', args)
        else:
            return HttpResponse(
                '<h1>Балда, Вы уже принимаете участие в одной игре, больше нельзя</h1><br> <a href="/balda/games/"> Перейти на главную </a>')
    else:
        return redirect('/auth/login')
    #return render_to_response('mainField.html',args)
def showGames(request):
    if request.user.is_authenticated():
        allGames = Game.objects.filter(GameStartStatus=0)
        username = auth.get_user(request).username
        args = {'allGames': allGames,'username':username}
        return render_to_response('activeGames.html', args)
    else:
        return redirect('/auth/login')
def joinGame(request,game_id):
    try:
        activeGame = Game.objects.get(particapants=request.user.id)
        print(type(game_id))
        if activeGame.pk == int(game_id):
            return redirect('/balda/game/' + game_id)
        else:
            return HttpResponse(
                '<h1>Вы уже принимаете участие в одной игре, больше нельзя</h1><br> <a href="/balda/games/"> Перейти на главную </a>')
    except:
        me = User.objects.get(pk=request.user.id)
        game = Game.objects.get(pk=game_id)
        game.particapants.add(me)
        game.save()
        return redirect('/balda/game/' + game_id)
def addGame(request):
    try:
        Game.objects.get(gameCreator=request.user.id)
        return HttpResponse('<h1>Вы создали уже одну игру, больше нельзя</h1><br> <a href="/balda/games/"> Перейти на главную </a>')
    except:
        fivelengthwords = myDict.objects.extra(where=["LENGTH(word) = 5"])
        print random.randint(0,len(fivelengthwords))
        startWord =  fivelengthwords[random.randint(0,len(fivelengthwords))]
        me = User.objects.get(pk=request.user.id)
        b = Game(gameCreator=me,word=startWord)
        b.save()
        game = Game.objects.get(gameCreator=me)
        game.particapants.add(me)
        game.save()
        return redirect('/balda/games/')



