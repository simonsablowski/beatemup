export function isInReach(attacker, defender, move) {
	return Math.abs(defender.x - attacker.x) < move.reach;
}

// Takes the moves performed during one tick as [{attacker, move}], applies
// the ones that land and returns them. Moves are checked before any damage
// is applied, so fighters attacking each other on the same tick both land.
export function resolveHits(attacks) {
	const hits = attacks.filter(({attacker, move}) => move && isInReach(attacker, attacker.opponent, move));
	for (const {attacker, move} of hits) {
		attacker.opponent.takeHit(move.damage);
	}
	return hits;
}
