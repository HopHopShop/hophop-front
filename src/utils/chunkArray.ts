/**
 * Splits an array into smaller subarrays of a given size.
 *
 * @template T - Type of array elements.
 * @param {T[]} array - The array to be split.
 * @param {number} size - The number of elements in each subarray.
 * @returns {T[][]} - A two-dimensional array, where each subarray has a length not exceeding the value of `size`.
 *
 * If the array is can't evenly divided into parts, the last subarray may have fewer elements.
 *
 * @example
 * chunkArray([1, 2, 3, 4, 5], 2);
 * Return: [[1, 2], [3, 4], [5]]
 */
export default function chunkArray<T>(array: T[], size: number): T[][] {
	const chunkedArray: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		chunkedArray.push(array.slice(i, i + size));
	}
	return chunkedArray;
}
