'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/Button/Button';
import PromoCode from '@/components/promoCode/PromoCode';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import { useCart } from '@/store/cart/Cart.store';

import styles from './page.module.scss';

export default function ShoppingCartPage() {
	const totalPrice = useCart((state) => state?.cart?.total_price || 0);
	const total_items = useCart((state) => state?.cart?.total_items || 0);
	const subTotal = useCart((state) => state?.cart?.subtotal_price || 0);
	const coupon = useCart((state) => state?.cart?.coupon || null);
	const fetchCart = useCart((state) => state?.fetchCart);
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		fetchCart();
	}, [fetchCart]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.shoppingCartPage}>
				<div className={styles.shoppingCartWrp}>
					<ShoppingCart />
				</div>
				<div className={styles.orderSummaryWrp}>
					<h2>Order Summary</h2>
					<div className={styles.totalWrp}>
						<div className={styles.pricesWrp}>
							<p>Subtotal </p>
							<p>${subTotal}</p>
						</div>
						<PromoCode
							className={styles.discount}
							open={open}
							setOpen={setOpen}
							disabled={total_items === 0}
							coupon={coupon}
						/>
						<div className={`${styles.pricesWrp} ${styles.totalPriceWrp}`}>
							<p>Total</p>
							<p className={styles.totalPrice}>${totalPrice}</p>
						</div>
					</div>
					<Button
						text={'Checkout'}
						style={'primary'}
						disabled={total_items === 0}
						onClick={() => router.push('/checkout')}
						className={styles.buttonCheckout}
					/>
				</div>
			</div>
		</div>
	);
}
