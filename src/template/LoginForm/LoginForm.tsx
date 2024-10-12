'use client';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

import ActionModal from '@/components/ActionModal/ActionModal';
import Button from '@/components/Button/Button';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import ForgotPasswordModal from '@/components/ForgotPasswordModal/ForgotPasswordModal';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import useOutside from '@/hooks/useOutside';
import { requestPasswordReset } from '@/services/auth/passwordResetApi';
import { fetchWithCookies } from '@/services/cookies/cookies.service';
import { useUser } from '@/store/user/User.store';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { IResponseAuth } from '@/types/response/response';
import { CookiesEnums } from '@/utils/enums/cookiesEnums';
import { emailValid, passwordValid } from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import Google from '../../../public/login/google.svg';

export default function LoginForm() {
	const setUser = useUser((state) => state.setUser);
	const navigate = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const {
		ref: forgotPasswordModalRef,
		isShow: isForgotPasswordModalOpen,
		setIsShow: setIsForgotPasswordModalOpen,
	} = useOutside(false);

	const {
		ref: successModalRef,
		isShow: isSuccessModalOpen,
		setIsShow: setIsSuccessModalOpen,
	} = useOutside(false);

	const {
		ref: errorModalRef,
		isShow: isErrorModalOpen,
		setIsShow: setIsErrorModalOpen,
	} = useOutside(false);

	const handleForgotPasswordSubmit = async (values: { email: string }) => {
		console.log(values.email);
		const result = await requestPasswordReset(values.email);
		if (result.success) {
			setIsSuccessModalOpen(true);
			setIsForgotPasswordModalOpen(false);
		} else {
			setIsErrorModalOpen(true);
			setIsForgotPasswordModalOpen(false);
		}
	};

	return (
		<>
			{isForgotPasswordModalOpen && (
				<ForgotPasswordModal
					ref={forgotPasswordModalRef}
					onClose={() => setIsForgotPasswordModalOpen(false)}
					onSubmit={handleForgotPasswordSubmit}
				/>
			)}
			{isSuccessModalOpen && (
				<ActionModal
					ref={successModalRef}
					show={isSuccessModalOpen}
					iconSrc={'/thanksPageIllustration.svg'}
					title="Thank you!"
					text="If this is a registered email address, an email will be sent to the address provided."
					type={'success'}
					onClose={() => setIsSuccessModalOpen(false)}
				/>
			)}
			{isErrorModalOpen && (
				<ActionModal
					ref={errorModalRef}
					show={isErrorModalOpen}
					iconSrc={'/unSuccessIllustration_wrong.svg'}
					title="Oh no!"
					text="Looks like you entered an email that’s doing the cha-cha instead of following the rules. Please try again!"
					type={'error'}
					onClose={() => setIsErrorModalOpen(false)}
				/>
			)}
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={yup
					.object({
						email: emailValid,
						password: passwordValid,
					})
					.required()}
				onSubmit={async (values) => {
					setIsLoading(true);
					const res = await fetchWithCookies<IResponseAuth>('/auth/login/', {
						method: 'POST',
						body: JSON.stringify({
							email: values.email,
							password: values.password,
						}),
					});
					if (res.success) {
						setIsLoading(false);
						Cookies.set(
							CookiesEnums.access_token,
							res.data.access_token.value,
							{
								expires: res.data.access_token.expires,
							},
						);
						Cookies.set(
							CookiesEnums.refresh_token,
							res.data.refresh_token.value,
							{
								expires: res.data.refresh_token.expires,
								secure: true,
								sameSite: 'None',
								path: '/',
							},
						);
						setUser(res.data.user);
						navigate.push('/');
					} else if (!res.success) {
						setIsLoading(false);
						setError(res.error.message);
						setTimeout(() => {
							setError('');
						}, 5000);
					}
				}}
			>
				{({ isValid, dirty }) => (
					<Form className={styles.form}>
						{isLoading && <Loader className={styles.loader} />}
						{error !== '' && <MessageError text={error} />}
						<Input
							title={'Email'}
							type={'email'}
							name={'email'}
							placeholder={'Enter Email'}
						/>
						<InputPassword
							title={'Password'}
							name={'password'}
							placeholder={'Enter Password'}
						/>
						<div className={styles.buttonsWrap}>
							<p
								className={styles.forgot}
								onClick={() => setIsForgotPasswordModalOpen(true)}
							>
								I forgot my password
							</p>
							<Button
								disabled={!(isValid && dirty)}
								type={'submit'}
								style={'primary'}
								text={'Log in!'}
							></Button>
							<ButtonLink
								className={styles.buttonLink}
								href={'/registration'}
								style={'secondary'}
								text={'Create an account'}
							/>
							{error !== '' && <div className={styles.error}>{error}</div>}
							<div className={styles.google}>
								<span className={robotoCondensed.className}>
									Or sing in with
								</span>
								<Google className={styles.googleImage} />
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
