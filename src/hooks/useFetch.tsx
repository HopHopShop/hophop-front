import { useEffect, useState } from 'react';

interface IResponseError {
	error: {
		message: string;
	};
}

interface UseFetchResult<T> {
	data: T | null;
	error: IResponseError | null;
	loading: boolean;
}

interface IProps {
	endpoint: string;
	options?: RequestInit;
	skip?: boolean;
}

export function useFetch<T>(props: IProps): UseFetchResult<T> {
	const { endpoint, options = {}, skip = false } = props;
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<IResponseError | null>(null);
	const [loading, setLoading] = useState<boolean>(!skip);

	useEffect(() => {
		if (!skip) {
			const fetchData = async () => {
				setLoading(true);
				try {
					const baseURL = process.env.NEXT_PUBLIC_API_URL;
					const response = await fetch(`${baseURL}/${endpoint}`, {
						next: {
							revalidate: 200,
						},
						credentials: 'include',
						...options,
					});

					const json = await response.json();

					if (!json || !json.data) throw new Error('No data found.');

					if (json.success) {
						setData(json.data as T);
					} else {
						setError({
							error: {
								message: json.error?.message || 'Unknown error occurred.',
							},
						});
					}
				} catch (error: any) {
					setError({
						error: {
							message: error.message || 'An error occurred.',
						},
					});
				} finally {
					setLoading(false);
				}
			};
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [skip, endpoint]);

	return { data, error, loading };
}
