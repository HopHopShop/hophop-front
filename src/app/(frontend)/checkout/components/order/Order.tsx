'use client';
import { useState } from 'react';
import PromoCode from '@/components/promoCode/PromoCode';
import { useCart } from '@/store/cart/Cart.store';
import { londrinaSolid, robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import { useUser } from '@/store/user/User.store';
import shortText from '@/utils/func/shortText';

export default function Order() {
	const subtotalPrice = useCart((state) => state.cart?.subtotal_price || 0);
	const products = useCart((state) => state.cart?.products || []);
	const user = useUser((state) => state.user);
	const totalPrice = useCart((state) => state.cart?.total_price || 0);
	const coupon = useCart((state) => state?.cart?.coupon || null);
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className={styles.wrapper}>
			{!user && (
				<div className={styles.buttonWrapper}>
					<ButtonLink
						style={'primary'}
						href={'/login'}
						className={styles.buttonOrange}
						text={'Log in'}
					/>
				</div>
			)}
			<div className={styles.container}>
				<h1 className={styles.title}>Your Order</h1>
				<div className={styles.productMap}>
					{products.map((item, key) => (
						<div
							key={key}
							className={`${styles.productWrapper} ${robotoCondensed.className}`}
						>
							<span className={styles.name}>
								{shortText(item.product.name, 20)}
							</span>
							<div className={styles.productContainer}>
								<span className={styles.price}>${item.product.price}</span>
								<span className={styles.qty}>Quantity: {item.quantity}</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div
				className={`${styles.productPaymentInfo}
         ${robotoCondensed.className}`}
			>
				<div className={styles.Subtotal}>
					<span>Subtotal</span>
					<span>${subtotalPrice}</span>
				</div>
				<div className={styles.delivery}>
					<span>Delivery Fee</span>
					<span>$15</span>
				</div>
				<PromoCode open={open} setOpen={setOpen} coupon={coupon} />
				<div className={styles.total}>
					<span>Total</span>
					<span className={londrinaSolid.className}>${totalPrice}</span>
				</div>
			</div>
		</div>
	);
}
