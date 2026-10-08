// Returns the sprite sheet cells [column, row] from one column to another
// (inclusive) in a single row. Columns can run in either direction.
export function strip(row, fromColumn, toColumn) {
	const step = fromColumn <= toColumn ? 1 : -1;
	const cells = [];
	for (let column = fromColumn; column !== toColumn + step; column += step) {
		cells.push([column, row]);
	}
	return cells;
}
