'use client';
import { Form, Formik, FormikProps } from 'formik';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';

import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import ReadyData from '@/app/(frontend)/checkout/components/readyData/ReadyData';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useCheckout } from '@/store/checkout/Checkout.store';
import { postalCodeValid } from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import dhl from '../../../../../../public/delivery/dhl.png';
import fedEx from '../../../../../../public/delivery/feedEx.png';
import tnt from '../../../../../../public/delivery/tnt.png';
import united from '../../../../../../public/delivery/united.png';
import usp from '../../../../../../public/delivery/usp.png';
import { useUser } from '@/store/user/User.store';
import AddressesSelect from '@/components/AdressesSelect/AddressesSelect';

export default function Delivery() {
	const [opened, setOpened] = useState(false);
	const ref = useRef<FormikProps<IDeliveryAddress>>(null);
	const user = useUser((state) => state.user);
	const { delivery } = useCheckout((state) => state.checkout);
	const setDelivery = useCheckout((state) => state.setDelivery);
	const setPayment = useCheckout((state) => state.setPayment);
	const setDeliveryAddress = useCheckout((state) => state.setDeliveryAddress);

	const deliveryImages = [dhl, fedEx, united, usp, tnt];

	useEffect(() => {
		if (user && ref.current) {
			ref.current.setValues({
				shipping_address: user.shipping_address,
				shipping_postcode: user.shipping_postcode,
			});
			if (user.shipping_address) {
				ref.current.touched.shipping_address = true;
			}
			if (user.shipping_postcode) {
				ref.current.touched.shipping_postcode = true;
			}
		}
	}, [user]);

	return (
		<Formik
			innerRef={ref}
			validationSchema={yup
				.object({
					// shipping_address: addressValid,
					shipping_postcode: postalCodeValid,
				})
				.required()}
			initialValues={{
				shipping_address: '',
				shipping_postcode: '',
			}}
			onSubmit={async (values) => {
				setPayment(true);
				setOpened(true);
				setDeliveryAddress(values);
			}}
		>
			{({ isValid, dirty }) => (
				<Form>
					<Accordion
						active={delivery}
						setActive={setDelivery}
						title={'Delivery address'}
					>
						{!opened && (
							<div className={styles.inputWrapper}>
								<div className={styles.deliveryImages}>
									{deliveryImages.map((img, index) => (
										<Image
											className={styles.deliveryImage}
											key={index}
											width={104}
											height={56}
											src={img}
											alt="delivery-image"
										/>
									))}
								</div>
								<AddressesSelect
									title={'Address'}
									name={'shipping_address'}
									placeholder={'Enter your address'}
									initialValue={user?.shipping_address || ''}
								/>
								<Input
									className={styles.input}
									title={'Postal Code'}
									type={'text'}
									name={'shipping_postcode'}
									placeholder={'postal code'}
								/>
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
								thirdText={ref?.current?.values.shipping_address}
								fourText={ref?.current?.values.shipping_postcode}
								setOpened={() => setOpened(!opened)}
							/>
						)}
					</Accordion>
				</Form>
			)}
		</Formik>
	);
}
