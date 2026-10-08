import {describe, expect, it} from 'vitest';
import {characters} from '../src/characters/index.js';
import {config} from '../src/config.js';
import {Fighter} from '../src/fighters/Fighter.js';
import {ComputerInput} from '../src/input/ComputerInput.js';

function setup(distance, chance) {
	const player = new Fighter(characters.scorpion, 0);
	const computer = new Fighter(characters.subZero, distance);
	player.setOpponent(computer);
	computer.setOpponent(player);
	// One decision per tick makes the tests independent of timing.
	const input = new ComputerInput(computer, {actionsPerSecond: config.tickRate, random: () => chance});
	return input;
}

describe('ComputerInput', () => {
	it('walks towards the opponent most of the time', () => {
		const intent = setup(400, 0.5).read();
		expect(intent.left).toBe(true);
		expect(intent.right).toBe(false);
	});

	it('sometimes stands still', () => {
		const intent = setup(400, 0.1).read();
		expect(intent.left || intent.right).toBe(false);
	});

	it('punches or kicks when close', () => {
		const close = config.fighter.minDistance;
		expect(setup(close, 0.2).read()).toMatchObject({punch: true, kick: false, left: false});
		expect(setup(close, 0.8).read()).toMatchObject({punch: false, kick: true, left: false});
	});

	it('only makes decisions at its own pace', () => {
		const player = new Fighter(characters.scorpion, 0);
		const computer = new Fighter(characters.subZero, config.fighter.minDistance);
		player.setOpponent(computer);
		computer.setOpponent(player);
		const input = new ComputerInput(computer, {actionsPerSecond: config.tickRate / 4, random: () => 0});

		const attacks = Array.from({length: 8}, () => input.read().punch);
		expect(attacks).toEqual([false, false, false, true, false, false, false, true]);
	});
});
