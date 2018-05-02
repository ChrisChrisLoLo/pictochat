const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const {generateMessage} = require('./utils/message');

const port = 3000;
//Init path to public folder, by exiting the server path and re-entering the public folder
const publicPath = path.join(__dirname,'../public');

//Create HTTP server
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


//NOTE: IO emits "gloabally", socket emits "locally", and broadcast emits to all except current socket

io.on('connection',(socket)=>{
	console.log('New user connected');

	socket.emit('newMessage',generateMessage('Admin',"Welcome to the chat"));

	socket.broadcast.emit('newMessage',generateMessage('Admin',"A user has joined the chat"));



	socket.on('createMessage',(newMessage,callback)=>{
		console.log('New message',newMessage);
		io.emit('newMessage',generateMessage(newMessage.from,newMessage.text))
		//send callback to client to interperet.
		callback('This is from the server');
		// socket.broadcast.emit('newMessage',{
		// 	from: newMessage.from,
		// 	text: newMessage.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('createDrawing',(newDrawing,callback)=>{
		console.log('New drawing',newDrawing.imgURL);
		io.emit('newDrawing',generateDrawing(newDrawing.from,newDrawing.imgURL))
		callback('Drawing sent');
	});
});

var generateDrawing = (from,imgURL) => {
	return {
		from,
		imgURL,
		createdAt: new Date().getTime()
	}
};



server.listen(port,function(){
	console.log("Server Started on Port "+port+"...");
});