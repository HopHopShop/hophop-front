import { notFound } from 'next/navigation';
import { getProductByID } from '@/services/dashboard/products/dashboard.products.service';
import EditProduct from '@/template/editProduct/EditProduct';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardProductsId({ params: { id } }: Props) {
	const product = await getProductByID(id);

	if (!product.success) {
		return notFound();
	}

	return <EditProduct product={product.data} />;
}
