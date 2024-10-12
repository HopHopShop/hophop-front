'use client';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

export default function DashboardFooter() {
	const currentYear = new Date().getFullYear();
	return (
		<footer className={`${robotoCondensed.className} ${styles.footer}`}>
			<p> ©{currentYear} HopHopShop. All rights reserved</p>
			<p>Don't mess with our stuff!</p>
		</footer>
	);
}
