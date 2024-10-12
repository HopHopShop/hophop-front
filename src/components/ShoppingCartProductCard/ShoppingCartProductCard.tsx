import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { robotoCondensed } from '@/styles/fonts/fonts';
import { getImages } from '@/utils/typeGuards';

import styles from './ShoppingCartProductCart.module.scss';

interface ShoppingCartProductCardProps {
	product: IProduct;
	quantity: number;
	onIncrease: () => void;
	onDecrease: () => void;
	onRemove: () => void;
}

export default function ShoppingCartProductCard(
	props: ShoppingCartProductCardProps,
) {
	const { product, quantity, onIncrease, onDecrease, onRemove } = props;

	return (
		<div className={styles.cardWrp}>
			<div className={styles.imgWrp}>
				<Image
					src={getImages(product.images)[0]?.image || '/default-image.png'}
					width={130}
					height={130}
					alt={product.name}
					className={styles.product_image}
				/>
			</div>
			<div className={styles.detailsWrp}>
				<div className={styles.details_upperPart}>
					<div className={styles.linkWrapper}>
						<Link
							href={`/product/${product.id}`}
							className={styles.productName}
						>
							{product.name}
						</Link>
						{product.category?.name && (
							<Link
								href={`/category/${product.category.id}`}
								className={styles.productName}
							>
								{product.category.name}
							</Link>
						)}
					</div>
					<button
						onClick={() => {
							onRemove();
						}}
					>
						<Trash2 className={styles.buttonDelete} />
					</button>
				</div>
				<div className={styles.details_lowerPart}>
					<p className={styles.price}>${product.price}</p>
					<div
						className={`${styles.quantity_controls} ${robotoCondensed.className}`}
					>
						<button
							onClick={() => {
								onDecrease();
							}}
							className={styles.buttonIncrease}
						>
							<Minus />
						</button>
						<span>{quantity}</span>
						<button
							onClick={() => {
								onIncrease();
							}}
						>
							<Plus className={styles.buttonIncrease} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
