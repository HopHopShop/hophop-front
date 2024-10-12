'use client';

import { Form, Formik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

import ActionModal from '@/components/ActionModal/ActionModal';
import Button from '@/components/Button/Button';
import InputPassword from '@/components/InputPassword/InputPassword';
import useOutside from '@/hooks/useOutside';
import { resetPassword } from '@/services/auth/passwordResetApi';
import { passwordValid } from '@/validation/checkout/validation';

import styles from './ResetPasswordForm.module.scss';

export interface IFormValuesProfile {
	newPassword: string;
	confirmPassword: string;
}

export default function ResetPasswordForm() {
	const [errorMessage, setErrorMessage] = useState('');
	const searchParams = useSearchParams();

	const token = searchParams.get('key') || '';
	const user_email = searchParams.get('email') || '';

	const {
		ref: successModalRef,
		isShow: isSuccessModalOpen,
		setIsShow: setIsSuccessModalOpen,
	} = useOutside(false);

	const handleSubmit = async (values: IFormValuesProfile) => {
		const res = await resetPassword(
			token,
			user_email,
			values.newPassword,
			values.confirmPassword,
		);

		if (res.success) {
			setIsSuccessModalOpen(true);
		} else {
			setErrorMessage(res.error?.message || 'An unknown error occurred');
		}
	};

	return (
		<>
			<Formik
				validationSchema={yup
					.object({
						newPassword: passwordValid,
						confirmPassword: yup
							.string()
							.required('Confirm Password is required')
							.oneOf([yup.ref('newPassword')], 'Passwords must match'),
					})
					.required()}
				initialValues={{
					newPassword: '',
					confirmPassword: '',
				}}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form className={styles.form}>
						<InputPassword
							title={'New password'}
							name={'newPassword'}
							placeholder={'New password'}
						/>
						<InputPassword
							title={'Confirm password'}
							name={'confirmPassword'}
							placeholder={'Confirm password'}
						/>
						{errorMessage && (
							<div className={styles.errorMessage}>{errorMessage}</div>
						)}
						<Button
							type="submit"
							className={styles.resetButton}
							text="Reset my password"
							style="primary"
						/>
					</Form>
				)}
			</Formik>
			{isSuccessModalOpen && (
				<ActionModal
					ref={successModalRef}
					show={isSuccessModalOpen}
					iconSrc={'/thanksPageIllustration.svg'}
					onClose={() => setIsSuccessModalOpen(false)}
					title={'Woohoo! You did it!'}
					text={`You've successfully reset your password. You're ready to rock and
						roll again!`}
					type={'success'}
				/>
			)}
		</>
	);
}
