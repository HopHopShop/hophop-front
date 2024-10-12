import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import CookieStorage from '@/utils/cookieStorage';

interface IState {
	user: IUser | null;
}

interface IActions {
	setUser: (user: IUser | null) => void;
}

export const useUser = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				user: null,
				setUser: (payload) =>
					set((state) => {
						state.user = payload;
					}),
			})),
			{
				name: 'user',
				storage: createJSONStorage(() => CookieStorage()),
			},
		),
		{ name: 'User' },
	),
);
