'use client';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
import {
	deleteNews,
	updateNews,
} from '@/services/dashboard/news/dashbpard.news.service';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import { typesOfNews } from '@/utils/consts/consts';

interface IProps {
	news: INews;
}

export default function DashboardNewsEdit(props: IProps) {
	const { news } = props;
	const [modal, setModal] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const ref = useRef<
		FormikProps<{
			title: string;
			type: string;
			content: string;
		}>
	>(null);

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

	const submitForm = async (values: FormikValues, actions: any) => {
		setIsLoading(true);
		const newValues = {
			...values,
			type: typesOfNews.find((el) => el.name === values.type)?.id as string,
		};
		const formData = new FormData();

		Object.entries(newValues).forEach(([key, value]) => {
			if (value != '') {
				formData.append(key, value);
			}
		});

		if (selectedFile) {
			formData.append('image', selectedFile);
		}
		const res = await updateNews(news.id, formData);
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

	useEffect(() => {
		if (ref.current) {
			setPreview(news.image);
			ref.current.setValues({
				title: news.title,
				content: news.content,
				type: typesOfNews.find((el) => el.id === news.type)?.name as string,
			});

			ref.current.touched.title = true;
			ref.current.touched.content = true;
			ref.current.touched.type = true;
		}
	}, [news]);

	return (
		<Formik
			innerRef={ref}
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
			onSubmit={async (values, actions) => {
				await submitForm(values, actions);
			}}
		>
			{({ isValid, dirty }) => (
				<Form className={styles.wrapper}>
					{isLoading && <Loader />}

					{success && <MessageSuccess text={'News deleted successfully'} />}
					{error !== '' && <MessageError text={error} />}
					{modal && (
						<ModalConfirmation
							reset={async () => {
								setIsLoading(true);
								const res = await deleteNews(news.id);
								if (res.success) {
									setIsLoading(false);
									setModal(false);
									setSuccess(true);
									await revalidateFunc('/dashboard/news');
									await revalidateFunc('/dashboard/news/[id]', 'page');
									setTimeout(() => {
										router.push('/dashboard/news');
									}, 2000);
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
						title={`Edit News ${news.id}`}
						callbackApply={() => {}}
						callbackDelete={() => {
							setModal(true);
						}}
						disabledDelete={false}
						disabledApply={!(isValid && dirty)}
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
			)}
		</Formik>
	);
}
