export interface IResponseAuth {
	user: IUser;
	access_token: IToken;
	refresh_token: IToken;
}

export interface IResponseCheckout {
	order: {
		customer: unknown | null;
		first_name: string;
		last_name: string;
		email: string;
		phone: string;
		shipping_country: string;
		shipping_city: string;
		shipping_address: string;
		shipping_postcode: string;
	};
	payment_id: string;
	message: string;
	sessionid: unknown | null;
}

export interface IResponseCouponApply {
	products: IProduct[];
	total_items: number;
	subtotal_price: number;
	total_price: number;
	coupon_is_used: number;
	sessionid: unknown | null;
	coupon: { name: string; discount: number } | null;
}

interface IProductDetails {
	product: IProduct;
	quantity: number;
	price: number;
	total_price: number;
}

export interface IResponseGetCart {
	products: IProductDetails[];
	total_price: number;
	total_items: number;
	subtotal_price: number;
	coupon_is_used: boolean;
	coupon: { name: string; discount: number } | null;
}
