import {config} from '../config.js';
import {NO_INPUT} from '../input/intent.js';
import {moves} from './moves.js';

// How each state behaves. Every state has an animation of the same name.
// 'loop' repeats and accepts input, 'once' plays once and returns to idle,
// 'hold' stops on its last frame.
const STATES = {
	idle: 'loop',
	walkForward: 'loop',
	walkBackward: 'loop',
	punch: 'once',
	kick: 'once',
	hit: 'once',
	win: 'hold',
	lose: 'hold'
};

export class Fighter {
	constructor(character, x, y = config.fighter.y) {
		this.character = character;
		this.startX = x;
		this.y = y;
		this.opponent = null;
		this.reset();
	}

	reset() {
		this.x = this.startX;
		this.energy = config.fighter.maxEnergy;
		this.cooldown = 0;
		this.setState('idle');
	}

	setOpponent(opponent) {
		this.opponent = opponent;
	}

	get facing() {
		return this.opponent && this.opponent.x < this.x ? 'left' : 'right';
	}

	// Whether the sprite has to be flipped to face the opponent.
	get mirrored() {
		return this.facing !== this.character.facing;
	}

	get isDefeated() {
		return this.energy === 0;
	}

	get animation() {
		return this.character.animations[this.state];
	}

	get frame() {
		const {frames} = this.animation;
		const index = STATES[this.state] === 'loop' ? this.ticks % frames.length : Math.min(this.ticks, frames.length - 1);
		return frames[index];
	}

	setState(state) {
		this.state = state;
		this.ticks = 0;
	}

	// Advances the fighter by one tick. Returns the move that lands on this
	// tick, if any.
	update(intent = NO_INPUT) {
		this.ticks++;
		this.cooldown = Math.max(0, this.cooldown - 1);

		if (STATES[this.state] === 'once' && this.ticks >= this.animation.frames.length) {
			this.setState('idle');
		}
		if (STATES[this.state] === 'loop') {
			this.handleInput(intent);
		}

		const move = moves[this.state];
		if (move && this.ticks === (this.animation.hitFrame ?? 0)) {
			return move;
		}
		return null;
	}

	handleInput(intent) {
		const attack = intent.punch ? 'punch' : intent.kick ? 'kick' : null;
		if (attack && this.cooldown === 0) {
			this.cooldown = config.fighter.attackCooldown;
			this.setState(attack);
			return;
		}

		const direction = Number(intent.right) - Number(intent.left);
		if (direction === 0) {
			if (this.state !== 'idle') {
				this.setState('idle');
			}
			return;
		}

		const forward = (direction > 0) === (this.facing === 'right');
		const state = forward ? 'walkForward' : 'walkBackward';
		if (this.state !== state) {
			this.setState(state);
		}
		this.moveTo(this.x + direction * config.fighter.stepLength);
	}

	// Moves as close to x as the arena and the opponent allow.
	moveTo(x) {
		const {minDistance} = config.fighter;
		const maxX = config.arena.width - this.character.frameWidth;
		let target = Math.min(Math.max(x, 0), maxX);
		if (this.opponent) {
			if (this.facing === 'right') {
				target = Math.min(target, this.opponent.x - minDistance);
			} else {
				target = Math.max(target, this.opponent.x + minDistance);
			}
		}
		this.x = target;
	}

	takeHit(damage) {
		this.energy = Math.max(0, this.energy - damage);
		this.setState('hit');
	}

	win() {
		this.setState('win');
	}

	lose() {
		this.setState('lose');
	}
}
