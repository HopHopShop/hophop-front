'use client';
import { PencilLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

import styles from './styles.module.scss';

interface IProps {
	callback: () => string;
}

export default function EditButton(props: IProps) {
	const { callback } = props;
	const router = useRouter();
	return (
		<div className={styles.iconWrapper}>
			<PencilLine onClick={() => router.push(callback())} />
		</div>
	);
}
