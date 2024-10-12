import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchData } from '@/services/fetchData';

export const getDashboardCouponsServer = async (): Promise<
	IResponseJson<IResponse<ICoupon>>
> => {
	return await fetchData<IResponse<ICoupon>>('cart/coupon/');
};

export const getDashboardCoupons = async (page: number) => {
	return await fetchWithAuth<IResponse<ICoupon>>(`cart/coupon?page=${page}`, {
		method: 'GET',
	});
};

export const removeCouponById = async (id: number) => {
	return await fetchWithAuth<{ detail: string }>(`cart/coupon/${id}`, {
		method: 'DELETE',
	});
};
export const createCoupon = async (data: {
	[p: string]: any;
	valid_to: any;
	active: boolean;
}) => {
	return await fetchWithAuth<ICoupon>('cart/coupon/', {
		method: 'POST',
		body: JSON.stringify(data),
	});
};

export const updateCoupon = async (
	id: number,
	data: { [p: string]: any; valid_to: any; active: boolean },
) => {
	return await fetchWithAuth<ICoupon>(`cart/coupon/${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
};
export const getCouponById = async (id: string) => {
	return await fetchWithAuth<ICoupon>(`cart/coupon/${id}`, {
		method: 'GET',
	});
};
