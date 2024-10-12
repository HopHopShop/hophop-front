'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import {
	getDashboardCategories,
	removeCategoryById,
} from '@/services/dashboard/categories/dashboard.categories.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import { getDashboardCategoriesId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import { truncateText } from '@/utils/func/truncateText';
import Loader from '@/components/Loader/Loader';

interface IProps {
	categories: IResponse<ICategory>;
}

interface IDashboardItem {
	setNewData: (data: IResponse<ICategory>) => void;
	item: ICategory;
	setError: (text: string | null) => void;
	setSuccess: (text: string | null) => void;
	setIsLoading: (isLoading: boolean) => void;
}

const PageSize = 10;
export default function DashboardTableCategories(props: IProps) {
	const { categories } = props;
	const [newData, setNewData] = useState<IResponse<ICategory>>(categories);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const header = [
		{ name: 'ID' },
		{ name: 'Category' },
		{ name: 'Description' },
		{ name: 'Actions' },
	];
	return (
		<>
			{isLoading && <Loader />}
			{error && <MessageError type={'dashboard'} text={error} />}
			{success && <MessageSuccess type={'dashboard'} text={success} />}
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<ul className={styles.responsiveTable}>
						<li className={`${styles.tableHeader}`}>
							{header.map((item, i) => (
								<div
									key={i}
									className={`${styles.col} ${styles[`col${i + 1}`]}`}
								>
									{item.name}
								</div>
							))}
						</li>
						{newData?.items?.map((item, index: number) => (
							<DashboardItem
								item={item}
								setNewData={setNewData}
								key={index}
								setError={setError}
								setSuccess={setSuccess}
								setIsLoading={setIsLoading}
							/>
						))}
					</ul>
				</div>
				{newData?.items_count > PageSize ? (
					<Pagination
						num_pages={newData?.pagination?.num_pages}
						currentPage={newData?.pagination?.current_page}
						totalCount={newData?.items_count}
						pageSize={PageSize}
						onPageChange={async (page) => {
							const res = await getDashboardCategories(page);
							if (res.success) {
								setNewData(res.data);
							}
						}}
					/>
				) : null}
			</div>
		</>
	);
}

function DashboardItem(props: IDashboardItem) {
	const { setNewData, item, setSuccess, setError, setIsLoading } = props;
	const [isShow, setIsShow] = useState<boolean>(false);
	return (
		<>
			{isShow && (
				<ModalConfirmation
					reset={async () => {
						setIsLoading(true);
						const res = await removeCategoryById(item.id);
						if (res.success) {
							const categories = await getDashboardCategories(1);
							if (categories.success) {
								setIsLoading(false);
								setNewData(categories.data);
								setIsShow(false);
								setSuccess(`Category ${item.id} was deleted}`);
								await revalidateFunc('/dashboard/categories');
								await revalidateFunc('/dashboard/products');
								await revalidateFunc('/dashboard/categories/[id]', 'page');
								await revalidateFunc('/categories/[id]', 'page');
								await revalidateFunc('/', 'layout');
								setTimeout(() => {
									setSuccess(null);
								}, 3000);
							}
						} else {
							setIsLoading(false);
							setIsShow(false);
							setError(res.error.message || 'Something went wrong');
							setTimeout(() => {
								setError(null);
							}, 5000);
						}
					}}
					closeModal={() => setIsShow(false)}
					text={'Are you sure?'}
				/>
			)}
			<li className={`${styles.tableRow} ${robotoCondensed.className}`}>
				<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
				<div className={`${styles.col} ${styles.col2}`}>{item.name}</div>
				<div className={`${styles.col} ${styles.col3}`}>
					{truncateText(item.description, 60)}
				</div>
				<div className={`${styles.col} ${styles.col4}`}>
					<RemoveButton callback={() => setIsShow(true)} />
					<EditButton callback={() => getDashboardCategoriesId(item.id)} />
				</div>
			</li>
		</>
	);
}
