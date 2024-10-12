import { londrinaSolid } from '@/styles/fonts/fonts';

import styles from './ContentBlock.module.scss';

interface IContentBlockProps {
	headline?: string;
	subTitle?: string;
	title?: string;
	paragraphs?: string[];
	listItems?: string[];
	listType?: 'ul' | 'ol';
}

export default function ContentBlock({
	subTitle,
	title,
	paragraphs,
	listItems,
	listType = 'ul',
	headline,
}: IContentBlockProps) {
	const ListTag = listType === 'ol' ? 'ol' : 'ul';

	return (
		<>
			{headline && (
				<h1 className={`${styles.headline} ${londrinaSolid.className}`}>
					{headline}
				</h1>
			)}

			{title && <h2 className={styles.title}>{title}</h2>}

			{subTitle && <h3 className={styles.subTitle}>{subTitle}</h3>}

			{paragraphs &&
				paragraphs.map((paragraph, index) => (
					<p
						key={index}
						className={styles.paragraph}
						dangerouslySetInnerHTML={{ __html: paragraph }}
					/>
				))}

			{listItems && listItems.length > 0 && (
				<ListTag className={styles.list}>
					{listItems.map((item, index) => (
						<li key={index} dangerouslySetInnerHTML={{ __html: item }} />
					))}
				</ListTag>
			)}
		</>
	);
}
