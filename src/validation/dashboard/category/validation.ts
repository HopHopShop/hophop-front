import * as yup from 'yup';

export const categoryValid = (name: string) => {
	return yup
		.string()
		.min(1, `${name} should not be empty`)
		.matches(/^[\s\S]*$/, `${name} is not valid`)
		.required(`${name} is required`);
};
