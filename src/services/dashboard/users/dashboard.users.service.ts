import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchWithAuthServer } from '@/services/auth/fetchApiAuthServer.service';

export const getUsersDashboardServer = async () => {
	return await fetchWithAuthServer<IResponse<IUser>>('auth/customers/', {
		method: 'GET',
	});
};
export const getDashboardUserById = async (id: string) => {
	return await fetchWithAuthServer<IUser>(`auth/customers/${id}`, {
		method: 'GET',
	});
};
export const getDashboardUsers = async (page: number) => {
	return await fetchWithAuth<IResponse<IUser>>(`auth/customers?page=${page}`, {
		method: 'GET',
	});
};
export const updateDashboardUsers = async (id: number, data: FormData) => {
	return await fetchWithAuth<IUser>(
		`auth/customers/${id}`,
		{
			method: 'PATCH',
			body: data,
		},
		true,
	);
};
export const updateProfile = async (data: FormData) => {
	return await fetchWithAuth<IUser>(
		'auth/profile',
		{
			method: 'PATCH',
			body: data,
		},
		true,
	);
};
// export const removeUserById = async (id: number) => {
// 	const res = await fetchWithAuth(`/auth/customers/${id}`, {
// 		method: 'DELETE',
// 	});
// 	return res as boolean;
// };
