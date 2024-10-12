'use client';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import * as yup from 'yup';

import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import DashboardUploadImage from '@/components/dashboard/dashboardUploadImage/DashboardUploadImage';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import Textarea from '@/components/textarea/Textarea';
import { categoryValid } from '@/validation/dashboard/category/validation';

import styles from './styles.module.scss';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { createNews } from '@/services/dashboard/news/dashbpard.news.service';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import { typesOfNews } from '@/utils/consts/consts';
import { useUnsavedChanges } from '@/hooks/useCloseWindow';

export default function DashboardNewsCreate() {
	const [modal, setModal] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [unsaved, setUnsaved] = useState<boolean>(false);
	const { isModalVisible, confirmNavigation, cancelNavigation } =
		useUnsavedChanges(unsaved);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);

			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	const submitForm = async (
		values: FormikValues,
		actions: FormikHelpers<{ title: string; content: string; type: string }>,
	) => {
		const newValues = {
			...values,
			type: typesOfNews.find((el) => el.name === values.type)?.id as string,
		};
		setIsLoading(true);
		const formData = new FormData();

		Object.entries(newValues).forEach(([key, value]) => {
			if (value != '') {
				formData.append(key, value);
			}
		});

		if (selectedFile) {
			formData.append('image', selectedFile);
		}
		const res = await createNews(formData);
		if (res.success) {
			setIsLoading(false);
			setSuccess(true);
			setError('');
			actions.resetForm();
			await revalidateFunc('/dashboard/news');
			await revalidateFunc('/dashboard/news/[id]', 'page');
			setTimeout(() => {
				setSuccess(false);
				router.push('/dashboard/news');
			}, 2000);
		} else {
			setError(res.error.message || 'Something Was Wrong');
		}
	};

	return (
		<Formik
			initialValues={{
				title: '',
				content: '',
				type: '',
			}}
			validationSchema={yup
				.object({
					title: categoryValid('Title'),
					content: categoryValid('Content'),
					type: categoryValid('Type'),
				})
				.required()}
			onSubmit={async (values, actions) => submitForm(values, actions)}
		>
			{({ isValid, dirty, resetForm, values, initialValues }) => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useEffect(() => {
					const hasFormChanged =
						JSON.stringify(values) !== JSON.stringify(initialValues);
					const hasChanges = hasFormChanged || !!selectedFile;
					setUnsaved(hasChanges);
					// eslint-disable-next-line
				}, [values, initialValues, selectedFile]);
				return (
					<Form className={styles.wrapper}>
						{isLoading && <Loader />}
						{success && <MessageSuccess text={'Your News Added!'} />}
						{error !== '' && <MessageError text={error} />}

						{modal && (
							<ModalConfirmation
								reset={() => {
									setModal(false);
									setSelectedFile(null);
									resetForm();
									setPreview(null);
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
							title={'Add news'}
							callbackApply={() => {}}
							callbackDelete={() => {
								setModal(true);
							}}
							disabledDelete={false}
							disabledApply={!(isValid && dirty && selectedFile)}
							typeApply={'submit'}
							typeDelete={'button'}
						/>

						<div className={styles.formWrapper}>
							<div className={styles.form}>
								<CustomSelect
									name={'type'}
									options={typesOfNews}
									title={'Type'}
									placeholder={'Type'}
								/>
								<Input
									name={'title'}
									title={'Title'}
									type={'text'}
									placeholder={'Enter title'}
								/>
								<Textarea
									title={'Content'}
									name={'content'}
									rows={10}
									placeholder={'Enter description'}
								/>
							</div>
							<DashboardUploadImage
								handleFileChange={handleFileChange}
								preview={preview}
								setPreview={setPreview}
								text={'News Image'}
							/>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
}
