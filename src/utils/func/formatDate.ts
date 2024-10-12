export function formatDate(formatDate: string) {
	const date = new Date(formatDate);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});
}
