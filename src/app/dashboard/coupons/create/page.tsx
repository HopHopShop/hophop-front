'use client';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';

import styles from './styles.module.scss';
import { validationSchemaCoupon } from '@/validation/coupon/couponValidation';
import { useUnsavedChanges } from '@/hooks/useCloseWindow';
import { createCoupon } from '@/services/dashboard/coupons/dashboard.coupons.service';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import CustomSelect from '@/components/CustomSelect/CustomSelect';

export default function DashboardCouponCreate() {
	const [modal, setModal] = useState<boolean>(false);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [unsaved, setUnsaved] = useState<boolean>(false);
	const { isModalVisible, confirmNavigation, cancelNavigation } =
		useUnsavedChanges(unsaved);

	const ref = useRef<
		FormikProps<{
			code: string;
			discount: number;
			active: string;
			valid_to: string;
		}>
	>(null);

	const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'discount') {
			if (Number(value) > 90) {
				e.target.value = String(90);
			}
			ref.current?.handleChange(e);
		}
	};

	const submitForm = async (values: FormikValues, actions: any) => {
		setIsLoading(true);
		const res = await createCoupon({
			...values,
			valid_to: values.valid_to.split('-').reverse().join('-'),
			active: values.active === 'true',
		});
		if (res.success) {
			actions.resetForm();
			setIsLoading(false);
			setSuccess(true);
			await revalidateFunc('/dashboard/coupons');
			setTimeout(() => {
				router.push('/dashboard/coupons');
			}, 2000);
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
			innerRef={ref}
			initialValues={{
				code: '',
				discount: 0,
				active: '',
				valid_to: '',
			}}
			validationSchema={validationSchemaCoupon}
			onSubmit={async (values, actions) => {
				await submitForm(values, actions);
			}}
		>
			{({ isValid, dirty, resetForm, initialValues, values }) => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useEffect(() => {
					const hasFormChanged =
						JSON.stringify(values) !== JSON.stringify(initialValues);
					setUnsaved(hasFormChanged);
				}, [values, initialValues]);
				return (
					<Form className={styles.wrapper}>
						{isLoading && <Loader />}

						{success && (
							<MessageSuccess type={'dashboard'} text={'Your Coupon Added!'} />
						)}
						{error !== '' && <MessageError type={'dashboard'} text={error} />}
						{modal && (
							<ModalConfirmation
								reset={() => {
									setModal(false);
									resetForm();
								}}
								closeModal={() => setModal(false)}
								text={'Are you sure?'}
							/>
						)}
						{isModalVisible && (
							<ModalConfirmation
								type={'unsaved'}
								className={styles.height}
								reset={() => cancelNavigation()}
								closeModal={() => confirmNavigation()}
							/>
						)}
						<CreateDashboardHeader
							title={'Add coupon'}
							callbackApply={() => {}}
							callbackDelete={() => {
								setModal(true);
							}}
							disabledDelete={false}
							disabledApply={!(isValid && dirty)}
							typeApply={'submit'}
							typeDelete={'button'}
						/>

						<div className={styles.form}>
							<div className={styles.couponWrapper}>
								<CustomSelect
									name={'active'}
									title={'Status'}
									placeholder={'Select status'}
									options={[
										{ name: 'Active', id: 'true' },
										{ name: 'Inactive', id: 'false' },
									]}
								/>
								<Input
									name={'discount'}
									title={'Discount amount, %'}
									type={'number'}
									min={1}
									max={90}
									placeholder={'Enter discount amount'}
									onChange={handleCustomChange}
								/>
							</div>
							<div className={styles.couponWrapper}>
								<Input
									name={'code'}
									title={'Coupon Name'}
									type={'text'}
									placeholder={'Enter coupon name'}
								/>
								<Input
									name={'valid_to'}
									title={'Valid until'}
									type={'date'}
									placeholder={'Enter valid until'}
								/>
							</div>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
}
