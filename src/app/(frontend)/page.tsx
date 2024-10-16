import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Hero from '@/template/Hero/Hero';
import NewArrivals from '@/template/NewArrivals/NewArrivals';
import TopSales from '@/template/TopSales/TopSales';
import CategoryGridSection from '@/template/category-grid-section';

export default function Home() {
	return (
		<>
			<Hero />
			<SectionContainer>
				<div>TEST PIPELINE</div>
			</SectionContainer>
			<NewArrivals />
			<TopSales />
			<CategoryGridSection />
		</>
	);
}
