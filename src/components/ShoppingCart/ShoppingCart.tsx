'use client';

import { useCart } from '@/store/cart/Cart.store';

import styles from './ShoppingCart.module.scss';
import ShoppingCartProductCard from '../ShoppingCartProductCard/ShoppingCartProductCard';

export default function ShoppingCart() {
	const { addItemToCart, removeItemFromCart, subtractItemFromCart } = useCart();
	const products = useCart((state) => state?.cart?.products || []);

	return (
		<div className={styles.shoppingCart}>
			{products.length === 0 ? (
				<p className={styles.titleEmptyCart}>Your cart is empty</p>
			) : (
				products.map((item, index) => (
					<ShoppingCartProductCard
						key={index}
						product={item.product}
						onIncrease={() => addItemToCart(item.product.id)}
						onDecrease={() => subtractItemFromCart(item.product.id)}
						onRemove={() => removeItemFromCart(item.product.id)}
						quantity={item.quantity}
					/>
				))
			)}
		</div>
	);
}
