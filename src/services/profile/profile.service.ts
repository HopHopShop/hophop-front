import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';

export const getProfileOrders = async (page: number = 1) => {
	return await fetchWithAuth<IResponse<IOrders>>(
		`auth/profile-orders?page=${page}`,
		{
			method: 'GET',
		},
	);
};
