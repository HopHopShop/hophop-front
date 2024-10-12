'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { forwardRef, Ref, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './SearchBar.module.scss';

interface SearchBarProps {
	handleSearchButton: (isShow: boolean) => void;
}

function SearchBar(props: SearchBarProps, ref: Ref<HTMLDivElement>) {
	const { handleSearchButton } = props;
	const [query, setQuery] = useState('');
	const debouncedSearch = useDebounce(query.toLowerCase(), 500);
	const router = useRouter();

	const { error, data } = useFetch<IResponse<IProduct>>({
		endpoint: `shop/products/?name=${debouncedSearch}`,
		skip: debouncedSearch === '',
	});

	const handleSuggestionClick = (id: number) => {
		router.push(`/product/${id}`);
		handleSearchButton(false);
	};

	if (error) {
		console.error('Error fetching search data:', error);
	}

	return (
		<div ref={ref} className={styles.searchContainer}>
			{query && (
				<>
					<button className={styles.searchButton}>
						<Search />
					</button>
					<button
						className={styles.closeButton}
						onClick={() => handleSearchButton(false)}
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
			{data && debouncedSearch.length > 0 && (
				<div
					className={`${styles.suggestionsWrapper} ${robotoCondensed.className}`}
				>
					<div className={styles.suggestionsWrapperScrollBar}>
						<div className={styles.suggestionsContainer}>
							{data.items.length > 0 ? (
								data.items.map((suggestion, index) => (
									<div
										key={index}
										className={styles.suggestionItem}
										onClick={() => handleSuggestionClick(suggestion.id)}
									>
										{suggestion.name}
									</div>
								))
							) : (
								<div className={styles.notFound}>No data found</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default forwardRef(SearchBar);
