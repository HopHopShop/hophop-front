import * as yup from 'yup';
import { categoryValid } from '@/validation/dashboard/category/validation';

export const validationSchemaCoupon = yup.object().shape({
	code: categoryValid('Name'),
	discount: yup
		.number()
		.min(1, 'Can`t be less than 1')
		.max(90, 'Can`t be more than 90')
		.required('Обов’язкове поле'),
	active: categoryValid('Active'),
	valid_to: yup
		.string()
		.nullable()
		.required('date is required')
		.test('not-past', 'The date cannot be less than today.', function (value) {
			if (!value) return true;
			const selectedDate = new Date(value);
			const today = new Date();
			selectedDate.setHours(0, 0, 0, 0);
			today.setHours(0, 0, 0, 0);
			return selectedDate >= today;
		}),
});
