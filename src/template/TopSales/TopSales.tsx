import Image from 'next/image';

import ProductsSlider from '@/components/ProductsSlider/ProductsSlider';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import { getPopularProducts } from '@/services/fetchData';

import styles from './TopSales.module.scss';

export default async function TopSales() {
	const products = await getPopularProducts();
	if (!products.success) {
		return <div>error</div>;
	}
	return (
		<section>
			<div className={styles.ribbonWrapper}>
				<Image
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					src={'/ribbonTopSales.svg'}
					alt="img"
					className={styles.ribbon}
				/>
			</div>

			<SectionContainer>
				<h2 className={styles.title}>Top Sales</h2>

				<ProductsSlider products={products.data} />
			</SectionContainer>
		</section>
	);
}
