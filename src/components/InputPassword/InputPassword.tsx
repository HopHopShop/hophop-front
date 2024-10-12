'use client';
import { useField } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './Input.module.scss';

interface InterfaceInputPassword {
	name: string;
	placeholder: string;
	title?: string;
	className?: string;
}

export default function InputPassword(props: InterfaceInputPassword) {
	const { title, className = '', ...rest } = props;
	const [field, meta] = useField(rest);
	const inputClassName = `${styles.input} ${meta.touched && meta.error ? styles.inputError : meta.touched ? styles.inputSuccess : ''}`;
	const [openPass, setOpenPass] = useState<boolean>(true);

	return (
		<div
			className={`${styles.inputWrapper} ${robotoCondensed.className} ${className}`}
		>
			{title && <span className={styles.title}>{title}</span>}
			<input
				{...field}
				{...rest}
				type={openPass ? 'password' : 'text'}
				className={inputClassName}
			/>
			{openPass && (
				<div onClick={() => setOpenPass(!openPass)} className={styles.eye}>
					<Eye />
				</div>
			)}
			{!openPass && (
				<div onClick={() => setOpenPass(!openPass)} className={styles.eye}>
					<EyeOff />
				</div>
			)}
			{meta.touched && meta.error ? (
				<span className={`${styles.error}`}>{meta.error}</span>
			) : null}
		</div>
	);
}
