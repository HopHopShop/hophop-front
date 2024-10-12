import Image from 'next/image';
import ContactUsForm from './ContactUsForm/ContactUsForm';

import styles from './page.module.scss';

export default function ContactUsPage() {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.left}>
				<h1 className={styles.title}>Got Questions?</h1>
				<div className={styles.imageWrapper}>
					<Image
						src={'/illustration_admin.svg'}
						width={391}
						height={391}
						alt="admin"
					/>
				</div>
				<div className={styles.text}>
					<p className={styles.paragraph}>You've found the right place!</p>
					<p className={styles.paragraph}>
						Whether you need help, a virtual high-five, or just want to chat
						about the weather, we're all ears
					</p>
				</div>
			</div>
			<ContactUsForm />
		</div>
	);
}
