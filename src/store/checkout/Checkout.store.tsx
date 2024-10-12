import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IState {
	checkout: {
		personal: boolean;
		delivery: boolean;
		payment: boolean;
		paymentMethod: 'card' | 'googlePay' | 'coinbase' | 'paypal';
	};
	personalData: IPersonalData | null;
	deliveryAddress: IDeliveryAddress | null;
	creditCard: ICreditCard | null;
}

interface IActions {
	setPersonal: (personal: boolean) => void;
	setDelivery: (delivery: boolean) => void;
	setPayment: (payment: boolean) => void;
	setPaymentMethod: (
		paymentMethod: 'card' | 'googlePay' | 'coinbase' | 'paypal',
	) => void;

	setPersonalData: (personalData: IPersonalData) => void;
	setDeliveryAddress: (deliveryAddress: IDeliveryAddress) => void;
	setCreditCard: (creditCard: ICreditCard | null) => void;
}

const partialize = (state: IState) => ({
	checkout: state.checkout,
});

export const useCheckout = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				checkout: {
					personal: true,
					delivery: false,
					payment: false,
					paymentMethod: 'card',
				},
				personalData: null,
				deliveryAddress: null,
				creditCard: null,
				setPersonal: (personal) =>
					set((state) => {
						state.checkout.personal = personal;
					}),
				setDelivery: (delivery) =>
					set((state) => {
						state.checkout.delivery = delivery;
					}),
				setPayment: (payment) =>
					set((state) => {
						state.checkout.payment = payment;
					}),
				setPersonalData: (personalData) =>
					set((state) => {
						state.personalData = personalData;
					}),
				setDeliveryAddress: (payload) =>
					set((state) => {
						state.deliveryAddress = payload;
					}),
				setCreditCard: (payload) =>
					set((state) => {
						state.creditCard = payload;
					}),
				setPaymentMethod: (payload) =>
					set((state) => {
						state.checkout.paymentMethod = payload;
					}),
			})),
			{ name: 'checkout', partialize },
		),
		{ name: 'checkout' },
	),
);
