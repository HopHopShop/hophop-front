'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from './Logo.module.scss';

interface ILogo {
	isShow?: boolean;
	className?: string;
}

export default function Logo({ isShow, className = '' }: ILogo) {
	return (
		<div
			className={`${styles.wrapper} ${isShow ? styles.hidden : ''} ${className}`}
		>
			<Link href="/">
				<Image
					src="/logo.svg"
					height={20}
					width={20}
					alt="logo"
					className={styles.image}
				/>
			</Link>
		</div>
	);
}
