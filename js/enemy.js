Enemy.prototype = new Player;
Enemy.prototype.constructor = Enemy;

function Enemy(element, game) {
	var self = this;
	this.element = element;
	this.game = game;
	this.opponent;
	
	this.fight = function() {
		setInterval(function() {
			if (Math.floor(Math.random() * 6) > 0) {
				self.moveLeft();
			} else {
				self.moveRight();
			}
			
			if (self.opponent.getPosition() > (self.getPosition() - self.opponent.getWidth() * 0.4)) {
				self.punch();
			}
		}, 400);
	};
}