import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';

export const createNews = async (data: FormData) => {
	return await fetchWithAuth<INews>(
		'news/news/',
		{
			method: 'POST',
			body: data,
		},
		true,
	);
};

export const updateNews = async (id: number, data: FormData) => {
	return await fetchWithAuth<INews>(
		`news/news/${id}/`,
		{
			method: 'PATCH',
			body: data,
		},
		true,
	);
};

export const getDashboardNews = async (page: number = 1) => {
	return await fetchWithAuth<IResponse<INews>>(`news/news/?page=${page}`, {
		method: 'GET',
	});
};
export const deleteNews = async (id: number) => {
	return await fetchWithAuth<unknown>(`news/news/${id}/`, {
		method: 'DELETE',
	});
};
export const getNewsById = async (id: string) => {
	return await fetchWithAuth<INews>(`news/news/${id}/`, {
		method: 'GET',
	});
};
