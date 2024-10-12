export const getDashboardProductsCreate = () => '/dashboard/products/create';

export const getDashboardCategoriesCreate = () =>
	'/dashboard/categories/create';

export const getDashboardCouponsCreate = () => '/dashboard/coupons/create';
export const getDashboardNewsCreate = () => '/dashboard/news/create';

export const getDashboardProductsId = (id: number) =>
	`/dashboard/products/${id}`;

export const getDashboardCategoriesId = (id: number) =>
	`/dashboard/categories/${id}`;
export const getDashboardNewsId = (id: number) => `/dashboard/news/${id}`;

export const getDashboardOrdersId = (id: number) => `/dashboard/orders/${id}`;

export const getDashboardUsersId = (id: number) => `/dashboard/users/${id}`;
export const getDashboardCouponsId = (id: number) => `/dashboard/coupons/${id}`;
