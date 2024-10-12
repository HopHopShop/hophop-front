'use client';
import { ChevronsRight } from 'lucide-react';

import {
	DOTS,
	usePagination,
} from '@/components/dashboard/pagination/usePagination';

import styles from './styles.module.scss';

export interface InterfacePagination {
	onPageChange: (page: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
	num_pages: number; // Додаємо це поле
	className?: string;
}

export default function Pagination(props: InterfacePagination) {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		num_pages, // Використовуємо це поле
		className = '',
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
		return null;
	}

	const goToFirst = () => {
		onPageChange(1);
	};

	const goToLast = () => {
		onPageChange(num_pages);
	};

	let lastPage = paginationRange![paginationRange!.length - 1];

	return (
		<ul className={`${styles.paginationContainer}  ${className}`}>
			<li
				className={`${styles.paginationItem}  ${currentPage === 1 && styles.disabled}`}
				onClick={goToFirst}
			>
				<ChevronsRight className={`${styles.arrow}  ${styles.arrowRight}`} />
			</li>
			{paginationRange!.map((pageNumber, index) => {
				if (pageNumber === DOTS) {
					return (
						<li
							key={index}
							className={`${styles.paginationItem}  ${styles.dots}`}
						>
							&#8230;
						</li>
					);
				}

				return (
					<li
						key={index}
						className={`${styles.paginationItem}  ${pageNumber === currentPage && styles.selected}`}
						onClick={() => onPageChange(pageNumber as number)}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={`${styles.paginationItem}  ${currentPage === lastPage && styles.disabled}`}
				onClick={goToLast}
			>
				<ChevronsRight className={`${styles.arrow}  `} />
			</li>
		</ul>
	);
}
