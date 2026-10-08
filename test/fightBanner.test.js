import {describe, expect, it} from 'vitest';
import {fightBanner, fightBannerFrame} from '../src/game/fightBanner.js';

const {frameCount, frameDuration} = fightBanner;
const duration = 1500;

describe('fightBannerFrame', () => {
	it('zooms in frame by frame', () => {
		for (let frame = 0; frame < frameCount; frame++) {
			expect(fightBannerFrame(frame * frameDuration, duration)).toBe(frame);
		}
	});

	it('holds the largest frame', () => {
		expect(fightBannerFrame(duration / 2, duration)).toBe(frameCount - 1);
	});

	it('zooms out at the end', () => {
		expect(fightBannerFrame(duration - frameDuration, duration)).toBe(0);
		expect(fightBannerFrame(duration - 2 * frameDuration, duration)).toBe(1);
	});

	it('is hidden outside its duration', () => {
		expect(fightBannerFrame(-1, duration)).toBeNull();
		expect(fightBannerFrame(duration, duration)).toBeNull();
	});
});
