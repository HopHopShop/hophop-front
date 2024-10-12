'use client';
import { Search } from 'lucide-react';
import { forwardRef, Ref } from 'react';

import SearchBar from '@/components/SearchBar/SearchBar';

import styles from './SearchBarWrapper.module.scss';

export interface ISearchBarWrapper {
	isShow: boolean;
	setIsShow: (isShow: boolean) => void;
}

function SearchBarWrapper(props: ISearchBarWrapper, ref: Ref<HTMLDivElement>) {
	const { setIsShow, isShow } = props;
	return (
		<>
			{!isShow && (
				<button onClick={() => setIsShow(true)}>
					<Search className={styles.icons_item} />
				</button>
			)}
			{isShow && <SearchBar handleSearchButton={setIsShow} ref={ref} />}
		</>
	);
}

export default forwardRef(SearchBarWrapper);
