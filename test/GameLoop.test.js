import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {GameLoop} from '../src/engine/GameLoop.js';

describe('GameLoop', () => {
	beforeEach(() => {
		vi.stubGlobal('requestAnimationFrame', () => {});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('updates at a fixed rate and renders every frame with its timestamp', () => {
		const update = vi.fn();
		const render = vi.fn();
		const loop = new GameLoop(10, update, render);
		loop.last = 1000;

		loop.frame(1050);
		expect(update).not.toHaveBeenCalled();
		expect(render).toHaveBeenLastCalledWith(1050);

		loop.frame(1250);
		expect(update).toHaveBeenCalledTimes(2);
		expect(render).toHaveBeenLastCalledWith(1250);
	});

	it('limits catching up after a long pause', () => {
		const update = vi.fn();
		const loop = new GameLoop(10, update, () => {});
		loop.last = 0;

		loop.frame(60000);
		expect(update).toHaveBeenCalledTimes(2);
	});
});
