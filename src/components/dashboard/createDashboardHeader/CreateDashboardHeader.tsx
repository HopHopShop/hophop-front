import Button from '@/components/Button/Button';

import styles from './styles.module.scss';

export interface IProps {
	title: string;
	callbackApply?: () => void;
	callbackDelete?: () => void;
	disabledDelete?: boolean;
	disabledApply?: boolean;
	typeDelete: 'button' | 'submit' | 'reset';
	typeApply: 'button' | 'submit' | 'reset';
}

export default function CreateDashboardHeader(props: IProps) {
	const {
		disabledDelete = false,
		disabledApply = false,
		title,
		callbackDelete,
		callbackApply,
		typeDelete,
		typeApply,
	} = props;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles.buttonWrapper}>
				<Button
					onClick={() => (callbackApply ? callbackApply() : null)}
					style={'primary'}
					className={styles.button}
					text={'Apply'}
					disabled={disabledApply}
					type={typeApply}
				/>
				<Button
					onClick={() => (callbackDelete ? callbackDelete() : null)}
					style={'secondary'}
					className={styles.button}
					text={'Delete'}
					disabled={disabledDelete}
					type={typeDelete}
				/>
			</div>
		</div>
	);
}
