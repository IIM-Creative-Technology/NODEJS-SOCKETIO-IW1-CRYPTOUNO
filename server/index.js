const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Game = require('./game');
const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});


var usersConnected = [];
var sessions = []


//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('Player connected : ', socket.id)

    if (usersConnected.indexOf(socket) < 0) {
        usersConnected.push(socket);
        socket.ID = usersConnected.length;
        socket.LobbyID = null;
        if (usersConnected.length >= 2) {
            console.log("START !!!")
            const game = new Game(usersConnected)
            console.log(game)

            usersConnected = [];
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