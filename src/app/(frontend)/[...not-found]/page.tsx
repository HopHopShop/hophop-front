import Image from 'next/image';

import ButtonLink from '@/components/ButtonLink/ButtonLink';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './page.module.scss';

export default function Page() {
	return (
		<>
			<div className={styles.notFoundWrapper}>
				<h2 className={styles.notFoundSubTitle}>
					You're a wizard,
					<br />
					Harry
				</h2>

				<div className={styles.notFoundImageWrapper}>
					<Image
						src="/404.svg"
						width={480}
						height={288}
						alt="404"
						className={styles.notFoundImage}
					/>
				</div>

				<div className={styles.notFoundDescription}>
					<p>But even wizards can't find this page!</p>
				</div>

				<div className={styles.notFoundSubDescription}>
					<p className={robotoCondensed.className}>
						Try refreshing the page.
						<br /> Maybe it'll magically appear!
						<br /> Or go back to our homepage:
					</p>
				</div>

				<ButtonLink href="/" text="Back to shopping!" />
			</div>
		</>
	);
}
