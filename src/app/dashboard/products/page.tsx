import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableProducts from '@/components/dashboard/dashboardTableProducts/DashboardTableProducts';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getProductsDashboardServer } from '@/services/dashboard/products/dashboard.products.service';
import { getDashboardProductsCreate } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

export default async function DashboardProducts() {
	const products = await getProductsDashboardServer();
	if (!products.success) {
		return notFound();
	}

	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Products'}
				textButton={'New Product'}
				buttonLink={getDashboardProductsCreate()}
				searchType={'products'}
			/>
			{products.data.items.length > 0 ? (
				<DashboardTableProducts products={products.data} />
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
