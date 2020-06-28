export function arrToMap(arr) {
	return arr.reduce(
		(acc, elem) => ({ ...acc, [elem.id]: { ...elem, loaded: false } }),
		{}
	);
}
