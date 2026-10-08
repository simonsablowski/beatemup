// An intent describes what a fighter's controller wants to do during one tick.
// left and right are held, punch and kick are triggered once per press.
// any is true when any key was pressed, e.g. to start the game.
export const NO_INPUT = Object.freeze({
	left: false,
	right: false,
	punch: false,
	kick: false,
	any: false
});
