import { notFound } from 'next/navigation';

import { getCouponById } from '@/services/dashboard/coupons/dashboard.coupons.service';
import EditCoupon from '@/template/editCoupon/EditCoupon';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardCategoriesId({ params: { id } }: Props) {
	const coupon = await getCouponById(id);

	if (!coupon.success) {
		return notFound();
	}
	return <EditCoupon coupon={coupon.data} />;
}
