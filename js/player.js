function Player(element, game) {
	this.element = element;
	this.game = game;
	this.opponent = null;
	this.energy = 100;
	this.stepLength = 40;
	
	this.getPosition = function() {
		return this.element.position().left;
	};
	
	this.getWidth = function() {
		return this.element.width();
	};
	
	this.moveLeft = function() {
		if (this.getPosition() < this.opponent.getPosition()) {
			this.element.css('left', Math.max(0, this.getPosition() - this.stepLength) + 'px');
		} else {
			this.element.css('left', Math.max(this.opponent.getPosition() + this.getWidth() * 0.4, this.getPosition() - this.stepLength) + 'px');
		}
	};
	
	this.moveRight = function() {
		if (this.getPosition() < this.opponent.getPosition()) {
			this.element.css('left', Math.min(this.opponent.getPosition() - this.getWidth() * 0.4, this.getPosition() + this.stepLength) + 'px');
		} else {
			this.element.css('left', Math.min(this.getPosition() + this.stepLength, this.game.getWidth() - this.getWidth()) + 'px');
		}
	};
	
	this.punch = function() {
		this.element.addClass('punching').delay(200).queue(function(next) {
			$(this).removeClass('punching');
			next();
		});
		
		if ((this.getPosition() < this.opponent.getPosition() && (this.opponent.getPosition() - this.getPosition()) < this.getWidth()) ||
			(this.opponent.getPosition() < this.getPosition() && (this.getPosition() - this.opponent.getPosition()) < this.getWidth())) {
			this.opponent.hurt();
		}
	};
	
	this.getEnergy = function() {
		return this.energy;
	};
	
	this.hurt = function() {
		this.energy = Math.max(0, this.energy - 5);
		this.game.updateEnergy();
	};
}