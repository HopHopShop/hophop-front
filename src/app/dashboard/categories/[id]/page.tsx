import { notFound } from 'next/navigation';

import { getCategoryById } from '@/services/dashboard/categories/dashboard.categories.service';
import EditCategory from '@/template/editCategory/EditCategory';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardCategoriesId({ params: { id } }: Props) {
	const category = await getCategoryById(id);

	if (!category.success) {
		return notFound();
	}
	return <EditCategory category={category.data} />;
}
