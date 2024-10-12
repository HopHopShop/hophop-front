import * as yup from 'yup';
import { categoryValid } from '@/validation/dashboard/category/validation';

export const initialValuesEditForm = {
	name: '',
	description: '',
	category: '',
	price: '',
};

export const validationSchemaEditForm = yup
	.object({
		name: categoryValid('Name'),
		description: categoryValid('Description'),
		category: categoryValid('Category'),
		price: categoryValid('Price'),
	})
	.required();
