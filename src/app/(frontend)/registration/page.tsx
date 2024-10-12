import styles from '@/app/(frontend)/registration/styles.module.scss';
import { robotoCondensed } from '@/styles/fonts/fonts';
import RegistrationForm from '@/template/RegistrationForm/RegistrationForm';

export default function Registration() {
	return (
		<div className={styles.wrapper}>
			<section className={styles.info}>
				<div className={styles.info_head}>
					<span>Why Create an Account?</span>
					<span>Because Being Awesome</span>
					<span>Has Perks!</span>
				</div>
				<div className={`${styles.info_body} ${robotoCondensed.className}`}>
					<div className={styles.desc}>
						<p>
							<span>Speedy Checkout:</span>
							No more typing in your info every time. Your future self will
							thank you!
						</p>
					</div>
					<div className={styles.desc}>
						<p>
							<span>Order History:</span>
							Track your purchases and remember what you bought when you’re too
							busy being fabulous.
						</p>
					</div>
					<div className={styles.desc}>
						<p>
							<span>Wish List:</span>
							Save your favorite items and drop hints to friends and family.
							Birthdays just got easier.
						</p>
					</div>
					<span className={styles.subDesc}>
						So go ahead, join the cool club. You know you want to!
					</span>
				</div>
			</section>
			<section className={styles.account}>
				<div className={styles.account_wrapper}>
					<h1>Create an account</h1>
					<RegistrationForm />
				</div>
			</section>
		</div>
	);
}
