function Game(element) {
	var self = this;
	this.element = element;
	this.player;
	this.enemy;
	this.keyCodes = {
		space: 32,
		left: 37,
		up: 38,
		right: 39,
		down: 40
	};
	
	this.start = function(player, enemy) {
		this.player = player;
		this.enemy = enemy;
		this.player.opponent = enemy;
		this.enemy.opponent = player;
		
		$(document).keydown(function(e) {
			switch (e.keyCode) {
				case self.keyCodes.left:
					self.player.moveLeft();
					break;
				case self.keyCodes.right:
					self.player.moveRight();
					break;
				case self.keyCodes.space:
					self.player.punch();
					break;
			}
		});
	};
	
	this.getWidth = function() {
		return this.element.width();
	};
	
	this.updateEnergy = function() {
		$('#playerEnergy').css('width', this.player.getEnergy() + '%');
		$('#enemyEnergy').css('width', this.enemy.getEnergy() + '%');
	};
}

$(function() {
	var offset = 20;
	
	var gameElement = $('#game');
	var playerElement = $('<div/>', {
		id: 'player',
		css: {
			left: offset + 'px'
		}
	}).appendTo(gameElement);
	var enemyElement = $('<div/>', {
		id: 'enemy',
		css: {
			left: gameElement.width() - playerElement.width() - offset + 'px'
		}
	}).appendTo(gameElement);
	
	var playerEnergyBarElement = $('<div/>', {
		id: 'playerEnergyBar',
		css: {
			left: offset + 'px'
		}
	}).append($('<div/>', {
		id: 'playerEnergy',
		css: {
			width: '100%'
		}
	})).append('<span>Player</span>').appendTo(gameElement);
	
	var enemyEnergyBarElement = $('<div/>', {
		id: 'enemyEnergyBar',
		css: {
			left: gameElement.width() - playerEnergyBarElement.width() - offset + 'px'
		}
	}).append($('<div/>', {
		id: 'enemyEnergy',
		css: {
			width: '100%'
		}
	})).append('<span>Enemy</span>').appendTo(gameElement);
	
	var game = new Game(gameElement);
	var player = new Player(playerElement, game);
	var enemy = new Enemy(enemyElement, game);
	
	game.start(player, enemy);
	enemy.fight();
});