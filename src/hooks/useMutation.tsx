import { useState } from 'react';

import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';

interface IUseMutationResult<T> {
	data?: T | null;
	error?: string | null;
	isLoading: boolean;
	mutate: (data: any) => Promise<IResponseJson<T> | undefined>;
}

interface IProps {
	url: string;
	options?: RequestInit;
	isFile?: boolean;
}

export function useMutation<T>(props: IProps): IUseMutationResult<T> {
	const { url, isFile = false, options = {} } = props;
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const mutate = async (value: any) => {
		setIsLoading(true);

		try {
			const res = await fetchWithAuth<T>(
				url,
				{
					body: JSON.stringify(value),
					...options,
				},
				isFile,
			);

			if (!res.success) {
				setError(res.error.message);
			} else {
				setData(res.data);
				return res;
			}
		} catch (err) {
			setError('Fetch error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	return { data, error, isLoading, mutate };
}
