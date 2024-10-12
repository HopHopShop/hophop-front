import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchData } from '@/services/fetchData';
import { FormikValues } from 'formik';

export const getDashboardCategoriesServer = async (): Promise<
	IResponseJson<IResponse<ICategory>>
> => {
	return await fetchData<IResponse<ICategory>>('shop/categories/');
};

export const getCategories = async (): Promise<
	IResponseJson<IResponse<ICategory>>
> => {
	return await fetchWithAuth<IResponse<ICategory>>('shop/categories/');
};

export const removeCategoryById = async (id: number) => {
	return await fetchWithAuth<{ detail: string }>(`shop/categories/${id}`, {
		method: 'DELETE',
	});
};
export const getDashboardCategories = async (page: number) => {
	return await fetchWithAuth<IResponse<ICategory>>(
		`shop/categories?page=${page}`,
		{
			method: 'GET',
		},
	);
};

export const getCategoryById = async (id: string) => {
	return await fetchWithAuth<ICategory>(`shop/categories/${id}`, {
		method: 'GET',
	});
};

export const createCategory = async (data: FormikValues) => {
	return await fetchWithAuth<ICategory>('shop/categories/', {
		method: 'POST',
		body: JSON.stringify(data),
	});
};

export const updateCategory = async (
	id: number,
	data: {
		name: string;
		description: string;
	},
) => {
	return await fetchWithAuth<ICategory>(`shop/categories/${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
};

export const createCategoryImage = async (id: number, data: FormData) => {
	return await fetchWithAuth<{ image: string }>(
		`shop/categories/${id}/upload-image/`,
		{
			method: 'POST',
			body: data,
		},
		true,
	);
};

export const updateCategoryImage = async (id: number, data: FormData) => {
	return await fetchWithAuth<{ image: string }>(
		`shop/categories/${id}/upload-image/`,
		{
			method: 'PATCH',
			body: data,
		},
		true,
	);
};
