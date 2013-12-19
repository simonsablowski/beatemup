function ButtonController(fighter) {
	var self = this;
	self.fighter = fighter;
	self.states = {
		walkLeft: false,
		walkRight: false,
		jump: false
	};
	
	self.construct = function() {
		self.buttons = document.getElementsByTagName('button');
		
		for (var i = 0; i < self.buttons.length; i++) {
			self.buttons[i].addEventListener('mousedown', self.onMouseDown);
			self.buttons[i].addEventListener('mouseup', self.onMouseUp);
		}
	};
	
	self.onMouseDown = function(event) {
		event.preventDefault();
		
		switch (event.target.className) {
			case 'walkLeft':
				self.states.walkLeft = true;
				break;
			case 'walkRight':
				self.states.walkRight = true;
				break;
		}
	};
	
	self.onMouseUp = function(event) {
		event.preventDefault();
		
		switch (event.target.className) {
			case 'punch':
				self.fighter.punch();
				break;
			case 'kick':
				self.fighter.kick();
				break;
			case 'walkLeft':
				self.states.walkLeft = false;
				self.fighter.idle();
				break;
			case 'walkRight':
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
		
		for (var i = 0; i < self.buttons.length; i++) {
			self.buttons[i].removeEventListener('mousedown', self.onMouseDown);
			self.buttons[i].removeEventListener('mouseup', self.onMouseUp);
		}
	};
	
	self.construct();
}