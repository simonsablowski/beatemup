Enemy.prototype = new Player;
Enemy.prototype.constructor = Enemy;

function Enemy(element, game) {
	this.element = element;
	this.game = game;
	this.opponent = null;
	this.interval = null;
	
	this.startFighting = function() {
		var self = this;
		this.interval = window.setInterval(function() {
			if (Math.floor(Math.random() * 6) > 0) {
				self.moveLeft();
			} else {
				self.moveRight();
			}
			
			if (self.opponent.getPosition() >= (self.getPosition() - self.opponent.getWidth() * 0.5)) {
				self.attack();
			}
		}, 400);
	};
	
	this.stopFighting = function() {
		window.clearInterval(this.interval);
	};
}