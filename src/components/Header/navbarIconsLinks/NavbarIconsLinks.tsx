'use client';

import { Heart, ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import SearchBarWrapper from '@/components/Header/searchBarWrapper/SearchBarWrapper';
import useOutside from '@/hooks/useOutside';
import { Logout } from '@/services/cookies/cookies.service';
import { useCart } from '@/store/cart/Cart.store';
import { useFavorite } from '@/store/favorite/Favorite.store';
import { useUser } from '@/store/user/User.store';

import styles from './navbarIconsLinks.module.scss';

export default function NavbarIconsLinks() {
	const { ref, setIsShow, isShow } = useOutside(false);
	const { favorites } = useFavorite();
	const totalItems = useCart((state) => state.cart?.total_items || 0);

	return (
		<div className={styles.icons_list}>
			<div className={styles.icons_list__search}>
				<SearchBarWrapper isShow={isShow} setIsShow={setIsShow} ref={ref} />
			</div>

			<Link href="/favorites" className={styles.icons_item}>
				{favorites.length > 0 && (
					<div className={styles.qty}>{favorites.length}</div>
				)}
				<Heart />
			</Link>

			<Link href="/cart" className={styles.icons_item}>
				{totalItems > 0 && <div className={styles.qty}>{totalItems}</div>}
				<ShoppingCart />
			</Link>

			<UserLink />
		</div>
	);
}

function UserLink() {
	const user = useUser((state) => state.user);
	const setUser = useUser((state) => state.setUser);
	const { setIsShow, isShow, ref } = useOutside(false);
	const router = useRouter();

	const logout = async () => {
		const res = await Logout();
		if (res) {
			setIsShow(false);
			setUser(null);
			router.push('/');
		}
	};

	return (
		<div ref={ref}>
			<Link href={user ? '' : '/login'} className={styles.icons_item}>
				<UserRound onClick={() => setIsShow(!isShow)} />
			</Link>
			{user && isShow && (
				<div className={styles.linksWrapper}>
					<div className={styles.linksContainer}></div>
					<Link href="/account/account" onClick={() => setIsShow(false)}>
						My Account
					</Link>
					<Link href="/account/orders" onClick={() => setIsShow(false)}>
						Orders
					</Link>
					{user.user_role === 'Admin' && (
						<Link href="/dashboard" onClick={() => setIsShow(false)}>
							Dashboard
						</Link>
					)}
					<button
						className={styles.btn}
						onClick={() => logout()}
						type={'button'}
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}
