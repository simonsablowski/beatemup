var config = {};

config.frameRate = 10;
config.difficulty = 3;
config.startDelay = 1500;
config.endDelay = 500;
config.keys = {
	punch: 32,
	kick: 13,
	walkLeft: 37,
	walkRight: 39,
	jump: 38
};

config.arena = {
	width: 800,
	height: 508,
	x: 0,
	y: 0
};
config.fighter = {
	bodyWidth: 100,
	width: 320,
	height: 320,
	x: 0,
	y: 160,
	stepLength: 20,
	vulnerability: 0.5,
	damage: 3
};
config.energy = {
	width: 320,
	height: 20,
	x: 42,
	y: 62
};

config.images = [];
config.images['arena'] = {
	fileName: 'assets/images/arena.gif',
	width: config.arena.width,
	height: config.arena.height,
	x: config.arena.x,
	y: config.arena.y
};
config.images['user'] = {
	fileName: 'assets/characters/scorpion/sprites.gif',
	width: config.fighter.width,
	height: config.fighter.height,
	x: config.fighter.x,
	y: config.fighter.y
};
config.images['user'].frames = {};
config.images['user'].frames.idle = [
	{x: 0 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 1 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 2 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 3 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 4 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 5 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 6 * config.fighter.width, y: 0 * config.fighter.height}
];
config.images['user'].frames.walkLeft = [
	{x: 0 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 1 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 2 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 3 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 4 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 5 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 6 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 7 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 8 * config.fighter.width, y: 1 * config.fighter.height}
];
config.images['user'].frames.walkRight = [
	{x: 0 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 1 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 2 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 3 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 4 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 5 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 6 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 7 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 8 * config.fighter.width, y: 2 * config.fighter.height}
];
config.images['user'].frames.punch = [
	{x: 1 * config.fighter.width, y: 3 * config.fighter.height},
	{x: 2 * config.fighter.width, y: 3 * config.fighter.height}
];
config.images['user'].frames.kick = [
	{x: 3 * config.fighter.width, y: 4 * config.fighter.height},
	{x: 4 * config.fighter.width, y: 4 * config.fighter.height}
];
config.images['user'].frames.getHit = [
	{x: 0 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 1 * config.fighter.width, y: 5 * config.fighter.height},
	{x: 2 * config.fighter.width, y: 5 * config.fighter.height},
	{x: 3 * config.fighter.width, y: 5 * config.fighter.height}
];
config.images['user'].frames.win = [
	{x: 0 * config.fighter.width, y: 6 * config.fighter.height},
	{x: 1 * config.fighter.width, y: 6 * config.fighter.height},
	{x: 2 * config.fighter.width, y: 6 * config.fighter.height},
	{x: 3 * config.fighter.width, y: 6 * config.fighter.height}
];
config.images['user'].frames.lose = [
	{x: 0 * config.fighter.width, y: 7 * config.fighter.height},
	{x: 4 * config.fighter.width, y: 7 * config.fighter.height},
	{x: 5 * config.fighter.width, y: 7 * config.fighter.height}
];
config.images['computer'] = {
	fileName: 'assets/characters/sub-zero/sprites.gif',
	width: config.fighter.width,
	height: config.fighter.height,
	x: config.arena.width - config.fighter.width - config.fighter.x,
	y: config.fighter.y
};
config.images['computer'].frames = {};
config.images['computer'].frames.idle = [
	{x: 11 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 10 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 9 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 8 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 7 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 6 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 5 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 4 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 3 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 2 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 1 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 0 * config.fighter.width, y: 0 * config.fighter.height}
];
config.images['computer'].frames.walkLeft = [
	{x: 11 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 10 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 9 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 8 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 7 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 6 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 5 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 4 * config.fighter.width, y: 1 * config.fighter.height},
	{x: 3 * config.fighter.width, y: 1 * config.fighter.height}
];
config.images['computer'].frames.walkRight = [
	{x: 11 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 10 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 9 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 8 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 7 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 6 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 5 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 4 * config.fighter.width, y: 2 * config.fighter.height},
	{x: 3 * config.fighter.width, y: 2 * config.fighter.height}
];
config.images['computer'].frames.punch = [
	{x: 10 * config.fighter.width, y: 3 * config.fighter.height},
	{x: 9 * config.fighter.width, y: 3 * config.fighter.height}
];
config.images['computer'].frames.kick = [
	{x: 10 * config.fighter.width, y: 4 * config.fighter.height},
	{x: 8 * config.fighter.width, y: 4 * config.fighter.height},
	{x: 7 * config.fighter.width, y: 4 * config.fighter.height},
	{x: 6 * config.fighter.width, y: 4 * config.fighter.height},
	{x: 5 * config.fighter.width, y: 4 * config.fighter.height},
	{x: 4 * config.fighter.width, y: 4 * config.fighter.height}
];
config.images['computer'].frames.getHit = [
	{x: 11 * config.fighter.width, y: 0 * config.fighter.height},
	{x: 10 * config.fighter.width, y: 5 * config.fighter.height},
	{x: 9 * config.fighter.width, y: 5 * config.fighter.height},
	{x: 8 * config.fighter.width, y: 5 * config.fighter.height}
];
config.images['computer'].frames.win = [
	{x: 11 * config.fighter.width, y: 6 * config.fighter.height},
	{x: 10 * config.fighter.width, y: 6 * config.fighter.height},
	{x: 9 * config.fighter.width, y: 6 * config.fighter.height},
	{x: 8 * config.fighter.width, y: 6 * config.fighter.height}
];
config.images['computer'].frames.lose = [
	{x: 11 * config.fighter.width, y: 7 * config.fighter.height},
	{x: 7 * config.fighter.width, y: 7 * config.fighter.height},
	{x: 6 * config.fighter.width, y: 7 * config.fighter.height}
];
config.images['userEnergyBar'] = {
	fileName: 'assets/images/energy-bar.gif',
	width: 324,
	height: 24,
	x: 40,
	y: 60
};
config.images['computerEnergyBar'] = {
	fileName: 'assets/images/energy-bar.gif',
	width: config.images['userEnergyBar'].width,
	height: config.images['userEnergyBar'].height,
	x: config.arena.width - config.images['userEnergyBar'].width - config.images['userEnergyBar'].x,
	y: config.images['userEnergyBar'].y
};
config.images['userEnergy'] = {
	fileName: 'assets/images/energy.gif',
	width: config.energy.width,
	height: config.energy.height,
	x: config.energy.x,
	y: config.energy.y
};
config.images['computerEnergy'] = {
	fileName: 'assets/images/energy.gif',
	width: config.energy.width,
	height: config.energy.height,
	x: config.arena.width - config.energy.width - config.energy.x,
	y: config.energy.y
};
config.images['userName'] = {
	fileName: 'assets/characters/scorpion/name.gif',
	width: 125,
	height: 19,
	x: 66,
	y: 62
};
config.images['computerName'] = {
	fileName: 'assets/characters/sub-zero/name.gif',
	width: config.images['userName'].width,
	height: config.images['userName'].height,
	x: config.arena.width - config.images['userName'].width - config.images['userName'].x,
	y: config.images['userName'].y
};
config.images['userWins'] = {
	fileName: 'assets/characters/scorpion/wins.gif',
	width: 300,
	height: 36,
	x: 250,
	y: 112
};
config.images['computerWins'] = {
	fileName: 'assets/characters/sub-zero/wins.gif',
	width: config.images['userWins'].width,
	height: config.images['userWins'].height,
	x: config.images['userWins'].x,
	y: config.images['userWins'].y
};
config.images['fight'] = {
	fileName: 'assets/images/fight.gif',
	width: 302,
	height: 80,
	x: 249,
	y: 150
};

config.sounds = [];
config.sounds['fight'] = {fileName: 'assets/sounds/fight.mp3'};
config.sounds['userWins'] = {fileName: 'assets/characters/scorpion/wins.mp3'};
config.sounds['computerWins'] = {fileName: 'assets/characters/sub-zero/wins.mp3'};
config.sounds['moan1'] = {fileName: 'assets/sounds/moan-1.mp3'};
config.sounds['moan2'] = {fileName: 'assets/sounds/moan-2.mp3'};
config.sounds['getPunched'] = {fileName: 'assets/sounds/punch.mp3'};
config.sounds['getKicked'] = {fileName: 'assets/sounds/kick.mp3'};

var game, images, sounds;

document.addEventListener('DOMContentLoaded', function() {
	game = new Game();
});