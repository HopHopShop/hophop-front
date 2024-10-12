'use client';
import AddToFavoriteButton from '@/components/AddToFavoriteButton/AddToFavoriteButton';
import Button from '@/components/Button/Button';
import { useCart } from '@/store/cart/Cart.store';

import styles from './styles.module.scss';

interface IProps {
	product: IProduct;
	className?: string;
	isPreview?: boolean;
}

export default function ProductIdActions(props: IProps) {
	const { product, className = '', isPreview = false } = props;
	const addToCart = useCart((state) => state.addItemToCart);

	const addToCartHandler = () => {
		if (product) {
			addToCart(product.id);
		}
	};
	return (
		<div className={`${styles.actions} ${className}`}>
			<Button
				className={styles.cartButton}
				text={'Add to cart'}
				onClick={isPreview ? () => {} : addToCartHandler}
			/>

			{product && (
				<AddToFavoriteButton
					isPreview={isPreview}
					className={styles.iconFavorite}
					product={product}
				/>
			)}
		</div>
	);
}
