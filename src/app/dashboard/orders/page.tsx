import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableOrders from '@/components/dashboard/dashboardTableOrders/DashboardTableOrders';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getOrdersDashboardServer } from '@/services/dashboard/orders/dashboard.orders.service';

import styles from './styles.module.scss';

export default async function DashboardOrders() {
	const orders = await getOrdersDashboardServer();
	if (!orders.success) {
		return notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine compact={true} text={'Orders'} searchType={'orders'} />
			{orders?.data.items?.length > 0 ? (
				<DashboardTableOrders orders={orders.data} />
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
