function TimeController(fighter) {
	var self = this;
	self.fighter = fighter;
	self.states = {
		walkLeft: false,
		walkRight: false,
		jump: false
	};
	
	self.construct = function() {
		self.fighting = window.setInterval(self.performRandomAction, 1000 / config.difficulty);
	};
	
	//TODO: needs improvement
	self.performRandomAction = function() {
		var randomNumber = Math.random();
		
		if (Math.floor(randomNumber * 4) > 0) {
			self.states.walkLeft = true;
		} else if (Math.floor(randomNumber * 2) > 0) {
			self.states.walkRight = true;
		} else {
			self.states.walkLeft = false;
			self.states.walkRight = false;
			self.fighter.idle();
		}
		
		//FIXME: opponent's position shouldn't be required
		if (self.fighter.opponent.position.x >= (self.fighter.position.x - config.fighter.bodyWidth * config.fighter.vulnerability)) {
			self.states.walkLeft = false;
			self.states.walkRight = false;
			
			if (Math.floor(randomNumber * 2) > 0) {
				self.fighter.punch();
			} else {
				self.fighter.kick();
			}
		}
	};
	
	self.update = function() {
		if (self.states.walkLeft) {
			self.fighter.walkLeft();
		}
		if (self.states.walkRight) {
			self.fighter.walkRight();
		}
	};
	
	self.deconstruct = function() {
		self.states.walkLeft = false;
		self.states.walkRight = false;
		self.states.jump = false;
		
		window.clearInterval(self.fighting);
	};
	
	self.construct();
}