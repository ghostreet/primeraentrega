const socket = io();
socket.emit('message', 'comunicacion desde el websocket')
