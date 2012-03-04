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
			this.element.css('left', Math.max(this.opponent.getPosition() + this.getWidth() * 0.5, this.getPosition() - this.stepLength) + 'px');
		}
	};
	
	this.moveRight = function() {
		if (this.getPosition() < this.opponent.getPosition()) {
			this.element.css('left', Math.min(this.opponent.getPosition() - this.getWidth() * 0.5, this.getPosition() + this.stepLength) + 'px');
		} else {
			this.element.css('left', Math.min(this.getPosition() + this.stepLength, this.game.getWidth() - this.getWidth()) + 'px');
		}
	};
	
	this.attack = function() {
		if (Math.floor(Math.random() * 2) > 0) {
			var attack = 'punching';
		} else {
			var attack = 'kicking';
		}
		
		this.element.addClass(attack).delay(200).queue(function(next) {
			$(this).removeClass(attack);
			next();
		});
		
		if ((this.getPosition() < this.opponent.getPosition() && (this.opponent.getPosition() - this.getPosition()) < this.getWidth()) ||
			(this.opponent.getPosition() < this.getPosition() && (this.getPosition() - this.opponent.getPosition()) < this.getWidth())) {
			this.opponent.getHit();
		}
	};
	
	this.getEnergy = function() {
		return this.energy;
	};
	
	this.getHit = function() {
		this.element.addClass('hit').delay(200).queue(function(next) {
			$(this).removeClass('hit');
			next();
		});
		
		this.energy = Math.max(0, this.energy - 5);
		this.game.updateEnergy();
	};
}