import styles from './styles.module.scss';

interface IProps {
	text?: string;
	className?: string;
}

export default function EmptyDataBlock(props: IProps) {
	const { className = '', text = 'The data is empty' } = props;
	return <h1 className={`${styles.container} ${className}`}>{text}</h1>;
}
