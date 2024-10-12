/**
 * Splits an array into a specified number of subarrays.
 *
 * The function divides the passed array into a certain number of subarrays.
 * The number of subarrays can be specified by parameter, by default, the array is divided into 2 subarrays.
 * If the number of items in the array is not a multiple of the number of subarrays,
 * the last subarray may contain fewer elements.
 *
 * @template T Type of array elements.
 *
 * @param {T[]} array - An array that needs to be split into parts.
 * @param {number} [numChunks=2] - The number of subarrays into which you want to split the array. The default is 2.
 * @returns {T[][]} - An array of subarrays into which the original array is divided.
 *
 * @example
 * // Split the array into 2 subarrays (by default):
 * const result = splitArray([1, 2, 3, 4, 5]);
 * console.log(result); // [[1, 2, 3], [4, 5]]
 */
export default function splitArray<T>(
	array: T[],
	numChunks: number = 2,
): T[][] {
	const chunkSize = Math.ceil(array.length / numChunks);
	const result: T[][] = [];

	for (let i = 0; i < array.length; i += chunkSize) {
		result.push(array.slice(i, i + chunkSize));
	}

	return result;
}
