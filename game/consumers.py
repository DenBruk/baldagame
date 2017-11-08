# -*- coding: utf-8 -*-
import json
from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http
from game.models import myDict,Game

@channel_session_user_from_http
def ws_connect(message,game_id):
    Group('users').add(message.reply_channel)
    user_list = []
    myObj = Game.objects.filter(pk=game_id)
    for user in myObj[0].particapants.all():
        user_list.append(str(user))

    Group('users').send({
        'text': json.dumps({
            'username': message.user.username,
            'userlist': user_list,
            'game_id':game_id
        })
    })


@channel_session_user
def ws_disconnect(message):

    Group('users').send({
        'text': json.dumps({
        'username': message.user.username,
        })
    })
    Group('users').discard(message.reply_channel)

@channel_session_user
def ws_message(message):
    myJSON = json.loads(message.content['text'])
    try:
        word = myJSON['word']
        currentTurn = myJSON['currentTurn']
        word = word.lower()
        mWord = myDict.objects.filter(word=word)
        points = myJSON['points']
        currentUser = myJSON['currentUser']
        game_id = myJSON['game_id']
        userlist = myJSON['userlist']
        if (currentTurn==20):
            myGame = Game.objects.get(pk=game_id)
            if myGame.Player1score > myGame.Player2score > myGame.Player3score:
                winner = userlist[0]
            elif myGame.Player2score > myGame.Player1score > myGame.Player3score:
                winner = userlist[1]
            else:
                winner = userlist[2]
            Group('users').send({'text': json.dumps({"finishstatus" : "yes",
                                                     "winner": winner
                                                     })})
        if len(mWord) == 1:
            print "Информация:"
            print(userlist.index(currentUser))
            if userlist.index(currentUser)==0:
                myGame = Game.objects.get(pk=game_id)
                myGame.Player1score=myGame.Player1score+points
                myGame.save()
            if userlist.index(currentUser)==1:
                myGame = Game.objects.get(pk=game_id)
                myGame.Player2score=myGame.Player2score+points
                myGame.save()
            if userlist.index(currentUser)==2:
                myGame = Game.objects.get(pk=game_id)
                myGame.Player3score=myGame.Player3score+points
                myGame.save()
            Group('users').send({'text': json.dumps({'wordStatus': 'yes',
                                                     'currentTurn': currentTurn,
                                                     'points':points,
                                                     'currentUser':currentUser,
                                                     'word':word,
                                                     })})
        else:

            Group('users').send({'text': json.dumps({'wordStatus': 'no',
                                                     'currentTurn': currentTurn - 1,
                                                     })})
    except:
        word = None

    try:
        startPopUp = myJSON['startPopUpStatus']
        user_list = myJSON['userlist']
        game_id = myJSON['game_id']
        Game.objects.filter(pk=game_id).update(GameStartStatus=1)
        if startPopUp == '1':
            Group('users').send({'text': json.dumps({'startPopUp':'0',
                                                     'userlist':user_list,
                                                     'currentTurn':'0'
                                             })})
    except:
        startPopUp = None
        user_list = []


    try:
        allowedArray = myJSON['allowedBlocks']
        unAllowedArray = myJSON['unAllowedBlocks']
        letterArray = myJSON['letterBlocks']
        elementId = myJSON['elementId']
        symbol = myJSON['symbol']
        newBlocks = myJSON['newBlocks']
        currentTurn = myJSON['currentTurn']

        game_id = myJSON['game_id']

        Game.objects.filter(pk=game_id).update(currentTurn=currentTurn)
        Group('users').send({'text': json.dumps({'allowedBlocks': allowedArray,
                                                 'unAllowedBlocks': unAllowedArray,
                                                 'letterBlocks': letterArray,
                                                 'elementId':elementId,
                                                 'symbol':symbol,
                                                 'currentTurn':currentTurn,
                                                 'newBlocks':newBlocks,
                                                 })})
    except:
        allowedArray = None
        unAllowedArray = None
        letterArray = None

    try:
        currentTurn = myJSON['currentTurn']
        print 'Текущий ход:',currentTurn
    except:
        currentTurn = None

    mWord =  myDict.objects.filter(word=word)




    Group('users').send({'text': json.dumps({'message': word,
                                            'sender': message.user.username,
                                             })})
