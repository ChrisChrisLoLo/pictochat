//init socket.io
var socket = io();
socket.on('connect',function(){
	console.log("Connected to Server")

});

socket.on('newMessage',function(message){
	var timeString = milToTime(message.createdAt);
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template,{
		text:message.text,
		from:message.from,
		createdAt:timeString
	});
	jQuery('#messages').append(html);
	scrollToBottom();
});

socket.on('newDrawing',function(drawing){
	var timeString = milToTime(drawing.createdAt);
	var template = jQuery('#image-template').html();
	var html = Mustache.render(template,{
		imgURL:drawing.imgURL,
		from:drawing.from,
		createdAt:timeString
	});
	jQuery('#messages').append(html);
	scrollToBottom();
});
function milToTime(millis){
	var time = new Date(millis)
	var hours = time.getHours()%12;
	if (time.getHours() <= 12){
		post = "AM" 
	}
	else{
		post = "PM"
	}
	// var minutes = "00"||parseInt(time.getMinutes(),2);
	var minutes = time.getMinutes()
	if (minutes < 10){
		minutes = "0" + parseInt(minutes);
	}
	console.log()
	return hours+":"+minutes+" "+post;
}
// socket.emit('createMessage',{
// 	from: 'Frank',
// 	text: 'hi'
// 	//acknowledgement from serve
// },funrction(stringData){
// 	console.log('got ack',stringData)
// });

jQuery('#message-form').on('submit',function(e){
	e.preventDefault();

	var messageTextbox = jQuery('[name=message]')

	socket.emit('createMessage',{
		from: 'User',
		text: messageTextbox.val()
	},function(stringData){
		console.log('got ack',stringData)
		messageTextbox.val('')
	});
});

function sendDrawing(){
	var dataURL = canvas.toDataURL();
	//document.getElementById("canvasImg").src = dataURL;
	//document.getElementById("canvasImg").style.display = "inline";
	console.log(dataURL);
	socket.emit('createDrawing',{
		from: 'User',
		imgURL: dataURL
	},function(stringData){
		console.log('got ack',stringData)
		clearCanv()
	});
}

function scrollToBottom(){
	//Selectors
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	//Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}
