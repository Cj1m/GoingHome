let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let chance = new require('chance')();

let players = {};
let sectors = require('./SectorsGenerator').generate();
let lasers = [];

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log("New connection");
    socket.emit('prepare',{"sectors": sectors});
    socket.on('test', function(msg){
        socket.emit('test', 'hello client');
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});

http.listen(80, function(){
    console.log("Going Home server running");
});
