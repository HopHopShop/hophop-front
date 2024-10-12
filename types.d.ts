interface IResponse<T> {
	items: T[];
	items_count: number;
	pagination: IPagination;
}

interface IPlaceholder {
	empty: boolean;
}

interface ICategory {
	id: number;
	name: string;
	slug?: string;
	image: string;
	description: string;
}

interface IImage {
	image: string;
}

interface IProductAttributes {
	brand: string;
	material: string;
	style: string;
	size: number;
}

interface IProduct {
	id: number;
	name: string;
	slug: string;
	price: number;
	SKU: number;
	category: ICategory;
	description: string;
	attributes?: IProductAttributes;
	images: IImage | IImage[];
}

interface IUser extends IDeliveryAddress {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	user_role: UserRole.Admin | UserRole.User | UserRole.Owner;
	phone_number: string;
	avatar: string | null;
	is_staff: boolean;
	is_active: boolean;

	// потім видалити це поле
	image?: string;
}

interface IPersonalData {
	name: string;
	lastname: string;
	email: string;
	phone_number: string;
}

interface IDeliveryAddress {
	shipping_address: string | null;
	shipping_postcode: string | null;
	shipping_country?: string | null;
	shipping_city?: string | null;
}

interface ICreditCard {
	cardNumber: string;
	cvv: string;
	expiryDate: string;
	cardName: string;
}

interface IOrders {
	id: number;
	order_status: string;
	payment_status: string;
	created_at: string;
	total_quantity: string;
	total_price: string;
}

enum UserRole {
	User = 'User',
	Admin = 'Admin',
	Owner = 'Owner',
}

interface IPagination {
	next_page: string | null;
	previous_page: string | null;
	current_page: number;
	num_pages: number;
}

interface IResponseError {
	error: {
		message: string;
	};
}

interface IDashboardSearch {
	items: {
		id: number;
		name: string;
		first_name?: string;
		title?: string;
	}[];
}

interface ICoupon {
	id: number;
	code: string;
	discount: number;
	active: boolean;
	valid_from: string;
	valid_to: string;
}

interface IToken {
	value: string;
	expires: number;
}

interface IResponseJson<T> {
	success: boolean;
	data: T;
	error: {
		message: string;
	};
}

interface IOrderDetails {
	id: number;
	created_at: string;
	customer: null | IUser;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	shipping_country: string;
	shipping_city: string;
	shipping_address: string;
	shipping_postcode: string;
	paid: boolean;
	status: string;
	items: {
		product_id: number;
		product_name: string;
		product_price: number;
		quantity: number;
		total_price: number;
	}[];
	subtotal_price: number;
	total_price: number;
	coupon: number | null;
	discount: number | null;
	order_status: string;
	payment_type: string;
	payment_status: string;
	payment_id: string;
}

interface INews {
	id: number;
	title: string;
	content: string;
	type: string;
	image: string;
	created_at: string;
}
