var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var messageLog = {};
messageLog.messages = [];

app.get('/favicon.ico',function(req,res){
   res.sendfile('favicon.ico'); 
});

app.get('/',function(req,res){
	res.sendfile('index.html');
});

io.on('connection',function(socket){
	console.log('a user connected');
	socket.on('getHistory', function(req){
		console.log("User: " + req.name + " has requested a log of all sent messages")
		io.emit('history',messageLog);
	});

	socket.on('chat',function(msg){
		console.log('Msg from: ' + msg.name + '  Contents: ' + msg.msg);
		io.emit('chat', msg);
		messageLog.messages.push(msg);
	});
});

http.listen(8181,function(){
	console.log('listening on: 8181');
});
