import { useField } from 'formik';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './Input.module.scss';
import { InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	type: string;
	name: string;
	placeholder: string;
	title?: string;
	className?: string;
}

export default function Input(props: IInputProps) {
	const { title, className = '', ...rest } = props;
	const [field, meta] = useField(rest);
	const inputClassName = `${styles.input} ${meta.touched && meta.error ? styles.inputError : meta.touched ? styles.inputSuccess : ''}`;

	return (
		<div
			className={`${styles.inputWrapper} ${robotoCondensed.className} ${className}`}
		>
			{title && <span className={styles.title}>{title}</span>}
			<input {...field} {...rest} className={inputClassName} />
			{meta.touched && meta.error ? (
				<span className={`${styles.error}`}>{meta.error}</span>
			) : null}
		</div>
	);
}
