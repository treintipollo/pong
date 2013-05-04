function Paddle() {}

Paddle.inheritsFrom(GameObject);

Paddle.prototype.afterCreate = function() {
	BoxCollider.prototype.create.call(this);
}

Paddle.prototype.init = function() {
	this.speed = 200;

	BoxCollider.prototype.init.call(this, 20, 120);
}

Paddle.prototype.draw = function(context) {
	context.strokeStyle = "#FFFFFF";
	context.beginPath();
	context.rect(0, 0, 20, 120);
	context.closePath();
	context.stroke();
}

Paddle.prototype.update = function(delta) {
	if (ArrowKeyHandler.isDown(ArrowKeyHandler.UP)) {
		this.y -= this.speed * delta;
	}
	if (ArrowKeyHandler.isDown(ArrowKeyHandler.DOWN)) {
		this.y += this.speed * delta;
	}
}