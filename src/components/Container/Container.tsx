import styles from './Container.module.scss';

interface IContainerProps {
	children: React.ReactNode;
	className?: string;
}

export default function Container({
	children,
	className = '',
}: IContainerProps) {
	return <div className={`${styles.container} ${className}`}>{children}</div>;
}
