let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let players = {};
let sectors = [];
let lasers = [];

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log("New connection");
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
