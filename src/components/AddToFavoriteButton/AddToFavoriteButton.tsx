'use client';

import { Heart } from 'lucide-react';

import { useFavorite } from '@/store/favorite/Favorite.store';

import styles from './AddToFavoriteButton.module.scss';

interface IProps {
	product: IProduct;
	className?: string;
	isPreview?: boolean;
}

export default function AddToFavoriteButton({
	product,
	className,
	isPreview = false,
}: IProps) {
	const { favorites, toggleFavorite } = useFavorite();
	const isFavorite = favorites.some((fav) => fav.id === product.id);

	return (
		<button
			className={`${styles.button} ${className} ${isFavorite ? styles.active : ''}`}
			onClick={isPreview ? () => {} : () => toggleFavorite(product)}
		>
			<Heart />
		</button>
	);
}
