import {assetPaths} from './assets.js';
import {characters} from './characters/index.js';
import {config} from './config.js';
import {Assets} from './engine/Assets.js';
import {GameLoop} from './engine/GameLoop.js';
import {Renderer} from './engine/Renderer.js';
import {Game} from './game/Game.js';
import {KeyboardInput} from './input/KeyboardInput.js';

const renderer = new Renderer(document.getElementById('arena'));
renderer.clear();
renderer.drawText('Loading…');

const player = characters.scorpion;
const computer = characters.subZero;

try {
	const assets = await Assets.load(assetPaths([player, computer]));
	const game = new Game({
		assets,
		renderer,
		input: new KeyboardInput(config.keys),
		player,
		computer
	});
	new GameLoop(config.tickRate, () => game.update(), (now) => game.render(now)).start();
} catch (error) {
	renderer.clear();
	renderer.drawText('The game could not be loaded.');
	throw error;
}
