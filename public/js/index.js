//init socket.io
var socket = io();
socket.on('connect',function(){
	console.log("Connected to Server")

});

socket.on('newMessage',function(message){
	console.log('newMessage',message);
	var li = jQuery('<li></li>');
	var timeString = milToTime(message.createdAt);
	li.text(`${message.from} ${timeString} : ${message.text}`);

	jQuery('#messages').append(li)
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