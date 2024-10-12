import Cookies from 'js-cookie';

import { CookiesEnums, UserEnum } from '@/utils/enums/cookiesEnums';

export const fetchWithCookies = async <T>(
	url: string,
	options?: RequestInit,
): Promise<IResponseJson<T>> => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	try {
		const response = await fetch(`${baseURL}${url}`, {
			credentials: 'include',
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {}),
			},
		});

		const json = (await response.json()) as IResponseJson<T>;
		return json;
	} catch (error) {
		console.error('Fetch failed:', error);
		throw error;
	}
};

export const Logout = async () => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const token = Cookies.get(CookiesEnums.access_token);

	try {
		const response = await fetch(`${baseURL}/auth/logout/`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 204 || response.status === 200) {
			Cookies.remove(CookiesEnums.access_token);
			Cookies.remove(CookiesEnums.refresh_token);
			Cookies.remove(UserEnum.user);
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error('Fetch failed:', error);
		return error;
	}
};
