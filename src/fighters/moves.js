import {sounds} from '../assets.js';

// reach is the maximum distance between two fighters for an attack to land.
export const moves = {
	punch: {damage: 3, reach: 100, sound: sounds.punch},
	kick: {damage: 3, reach: 100, sound: sounds.kick}
};
