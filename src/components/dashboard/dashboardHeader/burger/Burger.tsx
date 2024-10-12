import { BellRing, Menu, X } from 'lucide-react';

import NavbarLinks from '@/components/dashboard/dashboardHeader/navbarLinks/NavbarLinks';
import useOutside from '@/hooks/useOutside';

import styles from './Burger.module.scss';

function Burger() {
	const { setIsShow, isShow, ref } = useOutside(false);

	const toggleBurgerMenu = () => {
		setIsShow(!isShow);
	};
	return (
		<>
			<div ref={ref} className={styles.icons_mobile}>
				<button className={styles.icons_item} onClick={toggleBurgerMenu}>
					{isShow ? <X /> : <Menu />}
				</button>
				<div className={styles.icons_item}>
					<BellRing />
				</div>
			</div>
			<div
				className={`${styles.burgerMenu} ${isShow ? styles.burgerMenuOpen : ''}`}
			>
				<NavbarLinks />
			</div>
		</>
	);
}

export default Burger;
