'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/utils/linksData/linksData';

import styles from './styles.module.scss';

export default function DashboardSidebar() {
	const pathname = usePathname();
	const isActive = (path: string) => {
		// Якщо шлях є точним або є специфічним підшляхом
		if (path === '/dashboard') {
			return pathname === path; // Точна відповідність для "/dashboard"
		}
		return pathname.startsWith(path); // Для інших шляхів використовується startsWith
	};
	return (
		<aside className={styles.sidebar}>
			<ul>
				{sidebarLinks.map((link, index) => (
					<li key={index}>
						<Link
							className={`${styles.link} ${isActive(link.path) ? styles.active : ''}`}
							href={link.path}
						>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
}
