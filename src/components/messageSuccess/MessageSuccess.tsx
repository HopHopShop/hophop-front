import styles from './styles.module.scss';

export interface IProps {
	text: string;
	type?: 'default' | 'dashboard';
}

export default function MessageSuccess(props: IProps) {
	const { text = 'Success', type = 'default' } = props;

	return (
		<div className={styles.wrapper}>
			<div
				className={`${styles.container} ${type !== 'default' && styles.changeWidth}`}
			>
				<div className={styles.text}>{text}</div>
			</div>
		</div>
	);
}
