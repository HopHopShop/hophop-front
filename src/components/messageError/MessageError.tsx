import styles from './styles.module.scss';

export interface IProps {
	text: string;
	classname?: string;
	type?: 'default' | 'dashboard';
}

export default function MessageError(props: IProps) {
	const { text = 'Error', classname = '', type = 'default' } = props;
	return (
		<div className={styles.wrapper}>
			<div
				className={`${styles.container} ${type !== 'default' && styles.changeWidth}`}
			>
				<div className={`${styles.text} ${classname}`}>{text}</div>
			</div>
		</div>
	);
}
