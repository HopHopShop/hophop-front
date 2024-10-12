import { useEffect, useState } from 'react';

import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';

interface IResponseError {
	error: {
		message: string;
	};
}

interface UseFetchResult<T> {
	data: T | null;
	error: string | null;
	loading: boolean;
}

interface IProps {
	endpoint: string;
	options?: RequestInit;
	skip?: boolean;
	isFile?: boolean;
}

export function useFetchAuth<T>(props: IProps): UseFetchResult<T> {
	const { endpoint, options = {}, skip = false, isFile = false } = props;
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(!skip);

	useEffect(() => {
		if (!skip) {
			const fetchData = async () => {
				setLoading(true);
				try {
					const res = await fetchWithAuth<T>(endpoint, options, isFile);

					if (!res.success) {
						setError(res.error.message);
					} else {
						setData(res.data);
						return res.data;
					}
				} catch (err) {
					setError('Fetch error occurred');
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
