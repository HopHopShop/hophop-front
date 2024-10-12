'use client';
import { Field, Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import Checkbox from '@/components/checkbox/Checkbox';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import PhoneInputField from '@/components/phoneInputField/PhoneInputField';
import { fetchWithCookies } from '@/services/cookies/cookies.service';
import { useUser } from '@/store/user/User.store';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { IResponseAuth } from '@/types/response/response';
import { CookiesEnums } from '@/utils/enums/cookiesEnums';
import {
	emailValid,
	latNameValid,
	nameValid,
	passwordValid,
	phoneValid,
} from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import Google from '../../../public/login/google.svg';

export default function RegistrationForm() {
	const [open, setOpen] = useState<boolean>(false);
	const setUser = useUser((state) => state.setUser);
	const navigate = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	return (
		<Formik
			initialValues={{
				name: '',
				last_name: '',
				email: '',
				phone_number: '',
				password: '',
				confPassword: '',
			}}
			validationSchema={yup
				.object({
					name: nameValid,
					last_name: latNameValid,
					phone_number: phoneValid,
					email: emailValid,
					password: passwordValid,
					confPassword: yup
						.string()
						.required('Confirm Password is required')
						.oneOf([yup.ref('password')], 'Passwords must match'),
				})
				.required()}
			onSubmit={async (values) => {
				setIsLoading(true);
				const res = await fetchWithCookies<IResponseAuth>(
					'/auth/registration/',
					{
						method: 'POST',
						body: JSON.stringify({
							first_name: values.name,
							last_name: values.last_name,
							email: values.email,
							password: values.password,
							phone_number: values.phone_number,
						}),
					},
				);
				if (res.success) {
					setIsLoading(false);
					Cookies.set(CookiesEnums.access_token, res.data.access_token.value, {
						expires: res.data.access_token.expires,
					});
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
					}, 10000);
				}
			}}
		>
			{({ isValid, dirty }) => (
				<Form className={styles.form}>
					{isLoading && <Loader className={styles.loader} />}
					{error !== '' && <MessageError text={error} />}
					<div className={styles.inputWrapper}>
						<Input
							title={'First Name'}
							type={'text'}
							name={'name'}
							placeholder={'Enter Name'}
						/>
						<Input
							title={'Last Name'}
							type={'text'}
							name={'last_name'}
							placeholder={'Enter Last Name'}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<Input
							title={'Email'}
							type={'email'}
							name={'email'}
							placeholder={'Enter Email'}
						/>
						<Field
							name={'phone_number'}
							placeholder={'+38 066 666 66 66'}
							title={'Phone Number'}
							component={
								PhoneInputField<{
									name: string;
									last_name: string;
									email: string;
									phone_number: string;
									password: string;
									confPassword: string;
								}>
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<InputPassword
							title={'Password'}
							name={'password'}
							placeholder={'Enter Password'}
						/>
						<InputPassword
							title={'Confirm Password '}
							name={'confPassword'}
							placeholder={'Enter Password'}
						/>
					</div>

					<div className={styles.buttonsWrapper}>
						<Checkbox
							className={styles.checkbox}
							type={'square'}
							label={
								'By using our Website, you acknowledge that you have read, understood, and agree to be bound by these'
							}
							isChecked={open}
							setIsChecked={setOpen}
						>
							<Link className={styles.link} href={'/terms-of-use'}>
								Terms of Use.
							</Link>
						</Checkbox>
						<Button
							disabled={!(isValid && dirty && open)}
							type={'submit'}
							style={'primary'}
							text={'Sign up!'}
						></Button>
						<ButtonLink
							href={'/login'}
							style={'secondary'}
							text={'I already have an account'}
							className={styles.buttonLink}
						/>
						{error !== '' && <div className={styles.errorText}>{error}</div>}
						<div className={styles.google}>
							<span className={robotoCondensed.className}>Or sing in with</span>
							<Google className={styles.googleImage} />
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
