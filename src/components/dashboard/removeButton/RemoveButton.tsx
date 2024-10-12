'use client';
import { Trash2 } from 'lucide-react';

import styles from './styles.module.scss';

interface IProps {
	callback: () => void;
}

export default function RemoveButton(props: IProps) {
	const { callback } = props;
	return (
		<div className={styles.iconWrapper}>
			<Trash2 onClick={() => callback()} />
		</div>
	);
}
