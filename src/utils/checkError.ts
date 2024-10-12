export function isError<T extends object>(
	something: T | IResponseError,
): something is T {
	return !('error' in something);
}
