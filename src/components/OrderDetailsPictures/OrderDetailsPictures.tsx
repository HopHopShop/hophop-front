import DeliveredIcon from './delivered.svg';
import InTransitIcon from './inTransit.svg';
import LineIcon from './line.svg';
import styles from './OrderDetailsPictures.module.scss';
import PackedIcon from './packed.svg';
import PaidIcon from './paid.svg';

export default function OrderDetailsPictures() {
	const orderStages = [
		{ icon: PaidIcon, label: 'Paid' },
		{ icon: PackedIcon, label: 'Packed' },
		{ icon: InTransitIcon, label: 'In Transit' },
		{ icon: DeliveredIcon, label: 'Delivered' },
	];

	return (
		<div className={styles.iconsWrapper}>
			{orderStages.map((stage, index) => (
				<div className={styles.elementWrapper} key={index}>
					<div
						className={`${index < 2 ? styles.active : ''} 
					${styles.iconWrapper}`}
					>
						<stage.icon className={styles.icon} />
					</div>
					<p className={styles.label}>{stage.label}</p>
					{index < orderStages.length - 1 && (
						<div
							className={`${styles.lineWrapper} 
							${index === 1 ? styles.mirrored : ''} 
							${index % 2 === 0 ? styles.odd : styles.even}`}
						>
							<LineIcon className={styles.line} />
						</div>
					)}
				</div>
			))}
		</div>
	);
}
