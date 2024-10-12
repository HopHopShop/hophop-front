'use client';

import { BellRing, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Logout } from '@/services/cookies/cookies.service';

import styles from './navbarIconsLinks.module.scss';

function NavbarIconsLinks() {
	const router = useRouter();

	const logout = async () => {
		const res = await Logout();
		if (res) {
			router.push('/');
		}
	};

	return (
		<div className={styles.icons_list}>
			<div className={styles.icons_item}>
				<BellRing />
			</div>
			<div className={styles.icons_item}>
				<LogOut onClick={() => logout()} />
			</div>
			<span className={styles.admin}>ADMIN</span>
		</div>
	);
}

export default NavbarIconsLinks;
