import * as yup from 'yup';
import {
	addressValid,
	cityValid,
	countryValid,
	emailValid,
	latNameValid,
	nameValid,
	passwordValid,
	phoneValid,
	postalCodeValid,
} from '@/validation/checkout/validation';

export const accountInitialValues = {
	first_name: '',
	last_name: '',
	email: '',
	phone_number: '',
	shipping_country: '',
	shipping_city: '',
	shipping_address: '',
	shipping_postcode: '',
	old_password: '',
	password: '',
	confirmPassword: '',
};
export const accountValidationSchema = yup
	.object({
		first_name: nameValid.optional(),
		last_name: latNameValid.optional(),
		email: emailValid.optional(),
		phone_number: phoneValid.optional(),
		shipping_country: countryValid.optional(),
		shipping_city: cityValid.optional(),
		shipping_address: addressValid.optional(),
		shipping_postcode: postalCodeValid.optional(),
		old_password: passwordValid.optional(),
		password: passwordValid.optional(),
		confirmPassword: yup
			.string()
			.required('Confirm Password is required')
			.oneOf([yup.ref('password')], 'Passwords must match')
			.optional(),
	})
	.required();
