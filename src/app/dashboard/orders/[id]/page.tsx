import { notFound } from 'next/navigation';

import { getOderById } from '@/services/dashboard/orders/dashboard.orders.service';
import DashboardOrderDetails from '@/template/dashboardOrderDetails/DashboardOrderDetails';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardOrderEdit({ params: { id } }: Props) {
	const order = await getOderById(Number(id));
	if (!order.success) {
		return notFound();
	}
	return <DashboardOrderDetails order={order.data} id={id} />;
}
