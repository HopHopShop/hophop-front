import Button from '@/components/Button/Button';

import styles from './styles.module.scss';
import React, { useEffect } from 'react';

export interface IProps {
	text?: string;
	reset: (e: React.MouseEvent<HTMLButtonElement>) => void;
	closeModal: () => void;
	className?: string;
	type?: 'confirm' | 'unsaved';
}

export default function ModalConfirmation(props: IProps) {
	const { text, reset, closeModal, className = '', type = 'confirm' } = props;

	useEffect(() => {
		document.body.classList.add('no-scroll');

		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, []);

	return (
		<div
			className={`${styles.bgWrapper} ${type === 'unsaved' && styles.full} ${className}`}
		>
			<div
				className={`${styles.container} ${type === 'unsaved' && styles.colum}`}
			>
				<span>
					{text
						? text
						: type === 'unsaved'
							? 'You have unsaved changes, do you really want to leave?'
							: 'Are you sure?'}
				</span>
				<div className={styles.wrapper}>
					<Button
						onClick={() => {
							closeModal();
						}}
						style={'secondary'}
						className={styles.btn}
						text={type === 'confirm' ? 'Cancel' : 'Discard changes'}
					/>
					<Button
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							reset(e);
						}}
						style={'primary'}
						className={styles.btn}
						text={type === 'confirm' ? 'Delete' : 'Continue editing'}
					/>
				</div>
			</div>
		</div>
	);
}
