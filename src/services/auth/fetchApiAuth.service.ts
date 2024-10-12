import Cookies from 'js-cookie';

import { CookiesEnums, UserEnum } from '@/utils/enums/cookiesEnums';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/';

const prepareHeaders = (isFile: boolean) => {
	const headers = new Headers();

	const token = Cookies.get(CookiesEnums.access_token);
	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}
	if (!isFile) {
		headers.set('Content-Type', 'application/json');
	}
	return headers;
};

const refreshAuthToken = async (isFile: boolean) => {
	try {
		const refreshResponse = await fetch(`${baseUrl}auth/token/refresh/`, {
			method: 'POST',
			headers: prepareHeaders(isFile),
			credentials: 'include',
		});

		if (refreshResponse.ok) {
			const refreshData = await refreshResponse.json();
			Cookies.set(CookiesEnums.access_token, refreshData.data.access);
			return true;
		} else {
			const logoutRes = await fetch(`${baseUrl}auth/logout/`, {
				method: 'POST',
				headers: prepareHeaders(isFile),
				credentials: 'include',
			});
			Cookies.remove(CookiesEnums.access_token);
			Cookies.remove(UserEnum.user);
			return false;
		}
	} catch (error) {
		console.error('Error refreshing auth token:', error);
		const logoutRes = await fetch(`${baseUrl}auth/logout/`, {
			method: 'POST',
			headers: prepareHeaders(isFile),
			credentials: 'include',
		});
		Cookies.remove(CookiesEnums.access_token);
		Cookies.remove(CookiesEnums.refresh_token);
		Cookies.remove(UserEnum.user);
		return false;
	}
};

// при роботі з авторизацією
export const fetchWithAuth = async <T>(
	url: string,
	options = {},
	isFile = false,
): Promise<IResponseJson<T>> => {
	try {
		let response = await fetch(`${baseUrl}${url}`, {
			...options,
			next: {
				revalidate: 200,
			},
			headers: prepareHeaders(isFile),
			credentials: 'include',
		});

		if (response.status === 401) {
			const tokenRefreshed = await refreshAuthToken(isFile);
			if (tokenRefreshed) {
				response = await fetch(`${baseUrl}${url}`, {
					...options,
					headers: prepareHeaders(isFile),
					credentials: 'include',
				});
			}
		}

		return (await response.json()) as IResponseJson<T>;
	} catch (error) {
		console.error(`Error fetching data in ${url}`, error);
		throw error;
	}
};
