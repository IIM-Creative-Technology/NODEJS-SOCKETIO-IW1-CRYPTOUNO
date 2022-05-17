var uuid = require('uuid');

class Game {
    constructor(players) {
        this.id = uuid.v1()
        this.sockets = {};
        this.players = players;
        this.board = Array.from({length: 49}, () => 0)
        this.activePlayer = 1
        this.winCoordinates = []
        this.gameTurnsCount
    }
    
  
    addPlayer(socket, username) {
        this.sockets[socket.id] = socket;
        this.players[socket.id] = username;
    }
  
    removePlayer(socket) {
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }
  
}

module.exports = Game