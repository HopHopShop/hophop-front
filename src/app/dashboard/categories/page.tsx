import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableCategories from '@/components/dashboard/dashboardTableCategories/DashboardTableCategories';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getDashboardCategoriesServer } from '@/services/dashboard/categories/dashboard.categories.service';
import { getDashboardCategoriesCreate } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

export default async function DashboardCategories() {
	const categories = await getDashboardCategoriesServer();
	console.log(categories);
	if (!categories.success) {
		return notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Categories'}
				textButton={'New category'}
				buttonLink={getDashboardCategoriesCreate()}
				searchType={'categories'}
			/>
			{categories.data.items.length > 0 ? (
				<DashboardTableCategories categories={categories.data} />
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
