import styles from './SectionContainer.module.scss';

interface IContainerProps {
	children: React.ReactNode;
}

export default function SectionContainer({ children }: IContainerProps) {
	return <div className={styles.container}>{children}</div>;
}
