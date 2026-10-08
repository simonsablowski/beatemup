import {beforeEach, describe, expect, it, vi} from 'vitest';
import {sounds} from '../src/assets.js';
import {characters} from '../src/characters/index.js';
import {config, msToTicks} from '../src/config.js';
import {Game} from '../src/game/Game.js';
import {NO_INPUT} from '../src/input/intent.js';

function createGame() {
	const assets = {
		image: () => ({width: 100, height: 20}),
		playSound: vi.fn()
	};
	const renderer = new Proxy({}, {get: () => () => {}});
	const input = {next: NO_INPUT, read() {
		const intent = this.next;
		this.next = NO_INPUT;
		return intent;
	}};
	const game = new Game({assets, renderer, input, player: characters.scorpion, computer: characters.subZero});
	return {game, assets, input};
}

function tick(game, count = 1) {
	for (let i = 0; i < count; i++) {
		game.update();
		game.render();
	}
}

describe('Game', () => {
	let game, assets, input;

	beforeEach(() => {
		({game, assets, input} = createGame());
	});

	it('waits on the title screen for a key press', () => {
		tick(game, 10);
		expect(game.stage).toBe('title');

		input.next = {...NO_INPUT, any: true};
		tick(game);
		expect(game.stage).toBe('fight');
		expect(assets.playSound).toHaveBeenCalledWith(sounds.fight);
	});

	it('ends the fight when a fighter is defeated and offers a rematch', () => {
		input.next = {...NO_INPUT, any: true};
		tick(game);

		game.computer.energy = 0;
		tick(game);
		expect(game.stage).toBe('over');
		expect(game.winner).toBe(game.player);
		expect(game.computer.state).toBe('lose');

		tick(game, msToTicks(config.timing.victoryDelay));
		expect(game.player.state).toBe('win');
		expect(assets.playSound).toHaveBeenCalledWith(characters.scorpion.sounds.wins);

		input.next = {...NO_INPUT, any: true};
		tick(game);
		expect(game.stage).toBe('over');

		tick(game, msToTicks(config.timing.rematchDelay));
		input.next = {...NO_INPUT, any: true};
		tick(game);
		expect(game.stage).toBe('fight');
		expect(game.computer.energy).toBe(config.fighter.maxEnergy);
		expect(game.player.state).toBe('idle');
	});
});
