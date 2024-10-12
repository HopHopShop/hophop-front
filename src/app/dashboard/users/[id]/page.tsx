import NotFound from 'next/dist/client/components/not-found-error';

import { getDashboardUserById } from '@/services/dashboard/users/dashboard.users.service';
import DashboardUserTemplate from '@/template/dashboardUserTemplate/DashboardUserTemplate';

import styles from './styles.module.scss';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardProductsId({ params: { id } }: Props) {
	const user = await getDashboardUserById(id);
	if (!user.success) {
		return NotFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardUserTemplate user={user.data} />
		</div>
	);
}
