'use client';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import DashboardPlusButton from '@/components/dashboard/dashboardPlusButton/DashboardPlusButton';
import DashboardSearchBar from '@/components/dashboard/dashboardSearchBar/DashboardSearchBar';

import styles from './styles.module.scss';

interface IProps {
	compact: boolean;
	text: string;
	textButton?: string;
	buttonLink?: string;
	searchType:
		| 'products'
		| 'customers'
		| 'orders'
		| 'categories'
		| 'coupons'
		| 'news';
}

export default function DashboardHeadLine(props: IProps) {
	const { compact, text, textButton = '', buttonLink = '', searchType } = props;
	return (
		<div
			className={`${styles.container} ${compact && styles.compactContainer}`}
		>
			<div className={styles.wrapper}>
				<div className={styles.text}>{text}</div>
				{!compact && (
					<>
						<div className={styles.actions}>
							<ButtonLink
								className={styles.button}
								href={buttonLink}
								text={textButton}
							/>
							<DashboardSearchBar type={searchType} />
						</div>
						<DashboardPlusButton link={buttonLink} className={styles.plus} />
					</>
				)}
			</div>
			<DashboardSearchBar
				type={searchType}
				className={`${styles.mobileSearch} ${compact && styles.compactSearch}`}
			/>
		</div>
	);
}
