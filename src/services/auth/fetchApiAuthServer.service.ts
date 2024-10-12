'use server';
import { cookies } from 'next/headers';

import { CookiesEnums } from '@/utils/enums/cookiesEnums';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/';

const prepareHeadersServer = () => {
	const headers = new Headers();

	const token = cookies().get(CookiesEnums.access_token);
	if (token?.value) {
		headers.set('Authorization', `Bearer ${token.value}`);
	}

	headers.set('Content-Type', 'application/json');
	return headers;
};

// при роботі з авторизацією
export const fetchWithAuthServer = async <T>(
	url: string,
	options = {},
): Promise<IResponseJson<T>> => {
	try {
		let response = await fetch(`${baseUrl}${url}`, {
			...options,
			headers: prepareHeadersServer(),
			credentials: 'include',
		});

		return (await response.json()) as IResponseJson<T>;
	} catch (error) {
		console.error(`Error fetching data in ${url}`, error);
		throw error;
	}
};
