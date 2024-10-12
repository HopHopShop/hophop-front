import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

import image from '@/assets/png/Newdescription.png';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

export interface IProps {
	text: string;
	preview: string | null;
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	setPreview: (preview: string | null) => void;
	type?: 'default' | 'edit';
}

export default function DashboardUploadImage(props: IProps) {
	const {
		text,
		preview,
		handleFileChange,
		className = '',
		setPreview,
		type = 'default',
	} = props;
	const fileInputRef = useRef<null | HTMLInputElement>(null);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const editing = isHovered && type === 'edit' && styles.edit;
	return (
		<div className={`${styles.uploadImage}`}>
			<span className={`${styles.text} ${robotoCondensed.className}`}>
				{text}
			</span>
			<div
				onMouseEnter={() => {
					if (preview) {
						setIsHovered(true);
					}
				}}
				onMouseLeave={() => {
					if (preview) {
						setIsHovered(false);
					}
				}}
				className={`${styles.imageContainer} ${editing} `}
			>
				{isHovered && preview && (
					<div
						onClick={() => {
							setPreview(null);
							fileInputRef?.current?.click();
						}}
						className={styles.removeImage}
					>
						<CircleX />
					</div>
				)}
				{preview && (
					<Image
						className={styles.preview}
						width={500}
						height={500}
						src={preview}
						alt="preview-image"
					/>
				)}
				<input
					ref={fileInputRef}
					onChange={handleFileChange}
					accept="image/png, image/jpeg"
					className={styles.file}
					type="file"
				/>
				<div
					className={`${styles.imageContainer_desc} ${preview && styles.hide}`}
				>
					<Image src={image} alt={'image'} />
					<div className={`${styles.subText} ${robotoCondensed.className}`}>
						Drop your imager here, or browse jpeg, png are allowed
					</div>
				</div>
			</div>
		</div>
	);
}
