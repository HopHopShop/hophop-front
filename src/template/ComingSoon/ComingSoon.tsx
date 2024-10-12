'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import * as Yup from 'yup';

import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import Timer from '@/components/Timer/Timer';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './ComingSoon.module.scss';

interface ISubscribeForm {
	email: string;
}

export default function ComingSoon() {
	const [isButtonClick, setIsButtonClick] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const initialValues = {
		email: '',
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email is required')
			.email('Invalid email format'),
	});

	const handleClick = () => {
		setIsButtonClick((isButtonClick) => !isButtonClick);
		setIsError(false);
		setIsSuccess(false);
		setErrorMessage('');
	};

	const submitHandler = async (
		values: ISubscribeForm,
		actions: FormikHelpers<ISubscribeForm>,
	) => {
		const baseURL = process.env.NEXT_PUBLIC_API_URL;

		setIsError(false); // Resetting the previous error before a new request
		setIsLoading(true); // Indicate that the request has been started
		setErrorMessage(''); // Reset the previous error message

		try {
			const res = await fetch(`${baseURL}/email-subscription/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			const data = await res.json(); // Parse the JSON response

			if (!res.ok) {
				if (data.error) {
					setErrorMessage(data.error); // Set the error message from the response
				}
				setIsError(true); // Set an error if the response status is not successful
			} else {
				setIsSuccess(true); // Set success state upon successful form submission
				actions.resetForm();
			}
		} catch (error) {
			setIsError(true); // Set an error when an error occurs when executing a request
			setErrorMessage(
				'Something went wrong. Please, <a href="mailto:hophopshopme@gmail.com">contact us</a> or try again later',
			); // Set a generic error message
		} finally {
			setIsLoading(false); // Indicate that the shipment is complete

			actions.setSubmitting(false); // Mark that the sending is completed in Formik
		}
	};

	return (
		<section className={styles.section}>
			<Container>
				<div className={styles.wrapper}>
					{!isButtonClick ? (
						<>
							<div className={styles.imageWrapper}>
								<Image
									src="/coming-soon-title.svg"
									width={352}
									height={390}
									alt="title"
									className={styles.image}
								/>
							</div>

							<h2 className={styles.subTitle}>We’re coming soon</h2>

							<Timer />

							<Button text="Don't press me!" onClick={handleClick} />
						</>
					) : (
						<>
							<button className={styles.buttonBack} onClick={handleClick}>
								{/*<IconArrow />*/}
								була іконка))
							</button>

							<div className={styles.notReadyImageWrapper}>
								<Image
									src="/not-ready.svg"
									width={151}
									height={398}
									alt="not ready image"
									className={styles.image}
								/>
							</div>

							<h2 className={styles.subTitle}>I'm not ready yet! </h2>

							<div className={styles.description}>
								<p className={robotoCondensed.className}>
									But you can leave your email and we'll let you know when it
									starts:
								</p>
							</div>

							{isLoading ? (
								<Loader />
							) : isSuccess ? (
								<div className={styles.successMessage}>
									Hooray! We have received your email. Hold on to your seats and
									stay tuned!
								</div>
							) : (
								<>
									<Formik
										initialValues={initialValues}
										validationSchema={validationSchema}
										onSubmit={(values, actions) =>
											submitHandler(values, actions)
										}
									>
										<Form className={styles.form} noValidate>
											<Input
												type="email"
												name="email"
												placeholder="name@mail.com"
											/>
										</Form>
									</Formik>

									{isError && (
										<div
											className={styles.errorMessage}
											dangerouslySetInnerHTML={{ __html: errorMessage }}
										></div>
									)}
								</>
							)}
						</>
					)}
				</div>
			</Container>
		</section>
	);
}
