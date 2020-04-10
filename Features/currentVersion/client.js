var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendfile(__dirname + '/client.html');
});

io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('chat message', function(msg){
        console.log('message: '+ msg);
        io.emit('message', msg);
    });
});

http.listen(3000, function(){
    console.log('lintening on port 3000')
});