import CategoryGridCard from '../category-grid-card';

import splitArray from '@/utils/splitArray';

import styles from './styles.module.scss';

interface IProps {
	categories: ICategory[];
}

export default function MobileCategoryGrid({ categories }: IProps) {
	const splitCategoriesByCol = splitArray(categories);

	return (
		<div className={styles.cardsColWrapper}>
			{splitCategoriesByCol.map((col, colIndex) => (
				<div key={colIndex} className={styles.cardsCol}>
					{col.map((category) => (
						<CategoryGridCard
							key={category.id}
							className={styles.card}
							category={category}
						/>
					))}
				</div>
			))}
		</div>
	);
}
