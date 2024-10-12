import { getNewsById } from '@/services/dashboard/news/dashbpard.news.service';
import EditNews from '@/template/editNews/EditNews';
import { notFound } from 'next/navigation';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardNewsId({ params: { id } }: Props) {
	const news = await getNewsById(id);

	if (!news.success) {
		return notFound();
	}
	return <EditNews news={news.data} />;
}
