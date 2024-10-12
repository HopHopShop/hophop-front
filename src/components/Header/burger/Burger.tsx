import { Menu, X } from 'lucide-react';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';

import NavbarLinks from '@/components/Header/navbarLinks/NavbarLinks';
import SearchBarWrapper from '@/components/Header/searchBarWrapper/SearchBarWrapper';

import styles from './Burger.module.scss';

export interface IBurger {
	isShow: boolean;
	setIsShow: (isShow: boolean) => void;
}

function Burger(props: IBurger, ref: Ref<HTMLDivElement>) {
	const { isShow, setIsShow } = props;
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
	const refBurger = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (event: any) => {
		if (refBurger.current && !refBurger.current.contains(event.target)) {
			setIsBurgerMenuOpen(false);
		}
	};

	const toggleBurgerMenu = () => {
		setIsBurgerMenuOpen(!isBurgerMenuOpen);
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return (
		<>
			<div
				ref={refBurger}
				className={`${styles.icons_mobile} ${isShow && styles.opened}`}
			>
				<button
					className={`${styles.icons_item} ${isShow ? styles.searchBarOpen : ''}`}
					onClick={toggleBurgerMenu}
				>
					{isBurgerMenuOpen ? <X /> : <Menu />}
				</button>
				<SearchBarWrapper isShow={isShow} setIsShow={setIsShow} ref={ref} />
			</div>
			<div
				className={`${styles.burgerMenu} ${isBurgerMenuOpen ? styles.burgerMenuOpen : ''}`}
			>
				<NavbarLinks />
			</div>
		</>
	);
}

export default forwardRef(Burger);
