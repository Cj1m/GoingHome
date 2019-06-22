function Network(){
    this.socket = io();

    this.testConnection = function(){
        console.log('hello server');
        this.socket.emit('test', 'hello server');
    }

    this.testResponse = function(msg) {
        console.log(msg);
    }

    this.socket.on('test', this.testResponse);

    this.testConnection();
}