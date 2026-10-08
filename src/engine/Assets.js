export class Assets {
	constructor() {
		this.images = new Map();
		this.sounds = new Map();
	}

	static async load({images = [], sounds = []}) {
		const assets = new Assets();
		await Promise.all(images.map(async (path) => {
			assets.images.set(path, await loadImage(path));
		}));
		for (const path of sounds) {
			const sound = new Audio(path);
			sound.preload = 'auto';
			assets.sounds.set(path, sound);
		}
		return assets;
	}

	image(path) {
		const image = this.images.get(path);
		if (!image) {
			throw new Error(`Image not loaded: ${path}`);
		}
		return image;
	}

	playSound(path) {
		const sound = this.sounds.get(path);
		if (!sound) {
			throw new Error(`Sound not loaded: ${path}`);
		}
		sound.currentTime = 0;
		// Browsers reject playback until the user has interacted with the page.
		sound.play().catch(() => {});
	}
}

function loadImage(path) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => reject(new Error(`Could not load image: ${path}`));
		image.src = path;
	});
}
