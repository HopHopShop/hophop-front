'use client';

import { Form, Formik, FormikValues } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import {
	removeCouponById,
	updateCoupon,
} from '@/services/dashboard/coupons/dashboard.coupons.service';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';

import styles from './styles.module.scss';
import { validationSchemaCoupon } from '@/validation/coupon/couponValidation';

export interface IProps {
	coupon: ICoupon;
}

export default function EditCoupon(props: IProps) {
	const { coupon } = props;
	const [modal, setModal] = useState<boolean>(false);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const revalidateData = async () => {
		await revalidateFunc('/dashboard/coupons');
		await revalidateFunc('/dashboard/coupons/[id]', 'page');
		setTimeout(() => {
			router.push('/dashboard/coupons');
		}, 2000);
	};

	const submitForm = async (values: FormikValues) => {
		setIsLoading(true);
		const res = await updateCoupon(coupon.id, {
			...values,
			valid_to: values.valid_to.split('-').reverse().join('-'),
			active: values.active === 'Active',
		});
		if (res.success) {
			setIsLoading(false);
			setSuccess('Coupon updated successfully');
			await revalidateData();
		} else if (!res.success) {
			setIsLoading(false);
			setError(res.error.message);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<Formik
			initialValues={{
				code: coupon.code,
				discount: coupon.discount,
				active: coupon.active ? 'Active' : 'Inactive',
				valid_to: coupon.valid_to,
			}}
			validationSchema={validationSchemaCoupon}
			onSubmit={async (values) => {
				await submitForm(values);
			}}
		>
			{({ isValid }) => (
				<Form className={styles.wrapper}>
					{isLoading && <Loader className={styles.loader} />}

					{success !== '' && (
						<MessageSuccess type={'dashboard'} text={success} />
					)}
					{error !== '' && <MessageError type={'dashboard'} text={error} />}
					{modal && (
						<ModalConfirmation
							reset={async () => {
								setIsLoading(true);
								const res = await removeCouponById(coupon.id);
								if (res.success) {
									setIsLoading(false);
									setModal(false);
									setSuccess('Coupon deleted successfully');
									await revalidateData();
								} else {
									setIsLoading(false);
									setError(res.error.message || 'Something went wrong');
								}
							}}
							closeModal={() => setModal(false)}
							text={'Are you sure?'}
						/>
					)}

					<CreateDashboardHeader
						title={`Edit Coupon ${coupon.id}`}
						callbackApply={() => {}}
						callbackDelete={() => setModal(true)}
						disabledDelete={false}
						disabledApply={!isValid}
						typeApply={'submit'}
						typeDelete={'button'}
					/>
					<div className={styles.formWrapper}>
						<div className={styles.form}>
							<div className={styles.couponWrapper}>
								<Input
									name={'code'}
									title={'Coupon Name'}
									type={'text'}
									placeholder={'Enter coupon name'}
								/>
								<CustomSelect
									className={styles.select}
									name={'active'}
									options={[
										{ name: 'Active', id: 'true' },
										{ name: 'Inactive', id: 'false' },
									]}
									title={'Status'}
									placeholder={'Select status'}
								/>
							</div>
							<div className={styles.couponWrapper}>
								<Input
									name={'discount'}
									title={'Discount amount, %'}
									type={'number'}
									placeholder={'Enter discount amount'}
								/>
								<Input
									name={'valid_to'}
									title={'Valid until'}
									type={'date'}
									placeholder={'Enter valid until'}
								/>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
