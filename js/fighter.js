function Fighter(element, game) {
	this.element = element;
	this.game = game;
	this.opponent = null;
	this.energy = 100;
	this.stepLength = 40;
	this.vulnerability = 0.5;
	this.damage = 5;
	this.delay = 100;
	
	this.getPosition = function() {
		return this.element.position().left;
	};
	
	this.getWidth = function() {
		return this.element.width();
	};
	
	this.moveLeft = function() {
		this.element.addClass('moving-left').delay(this.delay).queue(function(next) {
			$(this).removeClass('moving-left');
			next();
		});
		if (this.getPosition() < this.opponent.getPosition()) {
			this.element.css('left', Math.max(0, this.getPosition() - this.stepLength) + 'px');
		} else {
			this.element.css('left', Math.max(this.opponent.getPosition() + this.getWidth() * this.vulnerability, this.getPosition() - this.stepLength) + 'px');
		}
	};
	
	this.moveRight = function() {
		this.element.addClass('moving-right').delay(this.delay).queue(function(next) {
			$(this).removeClass('moving-right');
			next();
		});
		if (this.getPosition() < this.opponent.getPosition()) {
			this.element.css('left', Math.min(this.opponent.getPosition() - this.getWidth() * this.vulnerability, this.getPosition() + this.stepLength) + 'px');
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
		
		this.element.addClass(attack).delay(this.delay).queue(function(next) {
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
		this.element.addClass('hit').delay(this.delay).queue(function(next) {
			$(this).removeClass('hit');
			next();
		});
		
		this.energy = Math.max(0, this.energy - this.damage);
		this.game.updateEnergy();
	};
	
	this.win = function() {
		this.element.addClass('winning');
	};
	
	this.lose = function() {
		this.element.addClass('losing');
	};
}

Player.prototype = new Fighter;
Player.prototype.constructor = Player;

function Player(element, game) {
	this.element = element;
	this.game = game;
}

Enemy.prototype = new Fighter;
Enemy.prototype.constructor = Enemy;

function Enemy(element, game) {
	this.element = element;
	this.game = game;
	this.interval = null;
	
	this.startFighting = function() {
		var self = this;
		this.interval = setInterval(function() {
			if (Math.floor(Math.random() * 6) > 0) {
				self.moveLeft();
			} else {
				self.moveRight();
			}
			
			if (self.opponent.getPosition() >= (self.getPosition() - self.opponent.getWidth() * self.vulnerability)) {
				self.attack();
			}
		}, 200);
	};
	
	this.stopFighting = function() {
		clearInterval(this.interval);
	};
}