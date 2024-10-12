import { Trash2 } from 'lucide-react';
import Image from 'next/image';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

export interface IProps {
	image: { image: string; name: string };
	index: number;
	handleRemoveImage: (index: number) => void;
}

export default function UploadedFileBlockOld(props: IProps) {
	const { image, handleRemoveImage, index } = props;
	return (
		<div className={styles.wrapper}>
			<Image
				width={78}
				height={78}
				className={styles.image}
				src={image.image}
				alt={image.name}
			/>
			<span className={`${styles.text} ${robotoCondensed.className}`}>
				Product {image.name}
			</span>
			<Trash2
				className={styles.button}
				onClick={() => handleRemoveImage(index)}
			/>
		</div>
	);
}
