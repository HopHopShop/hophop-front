import * as yup from 'yup';

export const AppErrors = {
	RequiredField: 'Required',
	InvalidEmail: 'Invalid Email',
	InvalidPhone: 'Incorrect phone format',
	minLengthName: 'Be at least 2 characters long',
	minLengthPassword: 'Be at least 8 characters long',
	maxLengthName: 'Length no more than 50 characters',
	maxLengthEmail: 'Length no more than 256 characters',
	Spaces: 'Spaces are not allowed',
	onlyLetters: 'Only letters',
	onlyLettersOrNum: 'Only numbers and letters',
	passwordLowLetter: 'The password must retain one lowercase letters',
	passwordUpLetter: 'The password must retain one uppercase letters',
	passwordNum: 'Include at least one numerical digit (0-9)',
	passwordChar:
		'Include at least one special character (!, @, #, $, %, *, ?, &)',
	InvalidPassword: 'Invalid password',
};

export const nameValid = yup
	.string()
	.matches(/^[A-Za-z'’]+$/, 'Name must contain only Latin letters')
	.required('Name is required');

export const latNameValid = yup
	.string()
	.matches(/^[A-Za-z'’]+$/, 'Last name must contain only Latin letters')
	.required('Last name is required');

export const emailValid = yup
	.string()
	.email('Invalid email format')
	.required('Email is required');

export const phoneValid = yup
	.string()
	.max(17, 'Phone number is too long')
	.matches(
		/^[\d\s+]+$/,
		'Phone number can only contain plus, space, and numbers',
	)
	.required('Phone number is required');

export const addressValid = yup
	.string()
	.matches(
		/^(?=.*[A-Za-z])[A-Za-z0-9\s]+$/,
		'Address must contain only Latin letters',
	)
	.required('Address is required');

export const cityValid = yup
	.string()
	.matches(/^[A-Za-z\s]+$/, 'City must contain only Latin letters')
	.required('City is required');

export const countryValid = yup
	.string()
	.matches(/^[A-Za-z\s]+$/, 'Country must contain only Latin letters')
	.required('Country is required');

export const postalCodeValid = yup.string().required('Postal Code is required');

export const passwordValid = yup
	.string()
	.required('Password is required')
	.min(8, 'Password is too short - should be 8 chars minimum.')
	.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
	.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
	.matches(/[0-9]/, 'Password must contain at least one number')
	.matches(
		/[!@#$%^&*(),.?":{}|<>]/,
		'Password must contain at least one special character',
	);

export const messageValid = yup
	.string()
	.required('Message is a required field');
