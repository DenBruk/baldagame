from channels.routing import route
from game.consumers import ws_connect, ws_disconnect,ws_message


channel_routing = [
    route('websocket.connect', 'game.consumers.ws_connect',path=r'^/balda/game/(?P<game_id>\d+)/$'),
    route('websocket.disconnect', ws_disconnect),
    route('websocket.receive',ws_message)
]