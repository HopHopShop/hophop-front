'use client';

import ProductCard from '@/components/ProductCard/ProductCard';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import { useFavorite } from '@/store/favorite/Favorite.store';

import styles from './page.module.scss';

export default function FavoritesPage() {
	const { favorites } = useFavorite();

	return (
		<section className={styles.section}>
			<SectionContainer>
				<h2 className={styles.title}>Favorites</h2>

				<div className={styles.products}>
					{favorites.length > 0 ? (
						favorites.map((product) => (
							<div className={styles.product} key={product.id}>
								<ProductCard
									product={product}
									showCategory={true}
									showButtons={{ favorite: true, cart: true, checkout: true }}
								/>
							</div>
						))
					) : (
						<h3>Favorite not found</h3>
					)}
				</div>
			</SectionContainer>
		</section>
	);
}
