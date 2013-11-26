var canvas, game, player, enemy;

var config = {
	arena: {
		width: 800,
		height: 508,
		x: 0,
		y: 0
	},
	fighter: {
		width: 250,
		height: 320,
		x: 0,
		y: 160,
		stepLength: 40,
		vulnerability: 0.5,
		damage: 5,
		speed: 100
	},
	fighterName: {
		width: 125,
		height: 19,
		x: 66,
		y: 62
	},
	fighterWins: {
		width: 300,
		height: 36,
		x: 250,
		y: 112
	},
	energyBar: {
		width: 324,
		height: 24,
		x: 40,
		y: 60
	},
	energy: {
		width: 320,
		height: 20,
		x: 42,
		y: 62
	},
	keys: {
		attack: 32,
		moveLeft: 37,
		moveRight: 39
	}
};

function Game() {
	this.images = null;
	this.winner = null;
	this.loser = null;
	
	this.construct = function() {
		this.initializeCanvas();
		this.loadImages();
		this.loadSounds();
	};
	
	this.initializeCanvas = function() {
		canvas = document.getElementById('game').getContext('2d');
	};
	
	this.loadImages = function() {
		this.images = {
			arena: this.loadImage('img/arena.gif'),
			player: this.loadImage('img/player.gif'),
			playerEnergyBar: this.loadImage('img/energy-bar.gif'),
			playerEnergy: this.loadImage('img/energy.gif'),
			playerName: this.loadImage('img/player-name.gif'),
			playerWins: this.loadImage('img/player-wins.gif'),
			enemy: this.loadImage('img/enemy.gif'),
			enemyEnergyBar: this.loadImage('img/energy-bar.gif'),
			enemyEnergy: this.loadImage('img/energy.gif'),
			enemyName: this.loadImage('img/enemy-name.gif'),
			enemyWins: this.loadImage('img/enemy-wins.gif')
		};
	};
	
	this.loadImage = function(source) {
		var image = new Image();
		image.src = source;
		return image;
	};
	
	this.loadSounds = function() {
		this.images = {
			arena: this.loadSound('img/arena.gif'),
			player: this.loadSound('img/player.gif'),
			playerEnergyBar: this.loadSound('img/energy-bar.gif'),
			playerEnergy: this.loadSound('img/energy.gif'),
			playerName: this.loadSound('img/player-name.gif'),
			playerWins: this.loadSound('img/player-wins.gif'),
			enemy: this.loadSound('img/enemy.gif'),
			enemyEnergyBar: this.loadSound('img/energy-bar.gif'),
			enemyEnergy: this.loadSound('img/energy.gif'),
			enemyName: this.loadSound('img/enemy-name.gif'),
			enemyWins: this.loadSound('img/enemy-wins.gif')
		};
	};
	
	this.loadSound = function(source) {
		var sound = new Audio();
		sound.src = source;
		return sound;
	};
	
	this.bindKeys = function(event) {
		switch (event.which) {
			case config.keys.attack:
				player.attack();
				break;
			case config.keys.moveLeft:
				player.moveLeft();
				break;
			case config.keys.moveRight:
				player.moveRight();
				break;
		}
	};
	
	this.start = function() {
		player.opponent = enemy;
		enemy.opponent = player;
		document.addEventListener('keyup', this.bindKeys);
		enemy.startFighting();
		this.draw();
	};
	
	this.end = function() {
		document.removeEventListener('keyup', this.bindKeys);
		enemy.stopFighting();
		this.determineWinner();
		this.winner.win();
		this.loser.lose();
		this.draw();
	};
	
	this.determineWinner = function() {
		if (enemy.energy == 0) {
			this.winner = player;
			this.loser = enemy;
		} else if (player.energy == 0) {
			this.winner = enemy;
			this.loser = player;
		}
	};
	
	this.checkEnergy = function() {
		if (player.energy == 0 || enemy.energy == 0) {
			this.end();
		}
	};
	
	this.draw = function() {
		canvas.drawImage(this.images.arena, config.arena.x, config.arena.y);
		canvas.drawImage(this.images.player, player.clip, 0, config.fighter.width, config.fighter.height, player.position.x, player.position.y + config.fighter.y, config.fighter.width, config.fighter.height);
		canvas.drawImage(this.images.enemy, enemy.clip, 0, config.fighter.width, config.fighter.height, enemy.position.x, enemy.position.y + config.fighter.y, config.fighter.width, config.fighter.height);
		canvas.drawImage(this.images.playerEnergyBar, config.energyBar.x, config.energyBar.y);
		canvas.drawImage(this.images.enemyEnergyBar, config.arena.width - config.energyBar.width - config.energyBar.x, config.energyBar.y);
		canvas.drawImage(this.images.playerEnergy, config.energy.x, config.energy.y, player.energy / 100 * config.energy.width, config.energy.height);
		canvas.drawImage(this.images.enemyEnergy, config.arena.width - config.energy.width - config.energy.x + (100 - enemy.energy) / 100 * config.energy.width, config.energy.y, enemy.energy / 100 * config.energy.width, config.energy.height);
		canvas.drawImage(this.images.playerName, config.fighterName.x, config.fighterName.y, config.fighterName.width, config.fighterName.height);
		canvas.drawImage(this.images.enemyName, config.arena.width - config.fighterName.width - config.fighterName.x, config.fighterName.y, config.fighterName.width, config.fighterName.height);
		
		if (this.winner == player) {
			canvas.drawImage(this.images.playerWins, config.fighterWins.x, config.fighterWins.y);
		} else if (this.winner == enemy) {
			canvas.drawImage(this.images.enemyWins, config.fighterWins.x, config.fighterWins.y);
		}
	};
	
	this.construct();
}

function Fighter() {
	this.position = null;
	this.opponent = null;
	this.energy = 100;
	this.clip = 0;
	this.reset = null;
	
	this.changeAction = function(action, reset, draw) {
		switch (action) {
			default:
				this.clip = 0;
				break;
			case 'moving-left':
				this.clip = 1 * config.fighter.width;
				break;
			case 'moving-right':
				this.clip = 2 * config.fighter.width;
				break;
			case 'punching':
				this.clip = 3 * config.fighter.width;
				break;
			case 'kicking':
				this.clip = 4 * config.fighter.width;
				break;
			case 'hit':
				this.clip = 5 * config.fighter.width;
				break;
			case 'winning':
				this.clip = 6 * config.fighter.width;
				clearTimeout(this.reset);
				break;
			case 'losing':
				this.clip = 7 * config.fighter.width;
				clearTimeout(this.reset);
				break;
		}
		
		if (reset == true || reset == undefined) {
			var self = this;
			this.reset = setTimeout(function() {
				self.changeAction(null, false, draw);
			}, config.fighter.speed);
		}
		
		if (draw == true || draw == undefined) {
			game.draw();
		}
	};
	
	this.changePosition = function(x, y) {
		this.position = {
			x: x,
			y: y
		};
	};
	
	this.moveLeft = function() {
		this.changeAction('moving-left');
		
		if (this.position.x < this.opponent.position.x) {
			this.changePosition(Math.max(0, this.position.x - config.fighter.stepLength), 0);
		} else {
			this.changePosition(Math.max(this.opponent.position.x + config.fighter.width * config.fighter.vulnerability, this.position.x - config.fighter.stepLength), 0);
		}
	};
	
	this.moveRight = function() {
		this.changeAction('moving-right');
		
		if (this.position.x < this.opponent.position.x) {
			this.changePosition(Math.min(this.opponent.position.x - config.fighter.width * config.fighter.vulnerability, this.position.x + config.fighter.stepLength), 0);
		} else {
			this.changePosition(Math.min(this.position.x + config.fighter.stepLength, config.arena.width - config.fighter.width), 0);
		}
	};
	
	this.attack = function() {
		if (Math.floor(Math.random() * 2) > 0) {
			var attack = 'punching';
		} else {
			var attack = 'kicking';
		}
		
		this.changeAction(attack);
		
		if ((this.position.x < this.opponent.position.x && (this.opponent.position.x - this.position.x) < config.fighter.width) ||
			(this.opponent.position.x < this.position.x && (this.position.x - this.opponent.position.x) < config.fighter.width)) {
			this.opponent.getHit();
		}
	};
	
	this.getHit = function() {
		this.changeAction('hit');
		
		this.energy = Math.max(0, this.energy - config.fighter.damage);
		
		game.checkEnergy();
	};
	
	this.win = function() {
		this.changeAction('winning', false, false);
	};
	
	this.lose = function() {
		this.changeAction('losing', false, false);
	};
}

Player.prototype = new Fighter;
Player.prototype.constructor = Player;

function Player() {
	this.construct = function() {
		this.changeAction(null, false, false);
		this.changePosition(config.fighter.x, 0);
	};
	
	this.construct();
}

Enemy.prototype = new Fighter;
Enemy.prototype.constructor = Enemy;

function Enemy() {
	this.fighting = null;
	
	this.construct = function() {
		this.changeAction(null, false, false);
		this.changePosition(config.arena.width - config.fighter.width - config.fighter.x, 0);
	};
	
	this.startFighting = function() {
		var self = this;
		this.fighting = setInterval(function() {
			if (Math.floor(Math.random() * 6) > 0) {
				self.moveLeft();
			} else {
				self.moveRight();
			}
			
			if (self.opponent.position.x >= (self.position.x - config.fighter.width * config.fighter.vulnerability)) {
				self.attack();
			}
		}, 200);
	};
	
	this.stopFighting = function() {
		clearInterval(this.fighting);
	};
	
	this.construct();
}

document.addEventListener('DOMContentLoaded', function() {
	game = new Game();
	player = new Player();
	enemy = new Enemy();

	game.start();
});