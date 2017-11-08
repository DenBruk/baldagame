from django.conf.urls import url

from . import views

urlpatterns = [
    
    url(r'^games/$', views.showGames, name='Games'),
    url(r'^games/join/(?P<game_id>\d+)/$', views.joinGame, name='join'),
    url(r'^game/(?P<game_id>\d+)/$', views.show, name='show'),
    url(r'^game/add/$', views.addGame, name='add'),
    #url(r'^game/chat/$', views.foo, name='foo'),
]