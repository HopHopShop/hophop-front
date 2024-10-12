import Image from 'next/image';

import styles from './styles.module.scss';
import load from '../../../public/loading.gif';

export default function Loading() {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.text}>Loading...</h1>
			<Image className={styles.img} src={load} alt={'loading-gif'} />
		</div>
	);
}
