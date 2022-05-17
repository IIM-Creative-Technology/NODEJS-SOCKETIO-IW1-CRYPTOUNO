const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
import { Socket } from 'socket.io';
import { GameController } from './modules/game/game.controller'

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});


let player1: Socket | null = null;
let player2: Socket | null = null;
let game;

enum EventList {
    GameFull = 'GameFull',
    SetPlayerIdentity = 'SetPlayerIdentity',
    GameStart = 'GameStart',
}


//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('Player connected : ', socket.id)

    if(player1 && player2) return socket.emit(EventList.GameFull)

    if (socket !== player1 && socket !== player2) {
        if(!player1) {
            socket._key = 1;
            player1 = socket
        } else {
            socket._key = 2;
            player2 = socket
        };

        socket.emit(EventList.SetPlayerIdentity, socket._key);

        if (player1 && player2) {
            console.log("START !!!")
            const game = new GameController(player1, player2)
            io.emit(EventList.GameStart, game.getBoardState())
        } else {
            console.log("waiting an other player")
            socket.emit('wait');
        }
    }

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});


http.listen(3000, function() {
   console.log('listening on *:3000');
});