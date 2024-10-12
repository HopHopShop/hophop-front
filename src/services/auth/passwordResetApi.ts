import { fetchData } from '../fetchData';

export const requestPasswordReset = async (email: string) => {
	try {
		const response = await fetchData<string>('auth/reset-password/request/', {
			body: JSON.stringify({ email }),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (error) {
		console.error('Error during password reset request:', error);
		return { success: false, message: 'Unknown error occurred ' };
	}
};

export const resetPassword = async (
	token: string,
	user_email: string,
	password: string,
	password2: string,
) => {
	try {
		return await fetchData('auth/reset-password/', {
			method: 'POST',
			body: JSON.stringify({
				token,
				user_email,
				password,
				password2,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		return {
			success: false,
			data: null,
			error: {
				message: 'Unknown error occurred',
			},
		};
	}
};
