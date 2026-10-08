import {describe, expect, it} from 'vitest';
import {characters} from '../src/characters/index.js';
import {config} from '../src/config.js';
import {Fighter} from '../src/fighters/Fighter.js';
import {moves} from '../src/fighters/moves.js';
import {NO_INPUT} from '../src/input/intent.js';

const {stepLength, minDistance, attackCooldown, maxEnergy} = config.fighter;

function fighters(leftX = 0, rightX = 480) {
	const left = new Fighter(characters.scorpion, leftX);
	const right = new Fighter(characters.subZero, rightX);
	left.setOpponent(right);
	right.setOpponent(left);
	return {left, right};
}

const press = (intent) => ({...NO_INPUT, ...intent});

describe('Fighter', () => {
	it('faces the opponent', () => {
		const {left, right} = fighters();
		expect(left.facing).toBe('right');
		expect(right.facing).toBe('left');
		expect(left.mirrored).toBe(false);
		expect(right.mirrored).toBe(false);
	});

	it('walks forward and backward relative to the opponent', () => {
		const {left, right} = fighters(100, 480);
		left.update(press({right: true}));
		expect(left.state).toBe('walkForward');
		expect(left.x).toBe(100 + stepLength);

		right.update(press({right: true}));
		expect(right.state).toBe('walkBackward');
	});

	it('returns to idle when no direction is held', () => {
		const {left} = fighters(100);
		left.update(press({right: true}));
		left.update();
		expect(left.state).toBe('idle');
	});

	it('stays inside the arena', () => {
		const {left, right} = fighters();
		left.update(press({left: true}));
		expect(left.x).toBe(0);
		right.update(press({right: true}));
		expect(right.x).toBe(config.arena.width - characters.subZero.frameWidth);
	});

	it('cannot walk through the opponent', () => {
		const {left, right} = fighters(0, minDistance + 5);
		left.update(press({right: true}));
		expect(left.x).toBe(right.x - minDistance);
	});

	it('lands an attack on its hit frame and then returns to idle', () => {
		const {left} = fighters();
		const {hitFrame, frames} = characters.scorpion.animations.punch;

		const landed = [left.update(press({punch: true}))];
		for (let tick = 1; tick < frames.length; tick++) {
			landed.push(left.update());
		}
		expect(landed.indexOf(moves.punch)).toBe(hitFrame);
		expect(landed.filter(Boolean)).toHaveLength(1);

		left.update();
		expect(left.state).toBe('idle');
	});

	it('cannot attack again during the cooldown', () => {
		const {left} = fighters();
		left.update(press({punch: true}));

		let ticksUntilNextAttack = 0;
		do {
			ticksUntilNextAttack++;
			left.update(press({punch: true}));
		} while (!(left.state === 'punch' && left.ticks === 0) && ticksUntilNextAttack < 20);

		expect(ticksUntilNextAttack).toBe(attackCooldown);
	});

	it('is interrupted by a hit and ignores input while hit', () => {
		const {left} = fighters();
		left.update(press({kick: true}));
		left.takeHit(10);
		expect(left.state).toBe('hit');
		expect(left.energy).toBe(maxEnergy - 10);

		const landed = left.update(press({punch: true, right: true}));
		expect(landed).toBeNull();
		expect(left.state).toBe('hit');
	});

	it('cannot drop below zero energy', () => {
		const {left} = fighters();
		left.takeHit(maxEnergy + 50);
		expect(left.energy).toBe(0);
		expect(left.isDefeated).toBe(true);
	});

	it('holds the last frame of its win and lose animations', () => {
		const {left} = fighters();
		left.lose();
		for (let tick = 0; tick < 10; tick++) {
			left.update(press({punch: true}));
		}
		const {frames} = characters.scorpion.animations.lose;
		expect(left.state).toBe('lose');
		expect(left.frame).toEqual(frames[frames.length - 1]);
	});

	it('resets position, energy and state', () => {
		const {left} = fighters(100);
		left.update(press({right: true}));
		left.takeHit(20);
		left.reset();
		expect(left.x).toBe(100);
		expect(left.energy).toBe(maxEnergy);
		expect(left.state).toBe('idle');
	});
});
