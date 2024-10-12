import { notFound } from 'next/navigation';

import ProductCard from '@/components/ProductCard/ProductCard';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import { getCategoriesById, getProductsByCategory } from '@/services/fetchData';

import styles from './page.module.scss';

type Props = {
	params: {
		id: string;
	};
};

export default async function CategoryPage({ params: { id } }: Props) {
	const category = await getCategoriesById(id);
	const products = await getProductsByCategory(id);

	if (!category.success || !products.success) {
		return notFound();
	}

	return (
		<section className={styles.section}>
			<SectionContainer>
				<h2 className={styles.title}>Category {category?.data.name}</h2>

				<div className={styles.products}>
					{products?.data.items.length > 0 ? (
						products.data.items.map((product) => (
							<div className={styles.product} key={product.id}>
								<ProductCard
									product={product}
									showButtons={{ favorite: true, cart: true, checkout: true }}
								/>
							</div>
						))
					) : (
						<h3>Product not found</h3>
					)}
				</div>
			</SectionContainer>
		</section>
	);
}
