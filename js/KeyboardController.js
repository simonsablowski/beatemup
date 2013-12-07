function KeyboardController(fighter) {
	var self = this;
	self.fighter = fighter;
	self.states = {
		walkLeft: false,
		walkRight: false,
		jump: false
	};
	
	self.construct = function() {
		window.addEventListener('keydown', self.onKeyDown);
		window.addEventListener('keyup', self.onKeyUp);
	};
	
	self.onKeyDown = function(event) {
		switch (event.which) {
			case config.keys.walkLeft:
				self.states.walkLeft = true;
				break;
			case config.keys.walkRight:
				self.states.walkRight = true;
				break;
		}
	};
	
	self.onKeyUp = function(event) {
		switch (event.which) {
			case config.keys.punch:
				self.fighter.punch();
				break;
			case config.keys.kick:
				self.fighter.kick();
				break;
			case config.keys.walkLeft:
				self.states.walkLeft = false;
				self.fighter.idle();
				break;
			case config.keys.walkRight:
				self.states.walkRight = false;
				self.fighter.idle();
				break;
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
	
	self.destruct = function() {
		self.states.walkLeft = false;
		self.states.walkRight = false;
		self.states.jump = false;
		
		window.removeEventListener('keydown', self.onKeyDown);
		window.removeEventListener('keyup', self.onKeyUp);
	};
	
	self.construct();
}