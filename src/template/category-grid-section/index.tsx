import Image from 'next/image';
import Link from 'next/link';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import CategoryGrid from './components/category-grid';

import { getAllCategories } from '@/services/fetchData';

import styles from './styles.module.scss';

export default async function CategoryGridSection() {
	const categories = await getAllCategories();

	if (!categories.success && categories.data.length > 0) {
		return <div>Error</div>;
	}

	return (
		<section id="category">
			<div className={styles.ribbonWrapper}>
				<Image
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					src={'/ribbonProductsCategory.svg'}
					alt="img"
					className={styles.ribbon}
				/>
			</div>

			<SectionContainer>
				<h2 className={styles.title}>Product Categories</h2>
			</SectionContainer>

			<div className={styles.cards}>
				<CategoryGrid categories={categories.data} />
			</div>
		</section>
	);
}
