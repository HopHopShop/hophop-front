'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import {
	getDashboardCoupons,
	removeCouponById,
} from '@/services/dashboard/coupons/dashboard.coupons.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { formatDate } from '@/utils/func/formatDate';
import { getDashboardCouponsId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import Loader from '@/components/Loader/Loader';

interface IProps {
	coupons: IResponse<ICoupon>;
}

interface IDashboardItem {
	setNewData: (data: IResponse<ICoupon>) => void;
	item: ICoupon;
	setError: (text: string | null) => void;
	setSuccess: (text: string | null) => void;
	setIsLoading: (isLoading: boolean) => void;
}

const PageSize = 10;
export default function DashboardTableCoupons(props: IProps) {
	const { coupons } = props;
	const [newData, setNewData] = useState<IResponse<ICoupon>>(coupons);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const header = [
		{ name: 'Coupon ID' },
		{ name: 'Name' },
		{ name: 'Status' },
		{ name: 'Discount amount ' },
		{ name: 'Valid from' },
		{ name: 'Valid until' },
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
							const coupons = await getDashboardCoupons(page);
							if (coupons.success) {
								setNewData(coupons.data);
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
						const res = await removeCouponById(item.id);
						if (res.success) {
							const coupons = await getDashboardCoupons(1);
							if (coupons.success) {
								setNewData(coupons.data);
								setIsLoading(false);
								setIsShow(false);
								setSuccess(`Coupon ${item.code} has been removed`);
								await revalidateFunc('/dashboard/coupons');
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
				<div className={`${styles.col} ${styles.col2}`}>{item.code}</div>
				<div className={`${styles.col} ${styles.col3}`}>
					{item.active ? 'Active' : 'Inactive'}
				</div>
				<div className={`${styles.col} ${styles.col4}`}>{item.discount}%</div>
				<div className={`${styles.col} ${styles.col5}`}>
					{formatDate(item.valid_from)}
				</div>
				<div className={`${styles.col} ${styles.col6}`}>
					{formatDate(item.valid_to)}
				</div>
				<div className={`${styles.col} ${styles.col7}`}>
					<RemoveButton callback={() => setIsShow(true)} />
					<EditButton callback={() => getDashboardCouponsId(item.id)} />
				</div>
			</li>
		</>
	);
}
