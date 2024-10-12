'use client';
import { Field, Form, Formik, FormikProps } from 'formik';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import PhoneInputField from '@/components/phoneInputField/PhoneInputField';
import { updateProfile } from '@/services/dashboard/users/dashboard.users.service';
import { useUser } from '@/store/user/User.store';

import styles from './AccountForm.module.scss';
import {
	accountInitialValues,
	accountValidationSchema,
} from '@/validation/account/accountValidation';
import Loading from '@/components/loading/Loading';

export interface IFormValuesProfile {
	first_name?: string;
	last_name?: string;
	email?: string;
	phone_number: string;
	shipping_country?: string;
	shipping_city?: string;
	shipping_address?: string;
	shipping_postcode?: string;
	old_password?: string;
	password?: string;
	confirmPassword?: string;
}

type TUser = Omit<
	IUser,
	'id' | 'avatar' | 'is_staff' | 'is_active' | 'image' | 'user_role'
>;
export default function AccountForm() {
	const user = useUser((state) => state.user);
	const setUser = useUser((state) => state.setUser);
	const ref = useRef<FormikProps<IFormValuesProfile>>(null);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(user?.avatar || null);
	const [success, setSuccess] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState('');

	const handleSubmit = async (values: IFormValuesProfile) => {
		setIsLoading(true);
		const formData = new FormData();

		Object.entries(values).forEach(([key, value]) => {
			if (value != '') {
				formData.append(key, value);
			}
		});

		if (selectedFile) {
			formData.append('avatar', selectedFile);
		}

		const res = await updateProfile(formData);
		if (res?.success) {
			setIsLoading(false);
			setUser(res.data);
			setSuccess('Profile updated successfully');
			setTimeout(() => {
				setSuccess('');
			}, 3000);
		} else {
			setIsLoading(false);
			setError(res?.error.message || 'Something went wrong');
			setTimeout(() => {
				setError('');
			}, 4000);
		}
	};

	const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);

			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const updateUserFields = (user: IUser) => {
		setPreview(user.avatar);
		ref.current!.setValues({
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			phone_number: user.phone_number,
			shipping_country: user.shipping_country || '',
			shipping_city: user.shipping_city || '',
			shipping_address: user.shipping_address || '',
			shipping_postcode: user.shipping_postcode || '',
		});
		(Object.keys(accountInitialValues) as (keyof TUser)[])
			.slice(0, -3)
			.forEach((field) => {
				if (
					user[field] !== undefined &&
					user[field] !== null &&
					user[field] !== ''
				) {
					ref.current!.touched[field] = true;
				}
			});
	};

	useEffect(() => {
		if (user && ref.current) {
			updateUserFields(user);
		}
	}, [user]);

	if (!user) {
		return <Loading />;
	}
	return (
		<div className={styles.container}>
			<div className={styles.imgWrp}>
				<Image
					width={391}
					height={391}
					src={
						preview ||
						(user?.user_role === 'Admin'
							? '/illustration_admin.svg'
							: '/illustration_userPlug.svg')
					}
					alt="User Avatar"
				></Image>
				<input
					type="file"
					id="avatarInput"
					accept="image/*"
					style={{ display: 'none' }}
					onChange={handleAvatarChange}
				/>
				<label htmlFor="avatarInput" className={styles.changeAvatarBtn}>
					Browse your image
				</label>
			</div>
			<Formik
				innerRef={ref}
				validationSchema={accountValidationSchema}
				initialValues={accountInitialValues}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form className={styles.formContainer}>
						{isLoading && <Loader className={styles.loader} />}
						{success !== '' && <MessageSuccess text={success} />}
						{error !== '' && <MessageError text={error} />}
						<div className={styles.formGroup}>
							<h2 className={styles.title}>Personal data</h2>
							<div className={styles.inputContainer}>
								<Input
									className={styles.input}
									title={'First Name'}
									type={'text'}
									name={'first_name'}
									placeholder={'John'}
								/>
								<Input
									className={styles.input}
									title={'Last Name'}
									type={'text'}
									name={'last_name'}
									placeholder={'Doe'}
								/>
							</div>
							<div
								className={`${styles.inputContainer} ${styles.withPhoneInput}`}
							>
								<Input
									className={styles.input}
									title={'Email'}
									type={'email'}
									name={'email'}
									placeholder={'exname@mail.com'}
								/>
								<Field
									className={styles.input}
									name={'phone_number'}
									placeholder={'+38 066 666 66 66'}
									title={'Phone Number'}
									component={PhoneInputField<IFormValuesProfile>}
								/>
							</div>
						</div>
						<div className={styles.formGroup}>
							<h2 className={styles.title}>Delivery address</h2>
							<div className={styles.inputContainer}>
								<Input
									className={styles.input}
									title={'Country'}
									type={'text'}
									name={'shipping_country'}
									placeholder={'France'}
								/>
								<Input
									className={styles.input}
									title={'City'}
									type={'text'}
									name={'shipping_city'}
									placeholder={'Marsel'}
								/>
							</div>
							<div className={styles.inputContainer}>
								<Input
									className={styles.input}
									title={'Address'}
									type={'text'}
									name={'shipping_address'}
									placeholder={'Some str 6, 8'}
								/>
								<Input
									className={styles.input}
									title={'Postal Code'}
									type={'text'}
									name={'shipping_postcode'}
									placeholder={'03039'}
								/>
							</div>
						</div>
						<div className={styles.formGroup}>
							<h2 className={styles.title}>Password</h2>
							<InputPassword
								className={styles.input}
								title={'Current Password'}
								name={'old_password'}
								placeholder={'Current Password'}
							/>
							<div className={styles.inputContainer}>
								<InputPassword
									className={styles.input}
									title={'New Password'}
									name={'password'}
									placeholder={'New Password'}
								/>
								<InputPassword
									className={styles.input}
									title={'Confirm Password'}
									name={'confirmPassword'}
									placeholder={'Confirm Password'}
								/>
							</div>
						</div>
						<div className={styles.actions}>
							{user?.user_role !== 'Admin' && (
								<button
									type="button"
									className={styles.deleteButton}
									onClick={() => console.log('Account deleted')}
								>
									Delete account
								</button>
							)}
							<Button
								type="submit"
								className={styles.saveButton}
								text="Save changes"
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
