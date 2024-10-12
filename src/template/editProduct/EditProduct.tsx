'use client';

import { Form, Formik, FormikProps } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import * as yup from 'yup';

import image from '@/assets/png/Newdescription.png';
import Button from '@/components/Button/Button';
import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import DashboardUploadedImage from '@/components/dashboard/dashboardUploadedImage/DashboardUploadedImage';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import Textarea from '@/components/textarea/Textarea';
import {
	removeProduct,
	removeProductById,
	updateProduct,
	updateProductImage,
} from '@/services/dashboard/products/dashboard.products.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import PrePublishProduct from '@/template/prePublishProduct/PrePublishProduct';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import { categoryValid } from '@/validation/dashboard/category/validation';

import styles from './styles.module.scss';
import { useFetch } from '@/hooks/useFetch';
import UploadedFileBlockOld from '@/components/dashboard/UploadedFileBlockOld/UploadedFileBlockOld';

export interface IProps {
	product: IProduct;
}

interface FormValues {
	name: string;
	description: string;
	category: string;
	price: number;
}

interface IImage {
	image: string;
	id: number;
}

export default function EditProduct(props: IProps) {
	const { product } = props;

	const { data: categories, loading: categoriesLoading } = useFetch<
		ICategory[]
	>({
		endpoint: 'shop/categories/all/',
		options: {
			method: 'GET',
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [modal, setModal] = useState<boolean>(false);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<{ image: string; name: string }[]>(
		[],
	);
	const formikRef = useRef<FormikProps<FormValues>>(null);
	const [images, setImages] = useState(product.images as IImage[]);
	const fileInputRef = useRef<null | HTMLInputElement>(null);
	const router = useRouter();
	const [showPrePublish, setShowPrePublish] = useState<boolean>(false);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files);
			setImages([]);
			setSelectedFiles(filesArray);
			const previewsArray = filesArray.map((file) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				return new Promise<{ image: string; name: string }>((resolve) => {
					reader.onloadend = () => {
						resolve({ image: reader.result as string, name: file.name });
					};
				});
			});

			Promise.all(previewsArray).then((previews) => {
				setPreviews(previews);
			});
		}
	};

	const handleRemovePreview = (index: number) => {
		const newPreviews = previews.filter((_, i) => i !== index);
		setPreviews(newPreviews);
		const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
		setSelectedFiles(newSelectedFiles);
	};

	const handleRemoveImages = async (index: number, image: IImage) => {
		const res = await removeProduct(product.id, image.id);
		if (res.success) {
			const newImages = images.filter((_, i) => i !== index);
			setImages(newImages);
			setSuccess('Image was deleted');
			setTimeout(() => {
				setSuccess('');
			}, 2000);
			await revalidateData();
		} else {
			setError('Image was not deleted');
			setTimeout(() => {
				setError('');
			}, 2000);
		}
	};

	const revalidateData = async () => {
		await revalidateFunc('/dashboard/products');
		await revalidateFunc('/dashboard/products/[id]', 'page');
		await revalidateFunc('/product/[id]', 'page');
		await revalidateFunc('/', 'layout');
	};

	const handleSubmit = async (values: FormValues, actions: any) => {
		setIsLoading(true);
		if (selectedFiles.length) {
			const res = await updateProduct(product.id, {
				...values,
				category:
					categories?.filter((item) => item.name === values.category)[0]?.id ||
					null,
			});
			const formData = new FormData();

			if (selectedFiles) {
				selectedFiles.forEach((file) => {
					formData.append('uploaded_images', file);
				});
			}

			if (res.success && formData) {
				const resUpload = await updateProductImage(res.data.id, formData);

				if (resUpload.success) {
					setIsLoading(false);
					setSuccess('Product was updated');
					actions.resetForm();
					setSelectedFiles([]);
					setPreviews([]);
					await revalidateData();
					setTimeout(() => {
						router.push('/dashboard/products');
						setSuccess('');
					}, 2000);
				} else if (!resUpload.success) {
					setIsLoading(false);
					setError(resUpload.error.message);
				}
			}
		} else {
			const res = await updateProduct(product.id, {
				...values,
				category:
					categories?.filter((item) => item.name === values.category)[0]?.id ||
					null,
			});
			if (res.success) {
				setIsLoading(false);
				setSuccess('Product was updated');
				actions.resetForm();
				setSelectedFiles([]);
				setPreviews([]);
				await revalidateData();
				setTimeout(() => {
					setSuccess('');
					router.push('/dashboard/products');
				}, 2000);
			}
		}
	};
	return (
		<>
			{/* eslint-disable */}
			{showPrePublish && (
				<PrePublishProduct
					setShowPrePublish={setShowPrePublish}
					product={{
						name: `${formikRef.current?.values.name}`,
						description: `${formikRef.current?.values.description}`,
						id: 0,
						price: Number(formikRef.current?.values.price),
						category: categories!.filter(
							(category) =>
								category.id === Number(formikRef.current!.values.category) || 0,
						)[0],
						SKU: 0,
						slug: 'test',
						images:
							previews.length != 0
								? previews.map((preview) => {
										return {
											image: preview.image,
										};
									})
								: images.map((preview) => {
										return {
											image: preview.image,
										};
									}),
					}}
				/>
			)}
			{/* eslint-disable */}
			<Formik
				innerRef={formikRef}
				initialValues={{
					name: product.name,
					description: product.description ? product.description : '',
					category: product.category?.name || 'No Category',
					price: product.price,
				}}
				validationSchema={yup
					.object({
						name: categoryValid('Name'),
						description: categoryValid('Description'),
						category: categoryValid('Category'),
						price: categoryValid('Price'),
					})
					.required()}
				onSubmit={async (values, actions) => {
					await handleSubmit(values, actions);
				}}
			>
				{({ isValid, dirty, resetForm }) => (
					<Form className={styles.wrapper}>
						{isLoading && <Loader />}
						{success !== '' && (
							<MessageSuccess type={'dashboard'} text={success} />
						)}
						{error !== '' && <MessageError type={'dashboard'} text={error} />}
						{modal && (
							<ModalConfirmation
								className={styles.height}
								reset={async () => {
									setIsLoading(true);
									const res = await removeProductById(product.id);
									if (res.success) {
										await revalidateData();
										setIsLoading(false);
										setSuccess('Product was deleted');
										setModal(false);
										resetForm();
										setSelectedFiles([]);
										setPreviews([]);
										setTimeout(() => {
											setSuccess('');
											router.push('/dashboard/products');
										}, 2000);
									}
								}}
								closeModal={() => setModal(false)}
								text={'Are you sure?'}
							/>
						)}
						<CreateDashboardHeader
							title={`Edit Product ${product.id}`}
							callbackApply={() => {}}
							callbackDelete={() => {
								setModal(true);
							}}
							disabledDelete={false}
							disabledApply={!isValid}
							typeApply={'submit'}
							typeDelete={'button'}
						/>

						<div className={styles.container}>
							<div className={styles.form}>
								<Input
									name={'name'}
									title={'Product Name'}
									type={'text'}
									placeholder={'Enter Product Name'}
								/>
								{/* eslint-disable */}
								<CustomSelect
									className={categoriesLoading ? styles.inactive : ''}
									name={'category'}
									title={'Category'}
									isLoading={categoriesLoading}
									options={
										categories
											? categories
													.map((item) => ({
														name: item.name,
														id: item.id,
													}))
													.concat({
														name: 'No Category',
														id: 10000,
													})
													.reverse()
											: []
									}
									placeholder={'Category'}
								/>
								{/* eslint-enable*/}
								<Textarea
									title={'Product Description'}
									name={'description'}
									rows={10}
									placeholder={'Enter Product Description'}
								/>
								<Input
									name={'price'}
									title={'Product Price'}
									type={'text'}
									placeholder={'Enter Product Price'}
								/>
								<div className={styles.buttonWrapper}>
									<Button
										text={'Show pre-publish view'}
										style={'secondary'}
										disabled={
											!(
												isValid &&
												dirty &&
												(selectedFiles.length >= 0 || images.length >= 0)
											)
										}
										onClick={() => setShowPrePublish(true)}
									/>
								</div>
							</div>
							<div className={styles.imageWrapper}>
								<div className={styles.uploadImage}>
									<span
										className={`${styles.text} ${robotoCondensed.className}`}
									>
										Product Gallery
									</span>
									<div className={styles.imageContainer}>
										<input
											ref={fileInputRef}
											onChange={handleFileChange}
											accept="image/png, image/jpeg"
											className={styles.file}
											type="file"
											multiple={true}
										/>
										<div className={`${styles.imageContainer_desc}`}>
											<Image src={image} alt={'image'} />
											<div
												className={`${styles.subText} ${robotoCondensed.className}`}
											>
												Drop your imager here, or browse jpeg, png are allowed
											</div>
										</div>
									</div>
								</div>

								{images.length > 0 &&
									images.map((img, index) => (
										<DashboardUploadedImage
											key={index}
											index={index}
											handleRemoveImages={handleRemoveImages}
											image={img}
										/>
									))}
								{previews.length > 1 &&
									previews
										.slice(1)
										.map((preview, index) => (
											<UploadedFileBlockOld
												key={index}
												image={preview}
												index={index + 1}
												handleRemoveImage={handleRemovePreview}
											/>
										))}
								<div className={styles.buttonWrapper}>
									<Button
										disabled={
											!(
												isValid &&
												dirty &&
												(selectedFiles.length >= 0 || images.length >= 0)
											)
										}
										text={'Show pre-publish view'}
										style={'secondary'}
										onClick={() => setShowPrePublish(true)}
									/>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
