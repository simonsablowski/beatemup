function Fighter(position, image) {
	var self = this;
	self.position = position;
	self.image = image;
	self.states = {
		idle: 0,
		walkLeft: 1,
		walkRight: 2,
		jump: 3,
		punch: 4,
		kick: 5,
		getHit: 6,
		win: 7,
		lose: 8
	};
	self.energy = 100;
	
	self.construct = function() {
		self.sprite = new Sprite(self.image, self.image.frames.idle);
		self.idle();
	};
	
	self.setOpponent = function(opponent) {
		self.opponent = opponent;
	};
	
	self.render = function() {
		self.sprite.animate();
		self.sprite.move(self.position);
	};
	
	self.setPosition = function(x, y) {
		self.position.x = x;
		self.position.y = y;
	};
	
	//TODO: needs improvement
	self.setState = function(state, resetSprite) {
		if (resetSprite) {
			self.sprite.reset();
		}
		
		switch (state) {
			case self.states.idle:
				self.sprite.changeFrames(self.image.frames.idle, false, true);
				break;
			case self.states.walkLeft:
				self.sprite.changeFrames(self.image.frames.walkLeft, false, true);
				break;
			case self.states.walkRight:
				self.sprite.changeFrames(self.image.frames.walkRight, false, true);
				break;
			case self.states.punch:
				self.sprite.changeFrames(self.image.frames.punch, true, true);
				break;
			case self.states.kick:
				self.sprite.changeFrames(self.image.frames.kick, true, true);
				break;
			case self.states.getHit:
				self.sprite.changeFrames(self.image.frames.getHit, true, true);
				break;
			case self.states.win:
				self.sprite.changeFrames(self.image.frames.win, false, false);
				break;
			case self.states.lose:
				self.sprite.changeFrames(self.image.frames.lose, false, false);
				break;
		}
	};
	
	self.idle = function() {
		self.setState(self.states.idle, true);
	};
	
	self.walkLeft = function() {
		self.setState(self.states.walkLeft, false);
		
		//TODO: collision detection / opponent-related elsewhere
		if (self.position.x < self.opponent.position.x) {
			self.setPosition(Math.max(config.fighter.x, self.position.x - config.fighter.stepLength), self.position.y);
		} else {
			self.setPosition(Math.max(self.opponent.position.x + config.fighter.bodyWidth * config.fighter.vulnerability, self.position.x - config.fighter.stepLength), self.position.y);
		}
	};
	
	self.walkRight = function() {
		self.setState(self.states.walkRight, false);
		
		//TODO: collision detection / opponent-related elsewhere
		if (self.position.x < self.opponent.position.x) {
			self.setPosition(Math.min(self.opponent.position.x - config.fighter.bodyWidth * config.fighter.vulnerability, self.position.x + config.fighter.stepLength), self.position.y);
		} else {
			self.setPosition(Math.min(self.position.x + config.fighter.stepLength, config.arena.width - config.fighter.bodyWidth), self.position.y);
		}
	};
	
	self.punch = function() {
		self.setState(self.states.punch, true);
		
		//TODO: collision detection elsewhere
		if ((self.position.x < self.opponent.position.x && (self.opponent.position.x - self.position.x) < config.fighter.bodyWidth) ||
			(self.opponent.position.x < self.position.x && (self.position.x - self.opponent.position.x) < config.fighter.bodyWidth)) {
			self.opponent.getHit();
			
			sounds.get('getPunched').play();
		}
	};
	
	self.kick = function() {
		self.setState(self.states.kick, true);
		
		//TODO: collision detection elsewhere
		if ((self.position.x < self.opponent.position.x && (self.opponent.position.x - self.position.x) < config.fighter.bodyWidth) ||
			(self.opponent.position.x < self.position.x && (self.position.x - self.opponent.position.x) < config.fighter.bodyWidth)) {
			self.opponent.getHit();
			
			sounds.get('getKicked').play();
		}
	};
	
	self.getHit = function() {
		self.setState(self.states.getHit, true);
		
		sounds.get('moan' + Math.round(Math.random() + 1)).play();
		
		self.energy = Math.max(0, self.energy - config.fighter.damage);
	};
	
	self.win = function() {
		self.setState(self.states.win, true);
	};
	
	self.lose = function() {
		self.setState(self.states.lose, true);
	};
	
	self.construct();
}