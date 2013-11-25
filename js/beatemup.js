var canvas, game, player, enemy;

var ARENA_WIDTH = 800;
var ARENA_HEIGHT = 508;
var ARENA_X = 0;
var ARENA_Y = 0;
var FIGHTER_WIDTH = 250;
var FIGHTER_HEIGHT = 320;
var FIGHTER_X = 0;
var FIGHTER_Y = 160;
var ENERGY_BAR_WIDTH = 324;
var ENERGY_BAR_HEIGHT = 324;
var ENERGY_BAR_X = 40;
var ENERGY_BAR_Y = 60;
var ENERGY_WIDTH = 320;
var ENERGY_HEIGHT = 20;
var ENERGY_X = 42;
var ENERGY_Y = 62;
var FIGHTER_NAME_WIDTH = 125;
var FIGHTER_NAME_HEIGHT = 19;
var FIGHTER_NAME_X = 66;
var FIGHTER_NAME_Y = 62;
var FIGHTER_WINS_WIDTH = 300;
var FIGHTER_WINS_HEIGHT = 36;
var FIGHTER_WINS_X = 250;
var FIGHTER_WINS_Y = 112;
var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;

function Game() {
	this.images = null;
	this.winner = null;
	this.loser = null;
	
	this.construct = function() {
		this.initializeCanvas();
		this.loadImages();
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
	
	this.bindKeys = function(event) {
		switch (event.which) {
			case KEY_SPACE:
				player.attack();
				break;
			case KEY_LEFT:
				player.moveLeft();
				break;
			case KEY_RIGHT:
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
		canvas.drawImage(this.images.arena, ARENA_X, ARENA_Y);
		
		canvas.drawImage(this.images.player, player.clip, 0, FIGHTER_WIDTH, FIGHTER_HEIGHT, player.position.x, player.position.y + FIGHTER_Y, FIGHTER_WIDTH, FIGHTER_HEIGHT);
		canvas.drawImage(this.images.enemy, enemy.clip, 0, FIGHTER_WIDTH, FIGHTER_HEIGHT, enemy.position.x, enemy.position.y + FIGHTER_Y, FIGHTER_WIDTH, FIGHTER_HEIGHT);
		canvas.drawImage(this.images.playerEnergyBar, ENERGY_BAR_X, ENERGY_BAR_Y);
		canvas.drawImage(this.images.enemyEnergyBar, ARENA_WIDTH - ENERGY_BAR_WIDTH - ENERGY_BAR_X, ENERGY_BAR_Y);
		canvas.drawImage(this.images.playerEnergy, ENERGY_X, ENERGY_Y, player.energy / 100 * ENERGY_WIDTH, ENERGY_HEIGHT);
		canvas.drawImage(this.images.enemyEnergy, ARENA_WIDTH - ENERGY_WIDTH - ENERGY_X + (100 - enemy.energy) / 100 * ENERGY_WIDTH, ENERGY_Y, enemy.energy / 100 * ENERGY_WIDTH, ENERGY_HEIGHT);
		canvas.drawImage(this.images.playerName, FIGHTER_NAME_X, FIGHTER_NAME_Y, FIGHTER_NAME_WIDTH, FIGHTER_NAME_HEIGHT);
		canvas.drawImage(this.images.enemyName, ARENA_WIDTH - FIGHTER_NAME_WIDTH - FIGHTER_NAME_X, FIGHTER_NAME_Y, FIGHTER_NAME_WIDTH, FIGHTER_NAME_HEIGHT);
		
		if (this.winner == player) {
			canvas.drawImage(this.images.playerWins, FIGHTER_WINS_X, FIGHTER_WINS_Y);
		} else if (this.winner == enemy) {
			canvas.drawImage(this.images.enemyWins, FIGHTER_WINS_X, FIGHTER_WINS_Y);
		}
	};
	
	this.construct();
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
				this.clip = 1 * FIGHTER_WIDTH;
				break;
			case 'moving-right':
				this.clip = 2 * FIGHTER_WIDTH;
				break;
			case 'punching':
				this.clip = 3 * FIGHTER_WIDTH;
				break;
			case 'kicking':
				this.clip = 4 * FIGHTER_WIDTH;
				break;
			case 'hit':
				this.clip = 5 * FIGHTER_WIDTH;
				break;
			case 'winning':
				this.clip = 6 * FIGHTER_WIDTH;
				clearTimeout(this.reset);
				break;
			case 'losing':
				this.clip = 7 * FIGHTER_WIDTH;
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
			this.changePosition(Math.max(this.opponent.position.x + FIGHTER_WIDTH * this.vulnerability, this.position.x - this.stepLength), 0);
		}
	};
	
	this.moveRight = function() {
		this.changeAction('moving-right');
		
		if (this.position.x < this.opponent.position.x) {
			this.changePosition(Math.min(this.opponent.position.x - FIGHTER_WIDTH * this.vulnerability, this.position.x + this.stepLength), 0);
		} else {
			this.changePosition(Math.min(this.position.x + this.stepLength, ARENA_WIDTH - FIGHTER_WIDTH), 0);
		}
	};
	
	this.attack = function() {
		if (Math.floor(Math.random() * 2) > 0) {
			var attack = 'punching';
		} else {
			var attack = 'kicking';
		}
		
		this.changeAction(attack);
		
		if ((this.position.x < this.opponent.position.x && (this.opponent.position.x - this.position.x) < FIGHTER_WIDTH) ||
			(this.opponent.position.x < this.position.x && (this.position.x - this.opponent.position.x) < FIGHTER_WIDTH)) {
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
		this.changePosition(FIGHTER_X, 0);
	};
	
	this.construct();
}

Enemy.prototype = new Fighter;
Enemy.prototype.constructor = Enemy;

function Enemy() {
	this.fighting = null;
	
	this.construct = function() {
		this.changeAction(null, false, false);
		this.changePosition(ARENA_WIDTH - FIGHTER_WIDTH - FIGHTER_X, 0);
	};
	
	this.startFighting = function() {
		var self = this;
		this.fighting = setInterval(function() {
			if (Math.floor(Math.random() * 6) > 0) {
				self.moveLeft();
			} else {
				self.moveRight();
			}
			
			if (self.opponent.position.x >= (self.position.x - FIGHTER_WIDTH * self.vulnerability)) {
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