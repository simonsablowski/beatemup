function Game() {
	var self = this;
	self.started = false;
	self.ended = false;
	
	self.construct = function() {
		images = new AssetManager(config.images);
		sounds = new AssetManager(config.sounds);
		renderer = new Renderer(config.arena.width, config.arena.height);
		
		user = new Fighter({x: config.fighter.x, y: config.fighter.y}, images.get('user'));
		computer = new Fighter({x: config.arena.width - config.fighter.width - config.fighter.x, y: config.fighter.y}, images.get('computer'));
		user.setOpponent(computer);
		computer.setOpponent(user);
		
		self.start();
		self.rendering = window.setInterval(self.render, 1000 / config.frameRate);
	};
	
	self.render = function() {
		renderer.render();
		user.render();
		computer.render();
	};
	
	self.start = function() {
		if (self.started) {
			return;
		}
		
		sounds.get('fight').play();
		renderer.addImages(['arena', 'computer', 'user', 'computerEnergyBar', 'userEnergyBar', 'computerEnergy', 'userEnergy', 'computerName', 'userName', 'fight']);
		
		self.startUpdating();
		
		window.setTimeout(function() {
			renderer.removeImage('fight');
		}, config.startDelay);
		
		self.started = true;
	};
	
	self.startUpdating = function() {
		self.keyboardController = new KeyboardController(user);
		self.timeController = new TimeController(computer);
		self.updating = window.setInterval(self.update, 1000 / config.frameRate);
	};
	
	self.update = function() {
		self.updateEnergy();
		//TODO: find better method names
		self.keyboardController.update();
		self.timeController.update();
	};
	
	self.updateEnergy = function() {
		images.get('userEnergy').width = user.energy / 100 * config.energy.width;
		images.get('computerEnergy').width = computer.energy / 100 * config.energy.width;
		
		if (user.energy == 0 || computer.energy == 0) {
			self.end();
		}
	};
	
	self.end = function() {
		if (self.ended) {
			return;
		}
		
		self.determineWinner();
		self.loser.lose();
		
		self.stopUpdating();
		
		window.setTimeout(function() {
			var whoWins = self.winner == user ? 'userWins' : 'computerWins';
			sounds.get(whoWins).play();
			
			renderer.addImage(whoWins);
			self.winner.win();
		}, config.endDelay);
		
		self.ended = true;
	};
	
	self.stopUpdating = function() {
		self.keyboardController.deconstruct();
		self.timeController.deconstruct();
		window.clearInterval(self.updating);
	};
	
	self.determineWinner = function() {
		if (computer.energy == 0) {
			self.winner = user;
			self.loser = computer;
		} else if (user.energy == 0) {
			self.winner = computer;
			self.loser = user;
		}
	};
	
	self.construct();
}