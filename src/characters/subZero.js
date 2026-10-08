import {strip} from './frames.js';

const folder = 'assets/characters/sub-zero';

export const subZero = {
	name: 'Sub-Zero',
	images: {
		sprites: `${folder}/sprites.gif`,
		name: `${folder}/name.gif`,
		wins: `${folder}/wins.gif`
	},
	sounds: {
		wins: `${folder}/wins.mp3`
	},
	frameWidth: 320,
	frameHeight: 320,
	// The sprite sheet is mirrored, so frames run from right to left.
	facing: 'left',
	animations: {
		idle: {frames: strip(0, 11, 0)},
		walkForward: {frames: strip(1, 11, 3)},
		walkBackward: {frames: strip(2, 11, 3)},
		punch: {frames: strip(3, 10, 9), hitFrame: 1},
		kick: {frames: [[10, 4], ...strip(4, 8, 4)], hitFrame: 1},
		hit: {frames: [[11, 0], ...strip(5, 10, 8)]},
		win: {frames: strip(6, 11, 8)},
		lose: {frames: [[11, 7], [7, 7], [6, 7]]}
	}
};
