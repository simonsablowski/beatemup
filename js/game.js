function Game(element) {
	this.element = element;
	this.player = null;
	this.enemy = null;
	this.winner = null;
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
		this.bindKeyCodes();
	};
	
	this.bindKeyCodes = function() {
		var self = this;
		$(document).keyup(function(e) {
			switch (e.keyCode) {
				case self.keyCodes.left:
					self.player.moveLeft();
					break;
				case self.keyCodes.right:
					self.player.moveRight();
					break;
				case self.keyCodes.space:
					self.player.attack();
					break;
			}
		});
	};
	
	this.end = function() {
		this.unbindKeyCodes();
		this.enemy.stopFighting();
		this.element.addClass('ended');
		this.determineWinner();
		this.showResultScreen();
	};
	
	this.unbindKeyCodes = function() {
		$(document).unbind('keyup');
	};
	
	this.determineWinner = function() {
		if (this.enemy.getEnergy() == 0) {
			this.winner = this.player;
		} else if (this.player.getEnergy() == 0) {
			this.winner = this.enemy;
		}
	};
	
	this.showResultScreen = function() {
		if (this.winner == this.player) {
			$('#playerWins').show();
		} else if (this.winner == this.enemy) {
			$('#playerLoses').show();
		}
	};
	
	this.getWidth = function() {
		return this.element.width();
	};
	
	this.updateEnergy = function() {
		$('#playerEnergy').css('width', this.player.getEnergy() + '%');
		$('#enemyEnergy').css('width', this.enemy.getEnergy() + '%');
		
		if (this.player.getEnergy() == 0 || this.enemy.getEnergy() == 0) {
			this.end();
		}
	};
}

$(function() {
	var offset = 100;
	
	var gameElement = $('<div/>', {
		id: 'game'
	}).appendTo($('#content'));
	
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
		id: 'playerEnergyBar'
	}).append($('<div/>', {
		id: 'playerEnergy',
		css: {
			width: '100%'
		}
	})).append('<span>Player</span>').appendTo(gameElement);
	
	var enemyEnergyBarElement = $('<div/>', {
		id: 'enemyEnergyBar'
	}).append($('<div/>', {
		id: 'enemyEnergy',
		css: {
			width: '100%'
		}
	})).append('<span>Enemy</span>').appendTo(gameElement);
	
	var playerWinsElement = $('<div/>', {
		id: 'playerWins'
	}).append('<span>You win!</span>').hide().appendTo(gameElement);
	
	var playerLosesElement = $('<div/>', {
		id: 'playerLoses'
	}).append('<span>You lose!</span>').hide().appendTo(gameElement);
	
	var game = new Game(gameElement);
	var player = new Player(playerElement, game);
	var enemy = new Enemy(enemyElement, game);
	
	game.start(player, enemy);
	enemy.startFighting();
});