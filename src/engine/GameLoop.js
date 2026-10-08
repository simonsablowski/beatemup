// Calls update() at a fixed rate and render() once per display frame.
export class GameLoop {
	constructor(tickRate, update, render) {
		this.step = 1000 / tickRate;
		this.update = update;
		this.render = render;
		this.lag = 0;
		this.last = 0;
	}

	start() {
		this.last = performance.now();
		requestAnimationFrame(this.frame);
	}

	frame = (now) => {
		// Cap the catch-up after the tab was in the background.
		this.lag += Math.min(now - this.last, 250);
		this.last = now;
		while (this.lag >= this.step) {
			this.update();
			this.lag -= this.step;
		}
		this.render();
		requestAnimationFrame(this.frame);
	};
}
