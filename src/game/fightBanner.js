// The "Fight!" banner is a sprite strip of growing frames. It zooms in,
// holds the largest frame and zooms out again.
export const fightBanner = {
	frameCount: 5,
	frameDuration: 30
};

// Returns the frame to show `elapsed` ms after the banner appeared, or null
// once `duration` ms have passed.
export function fightBannerFrame(elapsed, duration) {
	if (elapsed < 0 || elapsed >= duration) {
		return null;
	}
	const {frameCount, frameDuration} = fightBanner;
	const zoomingIn = Math.floor(elapsed / frameDuration);
	const zoomingOut = Math.floor((duration - elapsed - 1) / frameDuration);
	return Math.min(zoomingIn, zoomingOut, frameCount - 1);
}
