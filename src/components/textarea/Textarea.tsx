import { useField } from 'formik';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

export interface IProps {
	name: string;
	placeholder: string;
	title?: string;
	className?: string;
	rows: number;
}

export default function Textarea(props: IProps) {
	const { rows, title, className = '', ...rest } = props;
	const [field, meta] = useField(rest);
	const inputClassName = `${styles.input} ${meta.touched && meta.error ? styles.inputError : meta.touched ? styles.inputSuccess : ''}`;

	return (
		<div className={`${styles.inputWrapper} ${className}`}>
			{title && (
				<span className={`${styles.title} ${robotoCondensed.className}`}>
					{title}
				</span>
			)}
			<textarea
				wrap="soft"
				rows={rows}
				// cols={33}
				{...field}
				{...rest}
				className={inputClassName}
			/>
			{meta.touched && meta.error ? (
				<span className={`${styles.error}`}>{meta.error}</span>
			) : null}
		</div>
	);
}
