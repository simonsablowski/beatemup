export class KeyboardInput {
	constructor(keys, target = window) {
		this.actions = new Map();
		for (const [action, codes] of Object.entries(keys)) {
			for (const code of codes) {
				this.actions.set(code, action);
			}
		}
		this.held = new Set();
		this.pressed = new Set();
		this.anyPressed = false;

		target.addEventListener('keydown', this.onKeyDown);
		target.addEventListener('keyup', this.onKeyUp);
		target.addEventListener('blur', this.onBlur);
	}

	onKeyDown = (event) => {
		if (isIgnored(event)) {
			return;
		}
		this.anyPressed = true;

		const action = this.actions.get(event.code);
		if (!action) {
			return;
		}
		// Keep the arrow keys and space bar from scrolling the page.
		event.preventDefault();
		this.held.add(action);
		if (!event.repeat) {
			this.pressed.add(action);
		}
	};

	onKeyUp = (event) => {
		this.held.delete(this.actions.get(event.code));
	};

	onBlur = () => {
		this.held.clear();
	};

	// Returns the intent for the current tick and clears the key presses.
	read() {
		const active = (action) => this.held.has(action) || this.pressed.has(action);
		const intent = {
			left: active('left'),
			right: active('right'),
			punch: this.pressed.has('punch'),
			kick: this.pressed.has('kick'),
			any: this.anyPressed
		};
		this.pressed.clear();
		this.anyPressed = false;
		return intent;
	}
}

// Leaves keyboard shortcuts and keys used on links or form fields alone.
function isIgnored(event) {
	return event.ctrlKey || event.metaKey || event.altKey ||
		Boolean(event.target.closest?.('a, button, input, select, textarea'));
}
