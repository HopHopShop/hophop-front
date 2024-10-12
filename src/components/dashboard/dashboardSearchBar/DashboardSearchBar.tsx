'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { useFetchAuth } from '@/hooks/useFetchAuth';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './DashboardSearchBar.module.scss';

interface IProps {
	className?: string;
	type: string;
}

function DashboardSearchBar(props: IProps) {
	const { className = '', type } = props;
	const [query, setQuery] = useState('');
	const debouncedSearch = useDebounce(query.toLowerCase(), 500);
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);

	const mappingsSearch: { [key: string]: string } = {
		customers: 'search',
		products: 'name',
		orders: 'id',
		categories: 'name',
		coupons: 'name',
		news: 'title',
	};

	const mappingsUrl: { [key: string]: string } = {
		customers: 'auth/customers',
		products: 'shop/products',
		orders: 'checkout/orders',
		categories: 'shop/categories',
		coupons: 'cart/coupon',
		news: 'news/news',
	};

	const { data } = useFetchAuth<IDashboardSearch>({
		endpoint: `${mappingsUrl[type]}/?${mappingsSearch[type]}=${debouncedSearch}`,
		skip: debouncedSearch === '',
		options: {
			method: 'GET',
		},
	});

	console.log(data);

	const handleSuggestionClick = (id: number) => {
		router.push(`/dashboard/${type === 'customers' ? 'users' : type}/${id}`);
		setQuery('');
		setOpen(true);
	};

	return (
		<div className={`${styles.searchContainer} ${className}`}>
			{query && (
				<>
					<button className={styles.searchButton}>
						<Search />
					</button>
					<button
						className={styles.closeButton}
						onClick={() => {
							setOpen(true);
							setQuery('');
						}}
					>
						<X />
					</button>
				</>
			)}
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className={`${styles.searchInput} ${robotoCondensed.className} ${query ? styles.searchInputWithQuery : ''}`}
				placeholder="Search"
			/>
			{/*eslint-disable*/}
			{data && debouncedSearch.length > 0 && (
				<div
					className={`${styles.suggestionsWrapper} ${robotoCondensed.className}`}
				>
					<div className={styles.suggestionsWrapperScrollBar}>
						<div className={styles.suggestionsContainer}>
							{data?.items?.length > 0 ? (
								data.items.map((suggestion, index) => (
									<div
										key={index}
										className={styles.suggestionItem}
										onClick={() => handleSuggestionClick(suggestion.id)}
									>
										{suggestion.name ||
											suggestion.first_name ||
											suggestion.title ||
											suggestion.id}
									</div>
								))
							) : (
								<div className={styles.notFound}>No data found</div>
							)}
						</div>
					</div>
				</div>
			)}
			{/*	eslint-enable*/}
		</div>
	);
}

export default DashboardSearchBar;
