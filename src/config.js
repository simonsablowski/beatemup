export const config = {
	// Game logic and animations advance this many times per second.
	tickRate: 10,

	arena: {
		width: 800,
		height: 508
	},

	fighter: {
		y: 160,
		maxEnergy: 100,
		stepLength: 20,
		// Fighters can't get closer to each other than this.
		minDistance: 50,
		// Ticks before a fighter can attack again.
		attackCooldown: 5
	},

	computer: {
		actionsPerSecond: 3
	},

	// Durations in milliseconds.
	timing: {
		fightBanner: 1500,
		victoryDelay: 500,
		rematchDelay: 1500
	},

	// Action names mapped to KeyboardEvent.code values.
	keys: {
		left: ['ArrowLeft'],
		right: ['ArrowRight'],
		punch: ['Space'],
		kick: ['Enter', 'NumpadEnter']
	},

	// Positions of the left player's HUD; the right side is mirrored.
	hud: {
		energyBar: {x: 40, y: 60},
		energy: {x: 42, y: 62},
		name: {x: 66, y: 62},
		fightBannerY: 150,
		winsBannerY: 112
	}
};

export function msToTicks(ms) {
	return Math.round(ms * config.tickRate / 1000);
}
