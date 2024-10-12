import Image from 'next/image';
import Link from 'next/link';

import ButtonLink from '@/components/ButtonLink/ButtonLink';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './page.module.scss';

export default function ThanksPage() {
	return (
		<div className={styles.pageWrp}>
			<div className={styles.titleWrp}>
				<h1 className={styles.title}>Ta-da!</h1>{' '}
				<h1 className={styles.title}> It’s ordered!</h1>
			</div>
			<div className={styles.imgWrp}>
				<Image
					width={221}
					height={400}
					src={'/thanksPageIllustration.svg'}
					alt="Thanks"
				></Image>
			</div>
			<h3 className={styles.subtitle}>
				Thanks for shopping with us! You're awesome!
			</h3>
			<div className={`${styles.descriptionWrp} ${robotoCondensed.className}`}>
				<p>Check your inbox for an email with all the juicy details.</p>
				<p>If you don’t see it, make sure to check your spam folder.</p>
				<p className={styles.pLinkToOrders}>
					{' '}
					You can also view your order details in your account dashboard the
					<Link href={'/account/orders'} className={styles.linkToOrders}>
						"My Orders"
					</Link>
					.
				</p>
			</div>
			{/*in future need change / on /catalog */}
			<ButtonLink
				href={'/'}
				text={'Back to shopping!'}
				className={styles.button}
				style="primary"
			></ButtonLink>
		</div>
	);
}
