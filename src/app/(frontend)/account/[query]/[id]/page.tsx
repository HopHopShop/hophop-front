type Props = {
	params: {
		id: string;
	};
};
export default async function AccountOrderPage({ params: { id } }: Props) {
	return <div>{id}</div>;
}
