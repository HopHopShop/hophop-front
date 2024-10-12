import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const { pathname, searchParams, origin } = request.nextUrl;
	const cartCookie = request.cookies.get('cart');
	const userCookie = request.cookies.get('user');

	if (pathname.startsWith('/checkout')) {
		if (
			!cartCookie ||
			!cartCookie.value ||
			JSON.parse(cartCookie.value)?.state?.cart === null ||
			JSON.parse(cartCookie.value)?.state?.cart.products?.length === 0
		) {
			return NextResponse.redirect(new URL('/cart', origin));
		}
	}

	if (pathname.startsWith('/login') || pathname.startsWith('/registration')) {
		if (
			userCookie &&
			userCookie.value &&
			JSON.parse(userCookie.value)?.state?.user !== null
		) {
			return NextResponse.redirect(new URL('/', origin));
		}
	}

	if (pathname.startsWith('/reset-password')) {
		if (
			userCookie &&
			userCookie.value &&
			JSON.parse(userCookie.value)?.state?.user !== null
		) {
			return NextResponse.redirect(new URL('/', origin));
		}

		const key = searchParams.get('key');
		const user_email = searchParams.get('user_email');

		if (!key || !user_email) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	if (pathname.startsWith('/dashboard')) {
		if (
			!userCookie ||
			!userCookie.value ||
			JSON.parse(userCookie?.value)?.state?.user?.user_role !== 'Admin'
		) {
			return NextResponse.redirect(new URL('/login', origin));
		}
	}

	if (pathname.startsWith('/test-page')) {
		if (
			!userCookie ||
			!userCookie.value ||
			JSON.parse(userCookie?.value)?.state?.user?.user_role !== 'Admin'
		) {
			return NextResponse.redirect(new URL('/', origin));
		}
	}

	if (pathname.startsWith('/account')) {
		if (
			!userCookie ||
			!userCookie.value ||
			JSON.parse(userCookie?.value)?.state?.user === null
		) {
			return NextResponse.redirect(new URL('/login', origin));
		}
	}

	if (pathname === '/thanks-for-order') {
		const orderId = searchParams.get('order_id');

		if (!orderId) {
			return NextResponse.redirect(new URL('/', origin));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/checkout',
		'/login',
		'/registration',
		'/reset-password',
		'/dashboard/:path*',
		'/account/:path*',
		'/thanks-for-order',
		'/test-page',
	],
};
