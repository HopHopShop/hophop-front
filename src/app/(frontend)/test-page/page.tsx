import OrderDetailsPictures from '@/components/OrderDetailsPictures/OrderDetailsPictures';
import SectionContainer from '@/components/SectionContainer/SectionContainer';

export default async function TestPage() {
	return (
		<section>
			<SectionContainer>
				<OrderDetailsPictures />
			</SectionContainer>
		</section>
	);
}
