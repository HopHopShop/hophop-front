'use client';
import { Field, Form, Formik, FormikProps } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import PhoneInputField from '@/components/phoneInputField/PhoneInputField';
import { updateDashboardUsers } from '@/services/dashboard/users/dashboard.users.service';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import {
	addressValid,
	cityValid,
	countryValid,
	emailValid,
	latNameValid,
	nameValid,
	phoneValid,
	postalCodeValid,
} from '@/validation/checkout/validation';

import styles from './DashboardUserTemplate.module.scss';

export interface IFormValuesProfile {
	first_name?: string;
	last_name?: string;
	email?: string;
	phone_number: string;
	shipping_country?: string;
	shipping_city?: string;
	shipping_address?: string;
	shipping_postcode?: string;
	currentPassword?: string;
	newPassword?: string;
	confirmPassword?: string;
}

export default function DashboardUserTemplate({ user }: { user: IUser }) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(user?.image || null);
	const [success, setSuccess] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const router = useRouter();
	const ref = useRef<FormikProps<IFormValuesProfile>>(null);

	const handleSubmit = async (values: IFormValuesProfile) => {
		setIsLoading(true);
		const formData = new FormData();

		Object.entries(values).forEach(([key, value]) => {
			if (value != '') {
				formData.append(key, value);
			}
		});

		if (selectedFile) {
			formData.append('image', selectedFile);
		}

		const res = await updateDashboardUsers(user.id, formData);
		if (res?.success) {
			setIsLoading(false);
			setError('');
			setSuccess(`User ${user.id} updated successfully`);
			await revalidateFunc('/dashboard/users');
			await revalidateFunc('/dashboard/users/[id]', 'page');
			setTimeout(() => {
				setSuccess('');
				router.push('/dashboard/users');
			}, 3000);
		} else {
			setError(res.error.message || 'Something went wrong');
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

	useEffect(() => {
		if (ref.current) {
			setPreview(user.avatar);
			ref.current.setValues({
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				phone_number: user.phone_number,
				shipping_country: user.shipping_country || '',
				shipping_city: user.shipping_city || '',
				shipping_address: user.shipping_address || '',
				shipping_postcode: user.shipping_postcode || '',
			});
			ref.current.touched.first_name = true;
			ref.current.touched.last_name = true;
			ref.current.touched.email = true;
			ref.current.touched.phone_number = true;

			ref.current.touched.shipping_country = true;
			ref.current.touched.shipping_city = true;
			ref.current.touched.shipping_address = true;
			ref.current.touched.shipping_postcode = true;
		}
	}, [user]);

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
				validationSchema={yup
					.object({
						first_name: nameValid.optional(),
						last_name: latNameValid.optional(),
						email: emailValid.optional(),
						phone_number: phoneValid.optional(),
						shipping_country: countryValid.optional(),
						shipping_city: cityValid.optional(),
						shipping_address: addressValid.optional(),
						shipping_postcode: postalCodeValid.optional(),
					})
					.required()}
				initialValues={{
					first_name: '',
					last_name: '',
					email: '',
					phone_number: '',
					shipping_country: '',
					shipping_city: '',
					shipping_address: '',
					shipping_postcode: '',
				}}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form className={styles.formContainer}>
						{isLoading && <Loader className={styles.loader} />}
						{success !== '' && (
							<MessageSuccess type={'dashboard'} text={success} />
						)}
						{error !== '' && <MessageError type={'dashboard'} text={error} />}
						<div className={styles.formGroup}>
							<div className={styles.userId}>User #{user.id}</div>
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
						<div className={styles.actions}>
							{user?.user_role === 'Owner' && (
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
