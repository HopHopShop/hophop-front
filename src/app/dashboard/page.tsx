import { MoveUp, ShoppingCart } from 'lucide-react';

import styles from './styles.module.scss';

const data = [
	{
		name: 'Total Orders',
		price: 12355,
		percentage: 55.3,
	},
	{
		name: 'Active Orders',
		price: 12355,
		percentage: 55.3,
	},
	{
		name: 'Completed Orders',
		price: 12355,
		percentage: 55.3,
	},
	{
		name: 'Return Orders',
		price: 12355,
		percentage: 55.3,
	},
];

export default function Dashboard() {
	return (
		<section className={styles.wrapper}>
			<div className={styles.header}>
				<h2 className={styles.title}>Dashboard</h2>
				<div className={styles.header_wrapper}>
					{data.map((item, i) => (
						<DashboardItem
							key={i + item.price}
							price={item.price}
							percentage={item.percentage}
							name={item.name}
						/>
					))}
				</div>
			</div>
			<div className={styles.body}></div>
		</section>
	);
}

interface ItemProps {
	name: string;
	price: number;
	percentage: number;
}

function DashboardItem(props: ItemProps) {
	const { percentage, price, name } = props;
	return (
		<div className={styles.item}>
			<span className={styles.item_title}>{name}</span>
			<div className={styles.item_wrapper}>
				<div className={styles.item_container}>
					<div className={styles.price}>
						<div className={styles.basket}>
							<ShoppingCart />
						</div>
						<span>${price}</span>
					</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.arrow}>
						<MoveUp />
						<span>{percentage}%</span>
					</div>
				</div>
			</div>
		</div>
	);
}
