import Image from 'next/image';
import Link from 'next/link';

import styles from './Logo.module.scss';

interface ILogoProps {
	className?: string;
}

export default function Logo({ className }: ILogoProps) {
	return (
		<div className={`${styles.logoWrapper} ${className ? className : ''}`}>
			<Link href="/">
				<Image
					src="/logo.svg"
					width={128}
					height={70}
					alt="logo"
					className={styles.image}
				/>
			</Link>
		</div>
	);
}
