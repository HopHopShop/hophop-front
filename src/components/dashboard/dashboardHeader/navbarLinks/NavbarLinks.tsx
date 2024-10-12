'use client';

import Link from 'next/link';

import { sidebarLinks } from '@/utils/linksData/linksData';

import styles from './NavbarLinks.module.scss';

export default function NavbarLinks() {
	return (
		<ul className={styles.nav}>
			{sidebarLinks.map((link, index) => (
				<Link key={index} href={link.path} className={styles.nav_link}>
					{link.name}
				</Link>
			))}
		</ul>
	);
}
