function Border() {}

Border.inheritsFrom(GameObject);

Border.prototype.afterCreate = function() {
	BoxCollider.prototype.create.call(this);
}

Border.prototype.init = function() {
	BoxCollider.prototype.init.call(this, this.width, this.height);
}
