import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchData } from '@/services/fetchData';

export const getProductsDashboardServer = async (): Promise<
	IResponseJson<IResponse<IProduct>>
> => {
	return await fetchData<IResponse<IProduct>>('shop/products/');
};

export const removeProductById = async (id: number) => {
	return await fetchWithAuth<{ detail: string }>(`shop/products/${id}`, {
		method: 'DELETE',
	});
};

export const getDashboardProducts = async (
	page: number,
): Promise<IResponseJson<IResponse<IProduct>>> => {
	return await fetchWithAuth<IResponse<IProduct>>(
		`shop/products?page=${page}`,
		{
			method: 'GET',
		},
	);
};

export const createProduct = async (data: {
	name: string;
	description: string;
	category: number | null;
	price: string;
	SKU?: number;
}) => {
	return await fetchWithAuth<IProduct>('shop/products/', {
		method: 'POST',
		body: JSON.stringify(data),
	});
};

export const createProductImage = async (id: number, data: FormData) => {
	return await fetchWithAuth<{ status: string }>(
		`shop/products/${id}/upload-images/`,
		{
			method: 'POST',
			body: data,
		},
		true,
	);
};
export const updateProductImage = async (id: number, data: FormData) => {
	return await fetchWithAuth<{ status: string }>(
		`shop/products/${id}/upload-images/`,
		{
			method: 'PATCH',
			body: data,
		},
		true,
	);
};

export const getProductByID = async (id: string) => {
	return await fetchWithAuth<IProduct>(`shop/products/${id}`, {
		method: 'GET',
	});
};

export const updateProduct = async (
	id: number,
	data: {
		name: string;
		description: string;
		category: number | null;
		price: number;
		SKU?: number;
	},
) => {
	return await fetchWithAuth<IProduct>(`shop/products/${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
};
export const removeProduct = async (id: number, imageId: number) => {
	return await fetchWithAuth<any>(
		`shop/products/${id}/delete-image/${imageId}`,
		{
			method: 'DELETE',
		},
	);
};
