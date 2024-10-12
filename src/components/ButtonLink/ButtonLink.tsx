import Link from 'next/link';

import styles from './ButtonLink.module.scss';

interface IButtonLinkProps {
	href: string;
	text: string;
	className?: string;
	style?: 'primary' | 'secondary';
}

export default function ButtonLink({
	href,
	text,
	className = '',
	style = 'primary',
}: IButtonLinkProps) {
	return (
		<Link
			href={href}
			className={`${styles.button} ${className} ${style === 'secondary' ? styles.secondary : styles.primary}`}
		>
			{text}
		</Link>
	);
}
