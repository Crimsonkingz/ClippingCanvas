var canvas = document.querySelector("#clippingCanvas");
var ctx = canvas.getContext("2d");
var container = document.querySelector("#canvasContainer");
var canvasWidth, canvasHeight;

// set the clipping image
var img = new Image();
img.src = "https://i.guim.co.uk/img/static/sys-images/Guar" +
"dian/Pix/pictures/2011/12/13/1323770749407/Decorated-Christmas-tree--007.jpg"+
"?w=620&q=85&auto=format&sharp=10&s=05136b277a0cf0e620a5ec1ff1b44044";



var particles = [];


var init = function() {
	console.log("initialising");

	resize();

	window.addEventListener("resize", function() {
	resize();
	});

	windTap();

		// # particles, maxX, maxY to start, radius, x speed, y speed
		makeParticle(15, canvasWidth, canvasHeight, 15, 3, 2);
         ctx.drawImage(img,0,0, canvasWidth, canvasHeight);
         render();  
}



var resize = function() {
	console.log("resizing");
	canvasWidth = 0.9 * container.offsetWidth;
	canvasHeight = 0.9 * container.offsetHeight;

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

};

img.onload = function() {
	console.log("image loaded");
       init();

 };


var windTap = function() {

};




var drawShape = function(type, x,y,radius) {
	
	var theta = (360/5) * (Math.PI/180);
	var correction = (Math.PI/180) * 180;
	
	// rotation correction
	ctx.save();
	ctx.translate( x, y );
	ctx.rotate( correction );
	ctx.translate( -x, -y );
	/////

	if (type === "circle") {
		ctx.beginPath();
		ctx.arc( x, y, radius, 0,2*Math.PI);	
		ctx.fill();
	}
	else if (type === "star") {

		ctx.beginPath();
		ctx.moveTo(x,y+radius);
		ctx.lineTo(x + radius*Math.sin(2*theta), y + radius*Math.cos(2*theta));
		ctx.lineTo(x + radius*Math.sin(4*theta), y + radius*Math.cos(4*theta));
		ctx.lineTo(x + radius*Math.sin(1*theta), y + radius*Math.cos(1*theta));
		ctx.lineTo(x + radius*Math.sin(3*theta), y + radius*Math.cos(3*theta));
		ctx.lineTo(x,y+radius);
		ctx.closePath();
		ctx.fill();
	}


	// restore original orientation
	ctx.restore();
	/////
	
};





var makeParticle = function(n, maxX, minY, maxRadius, speedX, speedY) {
	for (var i =0; i < n; i++) {
		
			var particle = new Particle();
		 	particle.x = Math.round(((maxX - (2*maxRadius) - 1) * Math.random())+1);
	 		particle.y = Math.random() * (-1* minY);
	 		particle.radius = Math.round(((maxRadius-1) * Math.random())+1);
	 		particle.speed.x = Math.floor(Math.random()*speedX) - (speedX/2);
	 		particle.speed.y = 1 + (speedY * Math.random());

			particles.push(particle);
		
	}
};
var Particle = function() {
	this.x = 0;
	this.y = 0;
	this.radius = 0; 
	this.speed = {x:0, y:0};
}


var y = 0;
var render = function() {
	requestAnimationFrame(render);

	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	ctx.save();	
	

	for (var i = 0; i < particles.length; i++) {
		var currentParticle = particles[i];

		drawShape("circle", (currentParticle.x += currentParticle.speed.x), (currentParticle.y += currentParticle.speed.y), currentParticle.radius);

		// if(currentParticle.y - (2*currentParticle.radius) > 500) {
		// 	currentParticle.y = (-2*currentParticle.radius);
		// }
		// if (currentParticle.x - (2*currentParticle.radius) > 500) {
		// 	currentParticle.x = (-currentParticle.radius);
		// }
		// if (currentParticle.x  < 0) {
		// 	currentParticle.x = (500 + currentParticle.radius);
		// }

		if (currentParticle.y >= canvasHeight + currentParticle.radius) {
			
		 	currentParticle.y = 0 - (2*currentParticle.radius);		 

		}
 		if (currentParticle.x >= canvasWidth + currentParticle.radius) {

		 	currentParticle.x = 0 - currentParticle.radius;		

 		}
 		if (currentParticle.x < (0-currentParticle.radius)) {
 			currentParticle.x = canvasWidth + currentParticle.radius;
 		}
	}


	// drawStar(700-y, y-200, 100);
	// drawStar(y-200, y-200, 100);
	
	ctx.globalCompositeOperation="source-in";
	ctx.drawImage(img,0,0, canvasWidth, canvasHeight);
	

	ctx.restore();
	
};

 