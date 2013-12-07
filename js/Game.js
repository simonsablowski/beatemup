function Game() {
	var self = this;
	self.started = false;
	self.ended = false;
	
	self.construct = function() {
		images = new AssetManager(config.images);
		sounds = new AssetManager(config.sounds);
		self.renderer = new Renderer(config.arena.width, config.arena.height);
		
		self.user = new Fighter({x: config.fighter.x, y: config.fighter.y}, images.get('user'));
		self.computer = new Fighter({x: config.arena.width - config.fighter.width - config.fighter.x, y: config.fighter.y}, images.get('computer'));
		self.user.setOpponent(self.computer);
		self.computer.setOpponent(self.user);
		
		self.start();
		self.rendering = window.setInterval(self.render, 1000 / config.frameRate);
	};
	
	self.render = function() {
		self.renderer.render();
		self.user.render();
		self.computer.render();
	};
	
	self.start = function() {
		if (self.started) {
			return;
		}
		
		sounds.get('fight').play();
		self.renderer.addImages(['arena', 'computer', 'user', 'computerEnergyBar', 'userEnergyBar', 'computerEnergy', 'userEnergy', 'computerName', 'userName', 'fight']);
		
		self.constructControllers();
		self.startUpdating();
		
		window.setTimeout(function() {
			self.renderer.removeImage('fight');
		}, config.startDelay);
		
		self.started = true;
	};
	
	self.constructControllers = function() {
		self.keyboardController = new KeyboardController(self.user);
		//self.buttonController = new ButtonController(self.user);
		self.timeController = new TimeController(self.computer);
	};
	
	self.startUpdating = function() {
		self.updating = window.setInterval(self.update, 1000 / config.frameRate);
	};
	
	self.update = function() {
		self.updateEnergy();
		//TODO: find better method names
		self.keyboardController.update();
		self.timeController.update();
	};
	
	self.updateEnergy = function() {
		images.get('userEnergy').width = self.user.energy / 100 * config.energy.width;
		images.get('computerEnergy').width = self.computer.energy / 100 * config.energy.width;
		images.get('computerEnergy').x = config.arena.width - config.energy.width - config.energy.x + (100 - self.computer.energy) / 100 * config.energy.width;
		
		if (self.user.energy == 0 || self.computer.energy == 0) {
			self.end();
		}
	};
	
	self.end = function() {
		if (self.ended) {
			return;
		}
		
		self.determineWinner();
		self.loser.lose();
		
		self.destructControllers();
		self.stopUpdating();
		
		window.setTimeout(function() {
			var whoWins = self.winner == self.user ? 'userWins' : 'computerWins';
			sounds.get(whoWins).play();
			
			self.renderer.addImage(whoWins);
			self.winner.win();
		}, config.endDelay);
		
		self.ended = true;
	};
	
	self.destructControllers = function() {
		self.keyboardController.destruct();
		//self.buttonController.destruct();
		self.timeController.destruct();
	};
	
	self.stopUpdating = function() {
		window.clearInterval(self.updating);
	};
	
	self.determineWinner = function() {
		if (self.computer.energy == 0) {
			self.winner = self.user;
			self.loser = self.computer;
		} else if (self.user.energy == 0) {
			self.winner = self.computer;
			self.loser = self.user;
		}
	};
	
	self.construct();
}