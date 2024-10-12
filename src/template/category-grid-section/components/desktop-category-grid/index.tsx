import CategoryGridCard from '../category-grid-card';

import chunkArray from '@/utils/chunkArray';

import styles from './styles.module.scss';

interface IProps {
	categories: ICategory[];
}

export default function DesktopCategoryGrid({ categories }: IProps) {
	const chunkedCategories = chunkArray(categories, 3);

	return (
		<>
			{chunkedCategories.map((row, rowIndex) => (
				<div key={rowIndex} className={styles.cardsRow}>
					{row.map((category) => (
						<CategoryGridCard
							key={category.id}
							className={styles.card}
							category={category}
						/>
					))}
				</div>
			))}
		</>
	);
}
