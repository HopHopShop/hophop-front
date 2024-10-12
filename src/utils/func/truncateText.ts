export function truncateText(text: string, maxLength = 120): string {
	return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
