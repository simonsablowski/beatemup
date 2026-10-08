import {config} from '../config.js';
import {NO_INPUT} from './intent.js';

// Controls a fighter by making a random decision a few times per second:
// attack when close enough, otherwise mostly walk towards the opponent.
export class ComputerInput {
	constructor(fighter, {actionsPerSecond = config.computer.actionsPerSecond, random = Math.random} = {}) {
		this.fighter = fighter;
		this.ticksPerDecision = config.tickRate / actionsPerSecond;
		this.random = random;
		this.reset();
	}

	reset() {
		this.elapsed = 0;
		this.walking = false;
	}

	read() {
		this.elapsed++;
		if (this.elapsed < this.ticksPerDecision) {
			return this.walkIntent();
		}
		this.elapsed -= this.ticksPerDecision;
		return this.decide();
	}

	decide() {
		const {fighter} = this;
		const distance = Math.abs(fighter.opponent.x - fighter.x);
		const chance = this.random();

		if (distance <= config.fighter.minDistance) {
			this.walking = false;
			return chance < 0.5 ? {...NO_INPUT, punch: true} : {...NO_INPUT, kick: true};
		}
		this.walking = chance >= 0.25;
		return this.walkIntent();
	}

	walkIntent() {
		if (!this.walking) {
			return NO_INPUT;
		}
		const right = this.fighter.facing === 'right';
		return {...NO_INPUT, left: !right, right};
	}
}
