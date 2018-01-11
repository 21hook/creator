/**
 * Builder/Creater pattern
 */

// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d'); // 2d canvas

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

/**
 * A template for creating balls.
 * 
 * @param {Number} x     the x-axis coordinate of the center
 * @param {Number} y     the y-axis coordinate of the center
 * @param {Number} velX  the horizontal velocity	 				
 * @param {Number} velY  the vertical velY
 * @param {String} color its color
 * @param {Number} size  its radius
 */
function Ball(x, y, velX, velY, color, size) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size;
}

/**
 * Instance method # method attached to instacnes. 
 * Draw the ball on the canvas.
 */
Ball.prototype.draw = function () {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill(); // Draw on the canvas
}

/**
 * 
 */
Ball.prototype.update = function() {
	// If the ball exceeds the width of the bouding box of the window
	if(this.x + this.size >= width) {
		this.velX = -this.velX;
	}

	if(this.x - this.size <= 0) {
		this.velX = -this.velX;
	}

	// If the ball exceeds the height of the bouding box of the window
	if(this.y + this.size >= height) {
		this.velY = -this.velY;
	}

	if(this.y - this.size <= 0) {
		this.velY = -this.velY;
	}


	// Update the coordinate of the center of the ball
	this.x += this.velX;
	this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
	for(var i=0; i<balls.length; i++) {
		if(!(this === balls[i])) { // If the updated ball does not equal to the ball to detect collisions
			var dx = this.x - balls[i].x;
			var dy = this.y - balls[i].y;
			var distance = Math.sqrt(dx*dx + dy*dy);
		
			if (distance < this.size + balls[i].size) {
        		balls[i].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
			}
		}
	}
}


var balls = []; // Store a list of balls

function loop() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // Define the color of the shape
	ctx.fillRect(0, 0, width, height); // Define a rectangle 

	// Iterate to generate a list of balls
	// & initialize the balls
	while(balls.length < 25) {
		var ball = new Ball(
			random(0, width),
			random(0, height),
			random(-5, 5),
			random(-5, 5),
			'rgb(' + random(0, 255) + ',' + random(0, 255) + ','+ random(0, 255) + ')',
			random(10, 20)
			);
		balls.push(ball);
	}

	// Update the properties of the balls
	for(var i=0; i<balls.length; i++) {
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}

	
	window.requestAnimationFrame(loop);
}


// Start animation
loop();



