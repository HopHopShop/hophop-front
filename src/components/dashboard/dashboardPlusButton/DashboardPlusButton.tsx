import { Plus } from 'lucide-react';
import Link from 'next/link';

import styles from './styles.module.scss';

export interface IProps {
	className?: string;
	link: string;
}

export default function DashboardPlusButton(props: IProps) {
	const { className = '', link } = props;
	return (
		<Link className={`${styles.container} ${className}`} href={link}>
			<Plus strokeWidth={5} />
		</Link>
	);
}
