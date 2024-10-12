'use client';

import { DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCart } from '@/store/cart/Cart.store';

import styles from './GoToCheckoutButton.module.scss';

interface IProps {
	product: IProduct;
	className?: string;
}

export default function GoToCheckoutButton({ product, className }: IProps) {
	const addToCart = useCart((state) => state.addItemToCart);

	const router = useRouter();

	const GoToCheckoutHandler = () => {
		if (product) {
			// Adding a product to the cart
			addToCart(product.id);

			// Redirect to the Checkout page
			router.push('/checkout');
		}
	};

	return (
		<button
			className={`${styles.button} ${className}`}
			onClick={() => GoToCheckoutHandler()}
		>
			<DollarSign />
		</button>
	);
}
