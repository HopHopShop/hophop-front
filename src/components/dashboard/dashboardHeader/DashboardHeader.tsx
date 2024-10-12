'use client';

import Burger from '@/components/dashboard/dashboardHeader/burger/Burger';
import NavbarIconsLinks from '@/components/dashboard/dashboardHeader/navbarIconsLinks/NavbarIconsLinks';
import Logo from '@/components/Header/logo/Logo';

import styles from './styles.module.scss';
import Container from '../../Container/Container';

export default function DashboardHeader() {
	return (
		<header className={styles.header}>
			<Container className={styles.container}>
				<div className={styles.wrapper}>
					<Burger />

					<Logo className={styles.logo} />
					<nav className={styles.navigation}>
						<NavbarIconsLinks />
					</nav>
				</div>
			</Container>
		</header>
	);
}
