let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let chance = new require('chance')();

let Player = require('./Player.js');

let players = {};
let sectors = require('./SectorsGenerator').generate();
let lasers = [];

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/sector/:id', function(req, res){
    res.send(sectors[req.params['id']]);
});

app.get('/players', function(req, res){
    res.send(players);
});

app.get('/player/:id', function(req, res){
    res.send(players[req.params['id']]);
});

io.on('connection', function(socket){
    let id = socket.id;
    console.log("New connection, id:", id);

    generateNewPlayer(id);
    socket.emit('prepare',{"sectors": sectors});

    socket.on('test', function(msg){
        socket.emit('test', 'hello client');
    });

    socket.on('player_data', function(playerData){
        players[id].update(playerData);
    });

    socket.on('disconnect', function(){
        removePlayer(id);
        console.log('user disconnected');
    });

});

function generateNewPlayer(id){
    players[id] = new Player(id);
}

function removePlayer(id){
    delete players[id];
}

http.listen(80, function(){
    console.log("Going Home server running");
});
