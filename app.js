let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let chance = new require('chance')();
let port = process.env.PORT || 80;

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

app.get('/other_players/:id', function(req, res){
    res.send(getPlayersDatas(req.params['id']));
});

app.get('/player/:id', function(req, res){
    res.send(players[req.params['id']]);
});

io.on('connection', function(socket){
    let id = socket.id;
    console.log("New connection, id:", id);

    generateNewPlayer(id);
    socket.emit('prepare',{'sectors': sectors});

    setInterval(function(){
        let playersDatas = getPlayersDatas(id);
        socket.volatile.emit('update', {'players': playersDatas})
    }, 10);

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

function getPlayersDatas(id){
    clonedPlayers = Object.assign({}, players);
    delete clonedPlayers[id];
    return clonedPlayers;
}

function generateNewPlayer(id){
    players[id] = new Player(id);
}

function removePlayer(id){
    delete players[id];
}

http.listen(port, function(){
    console.log("Going Home server running");
});
