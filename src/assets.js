// Assets shared by all characters. Character assets are defined in src/characters.
export const images = {
	arena: 'assets/images/arena.gif',
	energyBar: 'assets/images/energy-bar.gif',
	energy: 'assets/images/energy.gif',
	fight: 'assets/images/fight.png'
};

export const sounds = {
	fight: 'assets/sounds/fight.mp3',
	punch: 'assets/sounds/punch.mp3',
	kick: 'assets/sounds/kick.mp3',
	moans: ['assets/sounds/moan-1.mp3', 'assets/sounds/moan-2.mp3']
};

export function assetPaths(characters) {
	return {
		images: [
			...Object.values(images),
			...characters.flatMap((character) => Object.values(character.images))
		],
		sounds: [
			sounds.fight,
			sounds.punch,
			sounds.kick,
			...sounds.moans,
			...characters.flatMap((character) => Object.values(character.sounds))
		]
	};
}
