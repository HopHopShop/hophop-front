'use client';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import image from '@/assets/png/Newdescription.png';
import Button from '@/components/Button/Button';
import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import Textarea from '@/components/textarea/Textarea';
import {
	createProduct,
	createProductImage,
} from '@/services/dashboard/products/dashboard.products.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import PrePublishProduct from '@/template/prePublishProduct/PrePublishProduct';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';

import styles from './styles.module.scss';
import { useFetch } from '@/hooks/useFetch';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import UploadedFileBlock from '@/components/dashboard/uploadedFileBlock/UploadedFileBlock';
import { useUnsavedChanges } from '@/hooks/useCloseWindow';
import {
	initialValuesEditForm,
	validationSchemaEditForm,
} from '@/validation/dashboard/editProduct/editProductValidation';
import CustomSelect from '@/components/CustomSelect/CustomSelect';

interface FormValues {
	name: string;
	description: string;
	category: string;
	price: string;
}

export interface IPreview {
	image: string;
	name: string;
	id: string;
	fileId: string;
}

interface FileWithId {
	id: string;
	file: File;
}

export default function DashboardProductsCreate() {
	const { data: categories, loading: categoriesLoading } = useFetch<
		ICategory[]
	>({
		endpoint: 'shop/categories/all/',
		options: {
			method: 'GET',
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPrePublish, setShowPrePublish] = useState<boolean>(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [modal, setModal] = useState<boolean>(false);
	const [selectedFiles, setSelectedFiles] = useState<FileWithId[]>([]);
	const [previews, setPreviews] = useState<IPreview[]>([]);
	const [unsaved, setUnsaved] = useState<boolean>(false);
	const { isModalVisible, confirmNavigation, cancelNavigation } =
		useUnsavedChanges(unsaved);
	const formikRef = useRef<FormikProps<FormValues>>(null);
	const fileInputRef = useRef<null | HTMLInputElement>(null);
	const router = useRouter();
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files || []);

			const filesWithId: FileWithId[] = filesArray.map((file) => ({
				id: crypto.randomUUID(),
				file,
			}));

			setSelectedFiles((prevFiles) => [...prevFiles, ...filesWithId]);

			const previewsArray = filesWithId.map(({ file, id }) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				return new Promise<IPreview>((resolve) => {
					reader.onloadend = () => {
						resolve({
							image: reader.result as string,
							name: file.name,
							id: crypto.randomUUID(),
							fileId: id,
						});
					};
				});
			});

			Promise.all(previewsArray).then((previews) => {
				setPreviews((prev) => [...prev, ...previews]);
			});
		}
	};

	const handleRemoveImage = (preview: IPreview) => {
		const newPreviews = previews.filter((item) => item.id !== preview.id);
		setPreviews(newPreviews);
		const newSelectedFiles = selectedFiles.filter(
			(item) => item.id !== preview.fileId,
		);
		setSelectedFiles(newSelectedFiles);
	};

	const changeImagePosition = (index: number) => {
		// Копіюємо масиви для previews та selectedFiles
		const newPreviews = [...previews];
		const newSelectedFiles = [...selectedFiles];

		// Міняємо місцями перший елемент і елемент за вказаним індексом
		const tempPreview = newPreviews[0];
		newPreviews[0] = newPreviews[index];
		newPreviews[index] = tempPreview;

		const tempFile = newSelectedFiles[0];
		newSelectedFiles[0] = newSelectedFiles[index];
		newSelectedFiles[index] = tempFile;

		// Оновлюємо стейт з новими масивами
		setPreviews(newPreviews);
		setSelectedFiles(newSelectedFiles);
	};

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over?.id) {
			if (active.id === over.id) {
				return;
			}
			setPreviews((previews) => {
				const oldIndex = previews.findIndex(
					(preview) => preview.id === active.id,
				);

				const newIndex = previews.findIndex(
					(preview) => preview.id === over.id,
				);
				return arrayMove(previews, oldIndex, newIndex);
			});
		}
	};

	const submitForm = async (
		values: FormValues,
		actions: FormikHelpers<FormValues>,
	) => {
		setIsLoading(true);
		const res = await createProduct({
			...values,
			category:
				categories?.filter((item) => item.name === values.category)[0]?.id ||
				null,
		});
		const formData = new FormData();

		if (selectedFiles) {
			selectedFiles.forEach((file) => {
				formData.append('uploaded_images', file.file);
			});
		}
		if (res.success && formData) {
			const resUpload = await createProductImage(res.data.id, formData);

			if (resUpload.success) {
				setIsLoading(false);
				setSuccess(true);
				actions.resetForm();
				setSelectedFiles([]);
				setPreviews([]);
				await revalidateFunc('/dashboard/products');
				await revalidateFunc('/');
				setTimeout(() => {
					setSuccess(false);
					router.push('/dashboard/products');
				}, 2000);
			} else if (!resUpload.success) {
				setIsLoading(false);
				setError(resUpload.error.message);
			}
		}
	};

	const prePublishProduct = {
		name: `${formikRef.current?.values.name}`,
		description: `${formikRef.current?.values.description}`,
		id: 0,
		price: Number(formikRef.current?.values.price),
		category: categories?.filter(
			(category) => category.id === Number(formikRef.current!.values.category),
		)[0],
		SKU: 0,
		slug: 'test',
		images: previews.map((preview) => {
			return {
				image: preview.image,
			};
		}),
	};

	return (
		<>
			{showPrePublish && (
				<PrePublishProduct
					setShowPrePublish={setShowPrePublish}
					product={categoriesLoading ? null : (prePublishProduct as IProduct)}
				/>
			)}
			<Formik
				innerRef={formikRef}
				initialValues={initialValuesEditForm}
				validationSchema={validationSchemaEditForm}
				onSubmit={async (values, actions) => submitForm(values, actions)}
			>
				{({ isValid, dirty, resetForm, values, initialValues }) => {
					// eslint-disable-next-line react-hooks/rules-of-hooks
					useEffect(() => {
						const hasFormChanged =
							JSON.stringify(values) !== JSON.stringify(initialValues);
						const hasFilesChanged = selectedFiles.length > 0;
						const hasChanges = hasFormChanged || hasFilesChanged;
						setUnsaved(hasChanges);
						// eslint-disable-next-line
					}, [values, initialValues, selectedFiles]);
					return (
						<Form className={styles.wrapper}>
							{isLoading && <Loader className={styles.loader} />}
							{success && (
								<MessageSuccess
									type={'dashboard'}
									text={'Your Product Added!'}
								/>
							)}
							{error !== '' && <MessageError type={'dashboard'} text={error} />}
							{modal && (
								<ModalConfirmation
									className={styles.height}
									reset={() => {
										setModal(false);
										resetForm();
										setSelectedFiles([]);
										setPreviews([]);
									}}
									closeModal={() => setModal(false)}
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
								title={'New Product '}
								callbackApply={() => {}}
								callbackDelete={() => {
									setModal(true);
								}}
								disabledDelete={false}
								disabledApply={!(isValid && dirty && selectedFiles.length > 0)}
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
											disabled={!(isValid && dirty && selectedFiles.length > 0)}
											onClick={() => setShowPrePublish(true)}
										/>
									</div>
								</div>
								<div className={styles.imageWrapper}>
									{previews.length > 0 && (
										<div
											onMouseEnter={() => {
												if (previews[0].image) {
													setIsHovered(true);
												}
											}}
											onMouseLeave={() => {
												if (previews[0].image) {
													setIsHovered(false);
												}
											}}
											className={styles.firstPreview}
										>
											{isHovered && previews[0].image && (
												<div
													onClick={() => {
														handleRemoveImage(previews[0]);
													}}
													className={styles.removeImage}
												>
													<CircleX />
												</div>
											)}
											<Image
												className={styles.firstImage}
												width={480}
												height={470}
												src={previews[0].image}
												alt={previews[0].name}
											/>
										</div>
									)}
									{previews.length > 0 ? (
										<DndContext
											collisionDetection={closestCenter}
											onDragEnd={onDragEnd}
										>
											<SortableContext
												items={previews}
												strategy={verticalListSortingStrategy}
											>
												{previews.map((preview, index) => {
													return (
														<UploadedFileBlock
															visibility={index === 0}
															key={preview.id}
															preview={preview}
															handleRemoveImage={() =>
																handleRemoveImage(preview)
															}
															changeImagePosition={() =>
																changeImagePosition(index)
															}
														/>
													);
												})}
											</SortableContext>
										</DndContext>
									) : null}
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
												accept="image/png, image/jpeg, image/heic"
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
									<div className={styles.buttonWrapper}>
										<Button
											disabled={!(isValid && dirty && selectedFiles.length > 0)}
											text={'Show pre-publish view'}
											style={'secondary'}
											onClick={() => setShowPrePublish(true)}
										/>
									</div>
								</div>
							</div>
						</Form>
					);
				}}
			</Formik>
		</>
	);
}
