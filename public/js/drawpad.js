var canvas = document.getElementById('canvasHTML');
var ctx = canvas.getContext('2d');
var mousePressed = false;
canvas.addEventListener("mousedown", function (e) {
	mousePressed=true;
	draw(e);
}, false);
canvas.addEventListener("mousemove", function (e) {
	draw(e);
}, false);
canvas.addEventListener("mouseup", function (e) {
	mousePressed=false
}, false);
canvas.addEventListener("mouseout", function (e) {
	mousePressed=false
}, false);
ctx.fillStyle = 'white';
	ctx.fillRect(0,0,canvas.width, canvas.height);

function getMousePos(e) {
	//POT BUG: there could be offsets with the canvas and it's line due to the canvas,s postition
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}


function draw(e){
	if (mousePressed){
		pos = getMousePos(e);
		console.log(pos)
		ctx.beginPath();
		ctx.arc(pos.x,pos.y,3,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle = "black";
		ctx.fill();
	}
}

function save() {
	document.getElementById("canvasImg").style.border = "2px solid";
	var dataURL = canvas.toDataURL();
	document.getElementById("canvasImg").src = dataURL;
	document.getElementById("canvasImg").style.display = "inline";
	//console.log(dataURL)
}

function clearCanv() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,canvas.width, canvas.height);
}