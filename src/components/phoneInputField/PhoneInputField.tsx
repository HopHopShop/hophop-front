import { FieldInputProps, FormikProps } from 'formik';

import { robotoCondensed } from '@/styles/fonts/fonts';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import styles from './styles.module.scss';

export interface IPhoneInputField<T> {
	field: FieldInputProps<string>;
	form: FormikProps<T>;
	placeholder: string;
	title: string;
	className?: string;
}

// name={'phone_number'} required in form!!!!!!!!

export default function PhoneInputField<T extends { phone_number: string }>(
	props: IPhoneInputField<T>,
) {
	const { placeholder, title, className = '', field, form, ...rest } = props;
	const inputClassName = `${styles.input} ${form.touched.phone_number && form.errors.phone_number ? styles.inputError : form.touched.phone_number ? styles.inputSuccess : ''}`;

	return (
		<div
			className={`${className} ${styles.inputWrapper} ${robotoCondensed.className}`}
		>
			{title && <span className={styles.title}>{title}</span>}
			<PhoneInput
				{...field}
				{...rest}
				className={`${field.value === '' && styles.opacity} ${inputClassName}`}
				value={field.value}
				onChange={(value) => form.setFieldValue('phone_number', value)}
				placeholder={placeholder}
			/>
			{form.touched.phone_number && form.errors.phone_number && (
				<span className={`${styles.error}`}>
					{String(form.errors.phone_number)}
				</span>
			)}
		</div>
	);
}
