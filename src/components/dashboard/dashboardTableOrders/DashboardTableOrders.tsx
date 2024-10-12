'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import {
	getDashboardOrders,
	removeOrderById,
} from '@/services/dashboard/orders/dashboard.orders.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { formatDate } from '@/utils/func/formatDate';
import { getDashboardOrdersId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import Loader from '@/components/Loader/Loader';
import { getProfileOrderId } from '@/utils/paths/profile.paths';

interface IProps {
	orders: IResponse<IOrders>;
	type?: 'profile' | 'dashboard';
}

interface IDashboardItem {
	item: IOrders;
	setNewData: (data: IResponse<IOrders>) => void;
	setError: (text: string | null) => void;
	setSuccess: (text: string | null) => void;
	setIsLoading: (isLoading: boolean) => void;
	type?: 'profile' | 'dashboard';
}

export default function DashboardTableOrders(props: IProps) {
	const { orders, type = 'dashboard' } = props;

	const [newData, setNewData] = useState<IResponse<IOrders>>(orders);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const header = [
		{ name: 'Order ID' },
		{ name: 'Order Status ' },
		{ name: 'Payment Status ' },
		{ name: 'Quantity' },
		{ name: 'Price' },
		{ name: 'Date' },
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
								key={index}
								item={item}
								setNewData={setNewData}
								setSuccess={setSuccess}
								setError={setError}
								setIsLoading={setIsLoading}
								type={type}
							/>
						))}
					</ul>
				</div>
				{newData?.items?.length > 0 ? (
					<Pagination
						num_pages={newData?.pagination?.num_pages}
						currentPage={newData?.pagination?.current_page}
						totalCount={newData?.items_count}
						pageSize={10}
						onPageChange={async (page) => {
							const res = await getDashboardOrders(page);
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
	const {
		setNewData,
		item,
		setSuccess,
		setError,
		setIsLoading,
		type = 'dashboard',
	} = props;
	const [isShow, setIsShow] = useState<boolean>(false);
	return (
		<>
			{isShow && (
				<ModalConfirmation
					reset={async () => {
						setIsLoading(true);
						const res = await removeOrderById(item.id);
						if (res.success) {
							const orders = await getDashboardOrders(1);
							if (orders.success) {
								setIsLoading(false);
								setNewData(orders.data);
								await revalidateFunc('/dashboard/orders');
								setIsShow(false);
								setSuccess(`Order ${item.id} was successfully deleted`);
								setTimeout(() => {
									setSuccess(null);
								}, 3000);
							}
						} else {
							setIsLoading(false);
							setError(res.error.message || 'Something went wrong');
							setTimeout(() => {
								setError(null);
							}, 3000);
						}
					}}
					closeModal={() => setIsShow(false)}
					text={'Are you sure?'}
				/>
			)}
			<li className={`${styles.tableRow} ${robotoCondensed.className}`}>
				<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
				<div className={`${styles.col} ${styles.col2}`}>
					{item.order_status}
				</div>
				<div className={`${styles.col} ${styles.col3}`}>
					{item.payment_status}
				</div>
				<div className={`${styles.col} ${styles.col4}`}>
					{item.total_quantity}
				</div>
				<div className={`${styles.col} ${styles.col5}`}>{item.total_price}</div>
				<div className={`${styles.col} ${styles.col6}`}>
					{formatDate(item.created_at)}
				</div>
				<div className={`${styles.col} ${styles.col7}`}>
					{type === 'dashboard' && (
						<RemoveButton callback={() => setIsShow(true)} />
					)}
					<EditButton
						callback={() =>
							type === 'dashboard'
								? getDashboardOrdersId(item.id)
								: getProfileOrderId(item.id)
						}
					/>
				</div>
			</li>
		</>
	);
}
