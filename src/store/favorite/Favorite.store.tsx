import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import CookieStorage from '@/utils/cookieStorage';

interface IState {
	favorites: IProduct[];
	toggleFavorite: (product: IProduct) => void;
}

export const useFavorite = create<IState>()(
	devtools(
		persist(
			(set) => ({
				favorites: [],
				toggleFavorite: (product: IProduct) => {
					set(
						(state) => {
							const isFavorite = state.favorites.some(
								(fav) => fav.id === product.id,
							);
							if (isFavorite) {
								return {
									favorites: state.favorites.filter(
										(fav) => fav.id !== product.id,
									),
								};
							} else {
								return {
									favorites: [...state.favorites, product],
								};
							}
						},
						false,
						'toggleFavorite',
					);
				},
			}),
			{
				name: 'favorites',
				storage: createJSONStorage(() => CookieStorage()),
			},
		),
		{ name: 'Favorites' },
	),
);
