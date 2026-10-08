import {describe, expect, it} from 'vitest';
import {characters} from '../src/characters/index.js';
import {isInReach, resolveHits} from '../src/fighters/combat.js';
import {Fighter} from '../src/fighters/Fighter.js';
import {moves} from '../src/fighters/moves.js';

function fighters(distance) {
	const left = new Fighter(characters.scorpion, 0);
	const right = new Fighter(characters.subZero, distance);
	left.setOpponent(right);
	right.setOpponent(left);
	return {left, right};
}

describe('combat', () => {
	it('checks the reach of a move', () => {
		const {left, right} = fighters(moves.punch.reach - 1);
		expect(isInReach(left, right, moves.punch)).toBe(true);
		right.x = moves.punch.reach;
		expect(isInReach(left, right, moves.punch)).toBe(false);
	});

	it('applies damage for moves in reach only', () => {
		const {left, right} = fighters(50);
		const hits = resolveHits([
			{attacker: left, move: moves.punch},
			{attacker: right, move: null}
		]);
		expect(hits).toHaveLength(1);
		expect(right.energy).toBe(100 - moves.punch.damage);
		expect(right.state).toBe('hit');
		expect(left.energy).toBe(100);
	});

	it('lets both fighters land on the same tick', () => {
		const {left, right} = fighters(50);
		const hits = resolveHits([
			{attacker: left, move: moves.punch},
			{attacker: right, move: moves.kick}
		]);
		expect(hits).toHaveLength(2);
		expect(left.state).toBe('hit');
		expect(right.state).toBe('hit');
	});

	it('misses when out of reach', () => {
		const {left, right} = fighters(300);
		expect(resolveHits([{attacker: left, move: moves.kick}])).toEqual([]);
		expect(right.energy).toBe(100);
	});
});
