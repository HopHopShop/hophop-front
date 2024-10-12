import Image from 'next/image';
import Link from 'next/link';

import PriceTagIcon from './price-tag.svg';
import styles from './ProductCardSlider.module.scss';

interface IProps {
	id: number;
	name: string;
	price: number;
	images?: string;
	category: string;
}

export default function ProductCardSlider({
	id,
	name,
	price,
	images,
	category,
}: IProps) {
	return (
		<div className={styles.card}>
			<Link href={`/product/${id}`}>
				{images ? (
					<div className={styles.imgwrapper}>
						<Image
							src={images || '/default-image.png'}
							layout="fill"
							alt={name}
							className={styles.img}
						/>
					</div>
				) : (
					<div className={styles.defaultImageWrapper}>
						<Image
							src="/default-image.png"
							width={335}
							height={560}
							alt={name}
							className={styles.img}
						/>
					</div>
				)}
				<div className={styles.details}>
					<h3 className={styles.name}>{name}</h3>
				</div>
				<div className={styles.pricetag}>
					<PriceTagIcon className={styles.icon} />
					<p className={styles.price}>{`$${price}`}</p>
				</div>
			</Link>
		</div>
	);
}
