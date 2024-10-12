'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AccountForm from '@/template/AccountForm/AccountForm';
import OrdersForm from '@/template/OrdersForm/OrdersForm';

import styles from './styles.module.scss';

export interface IProps {
	query: string | null;
}

type FormType = 'account' | 'orders';

export default function AccountTemplate(props: IProps) {
	const { query } = props;
	const router = useRouter();

	const handleButtonClick = (form: FormType) => {
		router.push(`/account/${form}`);
	};

	useEffect(() => {
		if (query !== 'account' && query !== 'orders') {
			router.push('/account/account');
		}
	}, [query, router]);

	return (
		<div className={styles.pageWrp}>
			<div className={styles.buttonWrp}>
				<button
					className={`${styles.button}  ${query === 'orders' ? styles.active : ''}`}
					onClick={() => handleButtonClick('orders')}
				>
					Orders
				</button>
				<button
					className={`${styles.button}  ${query === 'account' ? styles.active : ''}`}
					onClick={() => handleButtonClick('account')}
				>
					Account
				</button>
			</div>
			<h1 className={styles.title}>
				{query === 'account' ? 'Account' : 'Orders History'}
			</h1>
			{query === 'account' ? <AccountForm /> : <OrdersForm />}
		</div>
	);
}
