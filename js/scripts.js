var canvas = document.querySelector("#clippingCanvas");
var ctx = canvas.getContext("2d");

var stars = [];



// set the clipping shape

var img = new Image();
img.src = "https://i.guim.co.uk/img/static/sys-images/Guar" +
"dian/Pix/pictures/2011/12/13/1323770749407/Decorated-Christmas-tree--007.jpg"+
"?w=620&q=85&auto=format&sharp=10&s=05136b277a0cf0e620a5ec1ff1b44044";


var drawCircle = function(x,y,radius) {

	ctx.beginPath();
	ctx.arc( x, y, radius, 0,2*Math.PI);	
	ctx.fill();
};

var drawStar = function(x,y, radius, twinkle) {

	var theta = (360/5) * (Math.PI/180);
	var correction = (Math.PI/180) * 180;
	
	// rotation correction
	ctx.save();
	ctx.translate( x, y );
	ctx.rotate( correction );
	ctx.translate( -x, -y );
	/////

	ctx.beginPath();
	ctx.moveTo(x,y+radius);
	ctx.lineTo(x + radius*Math.sin(2*theta), y + radius*Math.cos(2*theta));
	ctx.lineTo(x + radius*Math.sin(4*theta), y + radius*Math.cos(4*theta));
	ctx.lineTo(x + radius*Math.sin(1*theta), y + radius*Math.cos(1*theta));
	ctx.lineTo(x + radius*Math.sin(3*theta), y + radius*Math.cos(3*theta));
	ctx.lineTo(x,y+radius);
	ctx.closePath();
	ctx.fill();

	// restore original orientation
	ctx.restore();
	///

}

 // draw cropped image when loaded
img.onload = function() {
       	makeStars(20, 500, 20, 20);
         ctx.drawImage(img,0,0);
         render();  

 };
//make image to be clipped

var makeStars = function(n, maxX, minY, maxRadius) {
	for (var i =0; i < n; i++) {

		var star = new Star();
	 	star.x = Math.round(((maxX - (2*maxRadius) - 1) * Math.random())+1);
 		star.y = -2*maxRadius;
 		star.radius = Math.round(((maxRadius-1) * Math.random())+1);
 		star.speed.x = (1 + (-1 * Math.random() * 2));
 		star.speed.y = 5 * Math.random();

		stars.push(star);
	}
};
var Star = function() {
	this.x = 0;
	this.y = 0;
	this.radius = 0; 
	this.speed = {x:0, y:0};
}

var y = 0;
var render = function() {
	requestAnimationFrame(render);

	ctx.clearRect(0,0,500,500);
	ctx.save();	
	

	for (var i = 0; i < stars.length; i++) {
		var currentStar = stars[i];

		drawStar((currentStar.x += currentStar.speed.x), (currentStar.y += currentStar.speed.y), currentStar.radius);

		if(currentStar.y - (2*currentStar.radius) > 500) {
			currentStar.y = (-2*currentStar.radius);
		}
		if (currentStar.x - (2*currentStar.radius) > 500) {
			currentStar.x = (-currentStar.radius);
		}
		if (currentStar.x  < 0) {
			currentStar.x = (500 + currentStar.radius);
		}
	}


	// drawStar(700-y, y-200, 100);
	// drawStar(y-200, y-200, 100);
	
	ctx.globalCompositeOperation="source-in";
	ctx.drawImage(img,0,0, 500,500);
	

	ctx.restore();
	
};

 