import { Londrina_Solid, Roboto_Condensed } from 'next/font/google';

export const londrinaSolid = Londrina_Solid({
	subsets: ['latin'],
	weight: ['100', '300', '400'],
	display: 'swap',
	preload: true,
	style: 'normal',
	variable: '--font-londrina',
});

export const robotoCondensed = Roboto_Condensed({
	subsets: ['latin'],
	weight: ['400', '700'],
	display: 'swap',
	preload: true,
	style: 'normal',
	variable: '--font-roboto',
});
