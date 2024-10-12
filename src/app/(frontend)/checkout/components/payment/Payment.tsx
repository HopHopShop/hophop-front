'use client';
import { useFormik } from 'formik';
import { useState } from 'react';

import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import ReadyData from '@/app/(frontend)/checkout/components/readyData/ReadyData';
import Button from '@/components/Button/Button';
import { useCheckout } from '@/store/checkout/Checkout.store';
import { validationSchemaCreditCard } from '@/validation/creditCard/creditCard.validation';

import styles from './styles.module.scss';
import CreditCard from '@/app/(frontend)/checkout/components/creditCard/CreditCard';

type CreditCardType = 'card' | 'googlePay' | 'coinbase' | 'paypal';

const paymentImages: { type: CreditCardType; src: string }[] = [
	{ type: 'card', src: 'card.svg' },
	{ type: 'googlePay', src: 'google_pay.svg' },
	{ type: 'paypal', src: 'paypal.svg' },
	{ type: 'coinbase', src: 'coinbase.svg' },
];

export default function Payment() {
	const [opened, setOpened] = useState(false);
	const { payment } = useCheckout((state) => state.checkout);
	const setPayment = useCheckout((state) => state.setPayment);
	const paymentMethod = useCheckout((state) => state.checkout.paymentMethod);
	const setPaymentMethod = useCheckout((state) => state.setPaymentMethod);
	const setCreditCard = useCheckout((state) => state.setCreditCard);

	const onSubmit = (values: ICreditCard) => {
		setCreditCard(values);
		setOpened(true);
	};

	const formik = useFormik({
		initialValues: {
			cardNumber: '',
			cvv: '',
			expiryDate: '',
			cardName: '',
		},
		validationSchema: validationSchemaCreditCard,
		onSubmit,
	});

	return (
		<Accordion setActive={setPayment} active={payment} title={'Payment'}>
			{!opened && (
				<div className={styles.inputWrapper}>
					<h4 className={styles.title}>Payment methods</h4>
					<div className={styles.imageWrapper}>
						{paymentImages.map((item) => (
							<div
								key={item.type}
								className={`${styles.typeImageWrapper} ${item.type !== paymentMethod ? styles.inactive : ''}`}
								onClick={() => {
									setPaymentMethod(item.type);
									if (item.type !== 'card') {
										alert('This payment method is not available yet');
									}
								}}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={`/payment/${item.src}`}
									alt={`payment type ${item.type}`}
								/>
							</div>
						))}
					</div>
					{paymentMethod === 'card' && <CreditCard formik={formik} />}
					<Button
						className={styles.button}
						onClick={formik.submitForm}
						disabled={!(formik.isValid && formik.dirty)}
						style={'secondary'}
						text={'Next'}
						type="submit"
					/>
				</div>
			)}
			{opened && (
				<ReadyData
					firstText={formik.values.cardName}
					secondText={formik.values.cardNumber}
					thirdText={formik.values.expiryDate}
					fourText={formik.values.cvv}
					setOpened={() => setOpened(!opened)}
				/>
			)}
		</Accordion>
	);
}
