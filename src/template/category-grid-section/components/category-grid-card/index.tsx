import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

interface IProps {
	category: ICategory;
	className?: string;
}

export default function CategoryGridCard({ category, className }: IProps) {
	return (
		<Link
			href={`/category/${category.id}`}
			className={`${styles.card} ${className}`}
			data-aos="fade-up"
		>
			<div className={styles.imageWrapper}>
				<Image
					src={category.image || '/default-image.png'}
					width={335}
					height={560}
					alt={category.name}
				/>
			</div>
			<div className={styles.categoryName}>{category.name}</div>
		</Link>
	);
}
