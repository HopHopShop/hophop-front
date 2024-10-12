'use client';
import { Field, Form, Formik, FormikProps } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';

import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import ReadyData from '@/app/(frontend)/checkout/components/readyData/ReadyData';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useCheckout } from '@/store/checkout/Checkout.store';
import {
	emailValid,
	latNameValid,
	nameValid,
	phoneValid,
} from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import { useUser } from '@/store/user/User.store';
import PhoneInputField from '@/components/phoneInputField/PhoneInputField';

export default function PersonalData() {
	const user = useUser((state) => state.user);

	const [opened, setOpened] = useState(false);
	const ref = useRef<FormikProps<IPersonalData>>(null);

	const personal = useCheckout((state) => state.checkout.personal);
	const setDelivery = useCheckout((state) => state.setDelivery);
	const setPersonal = useCheckout((state) => state.setPersonal);
	const setPersonalData = useCheckout((state) => state.setPersonalData);

	useEffect(() => {
		if (
			user &&
			ref.current &&
			user.first_name !== '' &&
			user.last_name !== ''
		) {
			ref.current.setValues({
				name: user.first_name,
				lastname: user.last_name,
				email: user.email,
				phone_number: user.phone_number,
			});
			ref.current.touched.name = true;
			ref.current.touched.lastname = true;
			ref.current.touched.email = true;
			ref.current.touched.phone_number = true;
		}
	}, [user]);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Formik
					validationSchema={yup
						.object({
							name: nameValid,
							lastname: latNameValid,
							email: emailValid,
							phone_number: phoneValid,
						})
						.required()}
					innerRef={ref}
					initialValues={{
						name: '',
						lastname: '',
						email: '',
						phone_number: '',
					}}
					onSubmit={async (values) => {
						setOpened(true);
						setDelivery(true);
						setPersonalData(values);
					}}
				>
					{({ isValid, dirty }) => {
						return (
							<Form>
								<Accordion
									setActive={setPersonal}
									active={personal}
									title={'Personal data'}
								>
									{!opened && (
										<div className={styles.inputWrapper}>
											<div className={styles.inputContainer}>
												<Input
													className={styles.input}
													title={'First name'}
													type={'text'}
													name={'name'}
													placeholder={'name'}
												/>
												<Input
													className={styles.input}
													title={'Last name'}
													type={'text'}
													name={'lastname'}
													placeholder={'lastname'}
												/>
											</div>
											<div className={styles.inputContainer}>
												<Input
													className={styles.input}
													title={'Email'}
													type={'email'}
													name={'email'}
													placeholder={'email'}
												/>
												<Field
													className={styles.input}
													name={'phone_number'}
													placeholder={'+346568564'}
													title={'Phone Number'}
													component={PhoneInputField<IPersonalData>}
												/>
											</div>
											<Button
												className={styles.button}
												disabled={!(isValid && dirty)}
												style={'secondary'}
												text={'Next'}
												type="submit"
											/>
										</div>
									)}
									{opened && (
										<ReadyData
											setOpened={() => setOpened(!opened)}
											firstText={ref?.current?.values.name}
											secondText={ref?.current?.values.lastname}
											thirdText={ref?.current?.values.email}
											fourText={ref?.current?.values.phone_number}
										/>
									)}
								</Accordion>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}
