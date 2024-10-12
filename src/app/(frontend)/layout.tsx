import type { Metadata } from 'next';

import Container from '@/components/Container/Container';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import '@/styles/reset.scss';
import '@/styles/variables.scss';
import '@/styles/globals.scss';

import styles from './page.module.scss';

export const metadata: Metadata = {
	title: 'HopHopShop',
	description: 'Where Every Hop Counts for Cool EDC Gear!',
};

export default function FrontendLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<Container>
					<div className={styles.wrapper}>{children}</div>
				</Container>
			</main>
			<Footer />
		</>
	);
}
