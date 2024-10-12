import { Facebook, Github, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './Footer.module.scss';
import CookiesPopUp from '../CookiesPopUp/CookiesPopUp';
import Logo from '../Logo/Logo';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<>
			<CookiesPopUp />
			<footer className={styles.footer}>
				<div className={styles.wrapper}>
					<Logo className={styles.logoWrapper} />
					<div className={styles.footer_left}>
						<p className={styles.text}>
							Life's too short for boring accessories, hop on board!
						</p>
						<div className={styles.social_icons}>
							<Link href="#" className={styles.iconsWrp}>
								<Twitter />
							</Link>
							<Link href="#" className={styles.iconsWrp}>
								<Facebook />
							</Link>
							<Link href="#" className={styles.iconsWrp}>
								<Instagram style={{ fill: 'none' }} />
							</Link>
							<Link href="#" className={styles.iconsWrp}>
								<Github />
							</Link>
						</div>
					</div>

					<div className={styles.footer_right}>
						<ul className={`${robotoCondensed.className} ${styles.list}`}>
							<li>
								<Link href="#">About</Link>
							</li>
							<li>
								<Link href="/terms-of-use">Terms of use</Link>
							</li>
						</ul>
						<ul className={`${robotoCondensed.className} ${styles.list}`}>
							<li>
								<Link href="/contact-us">Contact us</Link>
							</li>
							<li>
								<Link href="/cookies-policy">Cookies policy</Link>
							</li>
							<li>
								<Link href="#">Advertising placement</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className={`${robotoCondensed.className} ${styles.copyright}`}>
					{' '}
					&#169; {currentYear} HopHopShop. All rights reserved. Don't mess with
					our stuff!
				</div>
			</footer>
		</>
	);
}
