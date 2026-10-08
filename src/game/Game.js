import {images, sounds} from '../assets.js';
import {config, msToTicks} from '../config.js';
import {resolveHits} from '../fighters/combat.js';
import {Fighter} from '../fighters/Fighter.js';
import {ComputerInput} from '../input/ComputerInput.js';
import {Hud} from './Hud.js';

// The game moves through these stages:
// title -> fight -> over -> fight (rematch) -> ...
export class Game {
	constructor({assets, renderer, input, player, computer}) {
		this.assets = assets;
		this.renderer = renderer;
		this.input = input;
		this.hud = new Hud(assets);

		this.player = new Fighter(player, 0);
		this.computer = new Fighter(computer, config.arena.width - computer.frameWidth);
		this.player.setOpponent(this.computer);
		this.computer.setOpponent(this.player);
		this.computerInput = new ComputerInput(this.computer);

		this.setStage('title');
	}

	setStage(stage) {
		this.stage = stage;
		this.stageTicks = 0;
	}

	update() {
		const intent = this.input.read();
		this.stageTicks++;

		switch (this.stage) {
			case 'title':
				this.updateIdle();
				if (intent.any) {
					this.startFight();
				}
				break;
			case 'fight':
				this.updateFight(intent);
				break;
			case 'over':
				this.updateIdle();
				this.updateOver(intent);
				break;
		}
	}

	updateIdle() {
		this.player.update();
		this.computer.update();
	}

	startFight() {
		this.player.reset();
		this.computer.reset();
		this.computerInput.reset();
		this.winner = null;
		this.assets.playSound(sounds.fight);
		this.setStage('fight');
	}

	updateFight(intent) {
		const hits = resolveHits([
			{attacker: this.player, move: this.player.update(intent)},
			{attacker: this.computer, move: this.computer.update(this.computerInput.read())}
		]);
		for (const {move} of hits) {
			this.assets.playSound(move.sound);
			this.assets.playSound(sounds.moans[Math.floor(Math.random() * sounds.moans.length)]);
		}

		if (this.player.isDefeated || this.computer.isDefeated) {
			this.winner = this.computer.isDefeated ? this.player : this.computer;
			this.winner.opponent.lose();
			this.setStage('over');
		}
	}

	updateOver(intent) {
		if (this.stageTicks === msToTicks(config.timing.victoryDelay)) {
			this.winner.win();
			this.assets.playSound(this.winner.character.sounds.wins);
		}
		if (this.canRematch && intent.any) {
			this.startFight();
		}
	}

	get canRematch() {
		return this.stage === 'over' &&
			this.stageTicks >= msToTicks(config.timing.victoryDelay + config.timing.rematchDelay);
	}

	render() {
		const {renderer, assets} = this;
		renderer.drawImage(assets.image(images.arena), 0, 0);
		this.drawFighter(this.computer);
		this.drawFighter(this.player);
		this.hud.draw(renderer, this.player, this.computer);

		if (this.stage === 'fight' && this.stageTicks < msToTicks(config.timing.fightBanner)) {
			renderer.drawCentered(assets.image(images.fight), config.hud.fightBannerY);
		}
		if (this.stage === 'over' && this.stageTicks >= msToTicks(config.timing.victoryDelay)) {
			renderer.drawCentered(assets.image(this.winner.character.images.wins), config.hud.winsBannerY);
		}
	}

	drawFighter(fighter) {
		const {character} = fighter;
		this.renderer.drawSprite(
			this.assets.image(character.images.sprites),
			fighter.frame,
			character.frameWidth,
			character.frameHeight,
			fighter.x,
			fighter.y,
			fighter.mirrored
		);
	}
}
