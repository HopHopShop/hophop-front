import Image from 'next/image';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';
import { IPreview } from '@/app/dashboard/products/create/page';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Menu, Trash2 } from 'lucide-react';

export interface IProps {
	preview: IPreview;
	handleRemoveImage: () => void;
	changeImagePosition: () => void;
	visibility?: boolean;
}

export default function UploadedFileBlock(props: IProps) {
	const {
		preview,
		handleRemoveImage,
		changeImagePosition,
		visibility = false,
	} = props;

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: preview.id });
	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`${styles.wrapper} ${visibility ? styles.hidden : ''}`}
		>
			<Image
				width={78}
				height={78}
				className={styles.image}
				src={preview.image}
				alt={preview.name}
			/>
			<div className={styles.mainWrapper}>
				<div className={`${styles.textWrapper} ${robotoCondensed.className}`}>
					<span className={styles.text}>Product {preview.name}</span>
					<div className={styles.buttons}>
						<Trash2 className={styles.button} onClick={handleRemoveImage} />
						<div {...attributes} {...listeners}>
							<Menu className={styles.button} color="#192C32" />
						</div>
					</div>
				</div>
				<div onClick={changeImagePosition} className={styles.chooseWrapper}>
					<div className={styles.circle}></div>
					<span
						className={`${styles.chooseText}  ${robotoCondensed.className}`}
					>
						Choose as the main image
					</span>
				</div>
			</div>
		</div>
	);
}
