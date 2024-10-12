'use client';

import { Formik, Form } from 'formik';
import { forwardRef, Ref } from 'react';
import * as yup from 'yup';

import { emailValid } from '@/validation/checkout/validation';

import styles from './ForgotPasswordModal.module.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';

interface ModalProps {
	onClose: () => void;
	onSubmit: (values: { email: string }) => void;
}

const ForgotPasswordModal = forwardRef(function ForgotPasswordModal(
	{ onClose, onSubmit }: ModalProps,
	ref: Ref<HTMLDivElement>,
) {
	const handleSubmit = (values: { email: string }) => {
		onSubmit(values);
	};

	return (
		<div className={styles.backdrop}>
			<div className={styles.modalBody} ref={ref}>
				<h1 className={styles.title}>Forgot Password</h1>
				<Formik
					initialValues={{ email: '' }}
					validationSchema={yup.object({ email: emailValid }).required()}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form className={styles.formWrapper}>
							<Input
								type={'email'}
								name={'email'}
								placeholder={'Enter E-mail'}
								className={styles.input}
							/>
							<div className={styles.actionButtons}>
								<Button
									text={'Cancel'}
									style={'secondary'}
									className={styles.button}
									onClick={onClose}
								/>
								<Button
									text={'Send reset link'}
									type={'submit'}
									disabled={isSubmitting}
									className={styles.button}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
});

ForgotPasswordModal.displayName = 'ForgotPasswordModal';
export default ForgotPasswordModal;
