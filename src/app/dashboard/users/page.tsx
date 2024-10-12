import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableUsers from '@/components/dashboard/dashboardTableUsers/DashboardTableUsers';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getUsersDashboardServer } from '@/services/dashboard/users/dashboard.users.service';

import styles from './styles.module.scss';

export default async function DashboardUsers() {
	const users = await getUsersDashboardServer();

	if (!users.success) {
		notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				searchType={'customers'}
				compact={true}
				text={'Users'}
			/>
			{users.data.items.length > 0 ? (
				<DashboardTableUsers users={users.data} />
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
