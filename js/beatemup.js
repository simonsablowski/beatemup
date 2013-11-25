var canvas, game, player, enemy;

function Game() {
	this.images = null;
	this.winner = null;
	this.loser = null;
	this.keyCodes = {
		space: 32,
		left: 37,
		up: 38,
		right: 39,
		down: 40
	};
	
	this.construct = function() {
		this.initializeCanvas();
		this.loadImages();
		return this;
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
	
	this.start = function() {
		player.opponent = enemy;
		enemy.opponent = player;
		this.bindKeys();
		enemy.startFighting();
		this.draw();
	};
	
	this.bindKeys = function() {
		var self = this;
		document.addEventListener('keyup', function(event) {
			switch (event.which) {
				case self.keyCodes.left:
					player.moveLeft();
					break;
				case self.keyCodes.right:
					player.moveRight();
					break;
				case self.keyCodes.space:
					player.attack();
					break;
			}
		});
	};
	
	this.end = function() {
		this.unbindKeys();
		enemy.stopFighting();
		this.determineWinner();
		this.winner.win();
		this.loser.lose();
		this.draw();
	};
	
	this.unbindKeys = function() {
		document.removeEventListener('keyup');
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
		canvas.drawImage(this.images.arena, 0, 0);
		
		canvas.drawImage(this.images.player, player.clip, 0, 250, 320, player.position.x, player.position.y + 160, 250, 320);
		canvas.drawImage(this.images.enemy, enemy.clip, 0, 250, 320, enemy.position.x, enemy.position.y + 160, 250, 320);
		canvas.drawImage(this.images.playerEnergyBar, 40, 60);
		canvas.drawImage(this.images.enemyEnergyBar, 436, 60);
		canvas.drawImage(this.images.playerEnergy, 42, 62, player.energy / 100 * 320, 20);
		canvas.drawImage(this.images.enemyEnergy, 438 + (100 - enemy.energy) / 100 * 320, 62, enemy.energy / 100 * 320, 20);
		canvas.drawImage(this.images.playerName, 66, 62, 125, 19);
		canvas.drawImage(this.images.enemyName, 613, 62, 125, 19);
		
		if (this.winner == player) {
			canvas.drawImage(this.images.playerWins, 250, 112);
		} else if (this.winner == enemy) {
			canvas.drawImage(this.images.enemyWins, 250, 112);
		}
	};
	
	return this.construct();
}

function Fighter() {
	this.position = null;
	this.opponent = null;
	this.energy = 100;
	this.stepLength = 40;
	this.vulnerability = 0.5;
	this.damage = 5;
	this.delay = 60;
	this.clip = 0;
	this.reset = null;
	
	this.changeAction = function(action, reset, draw) {
		switch (action) {
			default:
				this.clip = 0;
				break;
			case 'moving-left':
				this.clip = 250;
				break;
			case 'moving-right':
				this.clip = 500;
				break;
			case 'punching':
				this.clip = 750;
				break;
			case 'kicking':
				this.clip = 1000;
				break;
			case 'hit':
				this.clip = 1250;
				break;
			case 'winning':
				this.clip = 1500;
				clearTimeout(this.reset);
				break;
			case 'losing':
				this.clip = 1750;
				clearTimeout(this.reset);
				break;
		}
		
		if (reset == true || reset == undefined) {
			var self = this;
			this.reset = setTimeout(function() {
				self.changeAction(null, false, draw);
			}, self.delay);
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
			this.changePosition(Math.max(0, this.position.x - this.stepLength), 0);
		} else {
			this.changePosition(Math.max(this.opponent.position.x + 250 * this.vulnerability, this.position.x - this.stepLength), 0);
		}
	};
	
	this.moveRight = function() {
		this.changeAction('moving-right');
		
		if (this.position.x < this.opponent.position.x) {
			this.changePosition(Math.min(this.opponent.position.x - 250 * this.vulnerability, this.position.x + this.stepLength), 0);
		} else {
			this.changePosition(Math.min(this.position.x + this.stepLength, 550), 0);
		}
	};
	
	this.attack = function() {
		if (Math.floor(Math.random() * 2) > 0) {
			var attack = 'punching';
		} else {
			var attack = 'kicking';
		}
		
		this.changeAction(attack);
		
		if ((this.position.x < this.opponent.position.x && (this.opponent.position.x - this.position.x) < 250) ||
			(this.opponent.position.x < this.position.x && (this.position.x - this.opponent.position.x) < 250)) {
			this.opponent.getHit();
		}
	};
	
	this.getHit = function() {
		this.changeAction('hit');
		
		this.energy = Math.max(0, this.energy - this.damage);
		
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
		this.changePosition(100, 0);
		return this;
	};
	
	return this.construct();
}

Enemy.prototype = new Fighter;
Enemy.prototype.constructor = Enemy;

function Enemy() {
	this.fighting = null;
	
	this.construct = function() {
		this.changeAction(null, false, false);
		this.changePosition(450, 0);
		return this;
	};
	
	this.startFighting = function() {
		var self = this;
		this.fighting = setInterval(function() {
			if (Math.floor(Math.random() * 6) > 0) {
				self.moveLeft();
			} else {
				self.moveRight();
			}
			
			if (self.opponent.position.x >= (self.position.x - 250 * self.vulnerability)) {
				self.attack();
			}
		}, 200);
	};
	
	this.stopFighting = function() {
		clearInterval(this.fighting);
	};
	
	return this.construct();
}

document.addEventListener('DOMContentLoaded', function() {
	game = new Game();
	player = new Player();
	enemy = new Enemy();

	game.start();
});