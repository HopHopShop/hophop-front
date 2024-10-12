import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableCoupons from '@/components/dashboard/dashboardTableCoupons/DashboardTableCoupons';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getDashboardCouponsServer } from '@/services/dashboard/coupons/dashboard.coupons.service';
import { getDashboardCouponsCreate } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

export default async function DashboardCoupons() {
	const coupons = await getDashboardCouponsServer();

	if (!coupons.success) {
		return notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Coupons'}
				textButton={'Add coupon'}
				buttonLink={getDashboardCouponsCreate()}
				searchType={'coupons'}
			/>
			{coupons?.data.items.length > 0 ? (
				<DashboardTableCoupons coupons={coupons.data} />
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
