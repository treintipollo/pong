function Ball() {}

Ball.inheritsFrom( GameObject );

Ball.prototype.afterCreate = function(){
	BoxCollider.prototype.create.call(this);
}

Ball.prototype.init = function() {
	this.x     = TopLevel.canvas.width/2;
	this.y     = TopLevel.canvas.height/2;
	
	this.speedX = 100;
	this.speedY = 100;

	BoxCollider.prototype.init.call(this, 20, 20);
}

Ball.prototype.draw = function(context) { 	
	context.strokeStyle = "#FFFFFF";
	context.beginPath();
	context.rect(0, 0, 20, 20);	
	context.closePath();
	context.stroke();
}

Ball.prototype.update = function(delta) {
	this.x += this.speedX * delta;
	this.y += this.speedY * delta;	
}

Ball.prototype.onCollide = function(other){
	if(other.typeId == "Paddle_1"){
		this.speedX *= -1;		
	}
	if(other.typeId == "Paddle_2"){
		this.speedX *= -1;
	}
	if(other.typeId == "Top"){
		this.speedY *= -1;	
	}
	if(other.typeId == "Left"){
		this.speedX *= -1;	

		TopLevel.player2Score++;
		$("#player2").text( TopLevel.player2Score.toString() );
	}
	if(other.typeId == "Right"){
		this.speedX *= -1;		

		TopLevel.player1Score++;
		$("#player1").text( TopLevel.player1Score.toString() );
	}
	if(other.typeId == "Bottom"){
		this.speedY *= -1;		
	}

}