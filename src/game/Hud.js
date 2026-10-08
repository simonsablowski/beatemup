import {images} from '../assets.js';
import {config} from '../config.js';

// Draws the energy bars and names of both fighters.
export class Hud {
	constructor(assets) {
		this.assets = assets;
	}

	draw(renderer, left, right) {
		this.drawSide(renderer, left, false);
		this.drawSide(renderer, right, true);
	}

	drawSide(renderer, fighter, isRightSide) {
		const {energyBar, energy, name} = config.hud;
		const place = (x, width) => isRightSide ? config.arena.width - width - x : x;

		const barImage = this.assets.image(images.energyBar);
		renderer.drawImage(barImage, place(energyBar.x, barImage.width), energyBar.y);

		// The right energy bar shrinks towards the right.
		const energyImage = this.assets.image(images.energy);
		const width = Math.round(energyImage.width * fighter.energy / config.fighter.maxEnergy);
		const x = place(energy.x, energyImage.width) + (isRightSide ? energyImage.width - width : 0);
		renderer.drawImagePart(energyImage, 0, 0, width, energyImage.height, x, energy.y);

		const nameImage = this.assets.image(fighter.character.images.name);
		renderer.drawImage(nameImage, place(name.x, nameImage.width), name.y);
	}
}
