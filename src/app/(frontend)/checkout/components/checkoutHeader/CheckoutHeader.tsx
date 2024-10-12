'use client';
import { useCart } from '@/store/cart/Cart.store';

import styles from './styles.module.scss';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import { useUser } from '@/store/user/User.store';

export default function CheckoutHeader() {
	const totalItems = useCart((state) => state.cart?.total_items || 0);
	const totalPrice = useCart((state) => state.cart?.total_price || 0);
	const subtotalPrice = useCart((state) => state.cart?.subtotal_price || 0);
	const user = useUser((state) => state.user);

	return (
		<div className={styles.container}>
			<div className={styles.headline}>
				<h1 className={styles.title}>Checkout</h1>
				<span className={styles.total}>
					{totalItems} {totalItems > 1 ? 'items' : 'item'} | $
					{totalPrice < subtotalPrice ? subtotalPrice : totalPrice}
				</span>
			</div>
			{!user && (
				<div className={styles.buttonWrapper}>
					<ButtonLink
						style={'primary'}
						href={'/login'}
						className={styles.buttonHead}
						text={'Log in'}
					/>
				</div>
			)}
		</div>
	);
}
