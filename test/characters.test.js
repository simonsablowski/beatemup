import {describe, expect, it} from 'vitest';
import {characters} from '../src/characters/index.js';
import {strip} from '../src/characters/frames.js';

describe('strip', () => {
	it('lists cells in either direction', () => {
		expect(strip(2, 0, 2)).toEqual([[0, 2], [1, 2], [2, 2]]);
		expect(strip(1, 3, 1)).toEqual([[3, 1], [2, 1], [1, 1]]);
		expect(strip(0, 4, 4)).toEqual([[4, 0]]);
	});
});

const requiredAnimations = ['idle', 'walkForward', 'walkBackward', 'punch', 'kick', 'hit', 'win', 'lose'];

describe.each(Object.entries(characters))('%s', (key, character) => {
	it('defines every animation', () => {
		for (const name of requiredAnimations) {
			expect(character.animations[name]?.frames.length, name).toBeGreaterThan(0);
		}
	});

	it('lands attacks within their animation', () => {
		for (const name of ['punch', 'kick']) {
			const {frames, hitFrame = 0} = character.animations[name];
			expect(hitFrame).toBeLessThan(frames.length);
		}
	});

	it('defines its assets and sprite sheet facing', () => {
		expect(Object.keys(character.images).sort()).toEqual(['name', 'sprites', 'wins']);
		expect(character.sounds.wins).toBeTypeOf('string');
		expect(['left', 'right']).toContain(character.facing);
	});
});
