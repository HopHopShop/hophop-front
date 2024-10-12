import Image from 'next/image';
import { forwardRef, Ref } from 'react';
import CloseIcon from '../../../public/closIconForModal.svg';

import { robotoCondensed } from '@/styles/fonts/fonts';

import ButtonLink from '../ButtonLink/ButtonLink';
import styles from './ActionModal.module.scss';

interface ModalProps {
	show: boolean;
	title: string;
	text: string;
	type: 'success' | 'error';
	iconSrc: string;
	className?: string;
	onClose: () => void;
}

const ActionModal = forwardRef(function ActionModal(
	{ show, title, text, type, iconSrc, className = '', onClose }: ModalProps,
	ref: Ref<HTMLDivElement>,
) {
	if (!show) return null;

	return (
		<div className={styles.backdrop}>
			<div className={styles.modalBody} ref={ref}>
				<button className={styles.closeIcon} onClick={onClose}>
					<CloseIcon />
				</button>
				<div className={styles.upperPartWrapper}>
					<div className={styles.textPart}>
						<h2 className={styles.title}>{title}</h2>
						<p className={`${styles.subtitle} ${robotoCondensed.className}`}>
							{text}
						</p>
					</div>
					<div
						className={`${styles.imageWrapper} ${type === 'error' ? styles.error : ''}`}
					>
						<Image
							src={iconSrc}
							width={121}
							height={200}
							alt={type === 'success' ? 'like' : 'error'}
						/>
					</div>
				</div>
				<ButtonLink
					href={'/'}
					text="Let's shop!"
					className={`${styles.closeButton} ${type === 'error' ? styles.error : ''}`}
				></ButtonLink>
			</div>
		</div>
	);
});

ActionModal.displayName = 'SuccessActionModal';
export default ActionModal;
