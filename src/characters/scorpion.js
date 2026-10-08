import {strip} from './frames.js';

const folder = 'assets/characters/scorpion';

export const scorpion = {
	name: 'Scorpion',
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
	// The direction the character faces in the sprite sheet.
	facing: 'right',
	// hitFrame is the frame on which an attack lands.
	animations: {
		idle: {frames: strip(0, 0, 6)},
		walkForward: {frames: strip(2, 0, 8)},
		walkBackward: {frames: strip(1, 0, 8)},
		punch: {frames: strip(3, 1, 2), hitFrame: 1},
		kick: {frames: strip(4, 3, 4), hitFrame: 1},
		hit: {frames: [[0, 0], ...strip(5, 1, 3)]},
		win: {frames: strip(6, 0, 3)},
		lose: {frames: [[0, 7], [4, 7], [5, 7]]}
	}
};
