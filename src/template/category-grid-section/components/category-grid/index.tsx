'use client';

import useIsMobile from '@/hooks/useIsMobile';
import MobileCategoryGrid from '../mobile-category-grid';
import DesktopCategoryGrid from '../desktop-category-grid';

interface IProps {
	categories: ICategory[];
}

export default function CategoryGrid({ categories }: IProps) {
	const isMobile = useIsMobile(992);

	return (
		<>
			{isMobile ? (
				<MobileCategoryGrid categories={categories} />
			) : (
				<DesktopCategoryGrid categories={categories} />
			)}
		</>
	);
}
