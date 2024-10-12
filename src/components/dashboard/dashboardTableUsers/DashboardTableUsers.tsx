'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import Pagination from '@/components/dashboard/pagination/Pagination';
import { getDashboardUsers } from '@/services/dashboard/users/dashboard.users.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getDashboardUsersId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

interface IProps {
	users: IResponse<IUser>;
}

export default function DashboardTableUsers(props: IProps) {
	const { users } = props;
	const [newData, setNewData] = useState<IResponse<IUser>>(users);
	const header = [
		{ name: 'User ID' },
		{ name: 'Name' },
		{ name: 'Lastname' },
		{ name: 'Role' },
		{ name: 'Phone' },
		{ name: 'Email' },
		{ name: 'Actions' },
	];

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ul className={styles.responsiveTable}>
					<li className={`${styles.tableHeader}`}>
						{header.map((item, i) => (
							<div key={i} className={`${styles.col} ${styles[`col${i + 1}`]}`}>
								{item.name}
							</div>
						))}
					</li>
					{newData?.items?.map((item, index: number) => (
						<li
							key={index}
							className={`${styles.tableRow} ${robotoCondensed.className}`}
						>
							<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
							<div className={`${styles.col} ${styles.col2}`}>
								{item.first_name}
							</div>
							<div className={`${styles.col} ${styles.col3}`}>
								{item.last_name}
							</div>
							<div className={`${styles.col} ${styles.col4}`}>
								{item.user_role}
							</div>
							<div className={`${styles.col} ${styles.col5}`}>
								{item.phone_number}
							</div>
							<div className={`${styles.col} ${styles.col6}`}>{item.email}</div>
							<div className={`${styles.col} ${styles.col7}`}>
								<EditButton callback={() => getDashboardUsersId(item.id)} />
							</div>
						</li>
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
						const res = await getDashboardUsers(page);
						if (res.success) {
							setNewData(res.data);
						}
					}}
				/>
			) : null}
		</div>
	);
}
