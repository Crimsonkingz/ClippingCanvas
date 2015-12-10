var canvas = document.querySelector("#clippingCanvas");
var ctx = canvas.getContext("2d");



// set the clipping shape

var img = new Image();
img.src = "http://huney.co/wp-content/uploads/Aurora-Motor-Yacht-1600x.jpg";


var drawCircle = function(x,y,radius) {

	ctx.beginPath();
	ctx.arc( x, y, radius, 0,2*Math.PI);	
	ctx.fill();
};


 // draw cropped image when loaded
img.onload = function() {
       
         ctx.drawImage(img,0,0);
         render();  

 };
//make image to be clipped





var y = 0;
var render = function() {
	
	ctx.clearRect(0,0,500,500);
	ctx.save();

	if(y < 800) {
		requestAnimationFrame(render);

	}
	else {
		y = 0;
		requestAnimationFrame(render);
	}

	y += 5;
	drawCircle(700-y, y-200, 100);
	drawCircle(y-200, y-200, 100);
	
	ctx.globalCompositeOperation="source-in";
	ctx.drawImage(img,0,0);
	

	ctx.restore();
	
};

 