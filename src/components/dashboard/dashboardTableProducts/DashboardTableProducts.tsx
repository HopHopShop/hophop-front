'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import {
	getDashboardProducts,
	removeProductById,
} from '@/services/dashboard/products/dashboard.products.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getDashboardProductsId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import Loader from '@/components/Loader/Loader';

interface IProps {
	products: IResponse<IProduct>;
}

interface IDashboardItem {
	item: IProduct;
	setNewData: (data: IResponse<IProduct>) => void;
	setError: (text: string | null) => void;
	setSuccess: (text: string | null) => void;
	setIsLoading: (isLoading: boolean) => void;
}

const PageSize = 10;
export default function DashboardTableProducts(props: IProps) {
	const { products } = props;
	const [newData, setNewData] = useState<IResponse<IProduct>>(products);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const header = [
		{ name: 'ID' },
		{ name: 'Product' },
		{ name: 'Category' },
		{ name: 'Price' },
		{ name: 'Actions' },
	];

	return (
		<>
			{error && <MessageError type={'dashboard'} text={error} />}
			{isLoading && <Loader />}
			{success && <MessageSuccess type={'dashboard'} text={success} />}
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<ul className={styles.responsiveTable}>
						<li className={`${styles.tableHeader} `}>
							{header.map((item, i) => (
								<div
									key={i}
									className={`${styles.col} ${styles[`col${i + 1}`]}`}
								>
									{item.name}
								</div>
							))}
						</li>
						{newData.items.map((item, index: number) => (
							<DashboardItem
								item={item}
								setNewData={setNewData}
								key={index}
								setSuccess={setSuccess}
								setError={setError}
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
							const res = await getDashboardProducts(page);
							if (res.success) setNewData(res.data);
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
						const res = await removeProductById(item.id);
						if (res.success) {
							const products = await getDashboardProducts(1);
							if (products.success) {
								setIsLoading(false);
								setNewData(products.data);
								setIsShow(false);
								await revalidateFunc('/dashboard/products');
								await revalidateFunc('/dashboard/products/[id]', 'page');
								await revalidateFunc('/product/[id]', 'page');
								await revalidateFunc('/', 'layout');
								setSuccess(`Product ${item.name} was deleted`);
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
					{item.category?.name ? item.category.name : 'No category'}
				</div>
				<div className={`${styles.col} ${styles.col4}`}>{item.price}$</div>
				<div className={`${styles.col} ${styles.col5}`}>
					<RemoveButton callback={() => setIsShow(true)} />
					<EditButton callback={() => getDashboardProductsId(item.id)} />
				</div>
			</li>
		</>
	);
}
