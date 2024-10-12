import * as yup from 'yup';

export const validationSchemaCreditCard = yup.object().shape({
	cardNumber: yup
		.string()
		.required('Card Number is required')
		.matches(/^[0-9\s]{19}$/, 'Card Number is not valid'),
	cardName: yup
		.string()
		.matches(
			/^(?!['’ ]+$)[A-Za-z'’]+(?: [A-Za-z'’]+)*$/,
			'Card Name is not valid',
		)
		.required('Card holder name is required'),
	expiryDate: yup
		.string()
		.required('Expiry Date is required')
		.matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry Date is not valid')
		.test('expiryDate', 'Expiry Date is not valid', function (value) {
			if (!value) return false;
			const [month, year] = value.split('/').map(Number);
			const now = new Date();
			const currentYear = now.getFullYear() % 100; // Get last two digits of the year
			const currentMonth = now.getMonth() + 1; // getMonth() returns month from 0-11
			if (
				year < currentYear ||
				(year === currentYear && month < currentMonth)
			) {
				return false;
			}
			return true;
		}),
	cvv: yup
		.string()
		.required('CVV is required')
		.matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
});
