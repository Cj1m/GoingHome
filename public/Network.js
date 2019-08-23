function Network(){
    this.socket = io();

    this.sendPlayerData = function(){
        this.socket.emit('player_data', ship.getData());
    }

    this.socket.on('prepare', prepare);
}