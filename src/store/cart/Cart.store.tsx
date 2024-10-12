import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { fetchWithCookies } from '@/services/cookies/cookies.service';
import { fetchData } from '@/services/fetchData';
import {
	IResponseCouponApply,
	IResponseGetCart,
} from '@/types/response/response';
import CookieStorage from '@/utils/cookieStorage';

interface IState {
	cart: IResponseGetCart | null;
}

interface IActions {
	fetchCart: () => Promise<void>;
	addItemToCart: (id: number) => Promise<void>;
	subtractItemFromCart: (id: number) => Promise<void>;
	removeItemFromCart: (id: number) => Promise<void>;
	addCoupon: (coupon: string) => Promise<string>;
	deleteCoupon: () => Promise<boolean | undefined>;
}

export const useCart = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				cart: null,
				fetchCart: async () => {
					try {
						const res = await fetchData<IResponseGetCart>('cart/');
						if (res.success) {
							set((state) => {
								state.cart = res.data;
							});
						} else if (!res.success) {
							console.error(res.error.message);
						}
					} catch (error) {
						console.error('Failed to fetch cart data:', error);
					}
				},

				addItemToCart: async (id: number) => {
					try {
						const res = await fetchData<IResponseGetCart>(`cart/add/${id}/`, {
							method: 'POST',
						});
						if (res.success) {
							await useCart.getState().fetchCart();
						} else if (!res.success) {
							console.error(res.error.message);
						}
					} catch (error) {
						console.error('Failed to add item to cart:', error);
					}
				},

				subtractItemFromCart: async (id: number) => {
					try {
						const res = await fetchData<IResponseGetCart>(
							`cart/subtract/${id}/`,
							{
								method: 'DELETE',
							},
						);
						if (res.success) {
							await useCart.getState().fetchCart();
						} else if (!res.success) {
							console.error(res.error.message);
						}
					} catch (error) {
						console.error('Failed to subtract item from cart:', error);
					}
				},

				removeItemFromCart: async (id: number) => {
					try {
						const res = await fetchData<IResponseGetCart>(
							`cart/remove/${id}/`,
							{
								method: 'DELETE',
							},
						);
						if (res.success) {
							await useCart.getState().fetchCart();
						} else if (!res.success) {
							console.error(res.error.message);
						}
					} catch (error) {
						console.error('Failed to remove item from cart:', error);
					}
				},

				addCoupon: async (coupon: string): Promise<any | undefined> => {
					const res = await fetchWithCookies<IResponseCouponApply>(
						'/cart/coupon/apply/',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ code: coupon }),
						},
					);
					if (res.success) {
						await useCart.getState().fetchCart();
						return '';
					} else if (!res.success) {
						return res.error.message;
					}
				},

				deleteCoupon: async (): Promise<boolean | undefined> => {
					try {
						const res = await fetchWithCookies<IResponseCouponApply>(
							'/cart/coupon/remove/',
							{
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
							},
						);
						if (res.success) {
							await useCart.getState().fetchCart();
							return true;
						} else if (!res.success) {
							console.error(res.error.message);
							return true;
						}
					} catch (error) {
						console.error('Failed to remove coupon:', error);
					}
				},
			})),
			{
				name: 'cart',
				storage: createJSONStorage(() => CookieStorage()),
			},
		),
		{ name: 'Cart' },
	),
);
