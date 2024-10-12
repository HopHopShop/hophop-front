'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getDashboardNewsId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';
import { formatDate } from '@/utils/func/formatDate';
import Pagination from '../pagination/Pagination';
import {
	deleteNews,
	getDashboardNews,
	updateNews,
} from '@/services/dashboard/news/dashbpard.news.service';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import useOutside from '@/hooks/useOutside';
import { ChevronUp } from 'lucide-react';
import { typesOfNews } from '@/utils/consts/consts';

interface IProps {
	news: IResponse<INews>;
}

interface IDashboardItem {
	setNewData: (data: IResponse<INews>) => void;
	item: INews;
	setError: (text: string | null) => void;
	setSuccess: (text: string | null) => void;
	setIsLoading: (isLoading: boolean) => void;
}

const PageSize = 10;
export default function DashboardTableNews(props: IProps) {
	const { news } = props;
	const [newData, setNewData] = useState<IResponse<INews>>(news);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const header = [
		{ name: 'News ID' },
		{ name: 'Type' },
		{ name: 'Title' },
		{ name: 'Date' },
		{ name: 'Actions' },
	];
	return (
		<>
			{isLoading && <Loader />}
			{error && <MessageError type={'dashboard'} text={error} />}
			{success && <MessageSuccess type={'dashboard'} text={success} />}

			<div className={styles.wrapper}>
				<div className={styles.container}>
					<ul className={styles.responsiveTable}>
						<li className={`${styles.tableHeader}`}>
							{header.map((item, i) => (
								<div
									key={i}
									className={`${styles.col} ${styles[`col${i + 1}`]}`}
								>
									{item.name}
								</div>
							))}
						</li>
						{newData?.items.map((item, index: number) => (
							<DashboardItem
								item={item}
								setNewData={setNewData}
								key={index}
								setError={setError}
								setIsLoading={setIsLoading}
								setSuccess={setSuccess}
							/>
						))}
					</ul>
				</div>
				{newData?.items_count > PageSize ? (
					<Pagination
						currentPage={newData?.pagination?.current_page}
						totalCount={newData?.items_count}
						pageSize={PageSize}
						num_pages={newData?.pagination.num_pages}
						onPageChange={async (page) => {
							const res = await getDashboardNews(page);
							if (res.success) {
								setNewData(res.data);
							}
						}}
					/>
				) : null}
			</div>
		</>
	);
}

function DashboardItem(props: IDashboardItem) {
	const { setNewData, item, setIsLoading, setSuccess, setError } = props;
	const [isShow, setIsShow] = useState<boolean>(false);
	const { ref, isShow: isVisible, setIsShow: setIsVisible } = useOutside(false);
	return (
		<>
			{isShow && (
				<ModalConfirmation
					reset={async () => {
						setIsLoading(true);
						const res = await deleteNews(item.id);
						if (res.success) {
							const news = await getDashboardNews();
							if (news.success) {
								setIsLoading(false);
								setNewData(news.data);
								setIsShow(false);
								setSuccess(`News ${item.id} was deleted}`);
								await revalidateFunc('/dashboard/news');
								await revalidateFunc('/dashboard/news/[id]', 'page');
								setTimeout(() => {
									setSuccess(null);
								}, 3000);
							}
						} else {
							setIsLoading(false);
							setIsShow(false);
							setError(res.error.message || 'Something went wrong');
							setTimeout(() => {
								setError(null);
							}, 5000);
						}
					}}
					closeModal={() => setIsShow(false)}
					text={'Are you sure?'}
				/>
			)}
			<li
				className={`${styles.tableRow} ${robotoCondensed.className} ${item.type !== 'default' && styles.orange}`}
			>
				<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
				<div className={`${styles.col} ${styles.col2}`}>
					<div ref={ref} className={styles.selectWrapper}>
						<div
							className={`${styles.searchContainer} ${isVisible && styles.visibilityTheHigest}`}
						>
							<div
								onClick={() => setIsVisible(!isVisible)}
								className={`${styles.searchInput} ${robotoCondensed.className}`}
							>
								<span>
									{
										typesOfNews.filter((value) => value.id === item.type)[0]
											.name
									}
								</span>
								<ChevronUp className={`${isVisible && styles.rotate}`} />
							</div>
							{isVisible && (
								<div className={`${styles.suggestionsWrapper}`}>
									{typesOfNews.map((suggestion, index) => {
										if (suggestion.id === item.type) return;
										return (
											<div
												key={index}
												className={styles.suggestionItem}
												onClick={async () => {
													setIsLoading(true);
													const formData = new FormData();
													formData.append('type', suggestion.id);

													const res = await updateNews(item.id, formData);
													if (res.success) {
														const news = await getDashboardNews();
														if (news.success) {
															setNewData(news.data);
															setIsLoading(false);
															setIsVisible(false);
															setSuccess(`News Type ${item.id} was changed!`);
															await revalidateFunc('/dashboard/news');
															await revalidateFunc(
																'/dashboard/news/[id]',
																'page',
															);
															setTimeout(() => {
																setSuccess('');
															}, 2000);
														} else {
															setIsLoading(false);
															setError(
																res.error.message || 'Something Went Wrong',
															);
															setTimeout(() => {
																setError('');
															}, 5000);
														}
													} else {
														setIsLoading(false);
														setError(
															res.error.message || 'Something Went Wrong',
														);
														setTimeout(() => {
															setError('');
														}, 5000);
													}
												}}
											>
												{suggestion.name}
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className={`${styles.col} ${styles.col3}`}>{item.title}</div>
				<div className={`${styles.col} ${styles.col4}`}>
					{formatDate(item.created_at)}
				</div>
				<div className={`${styles.col} ${styles.col5}`}>
					<RemoveButton callback={() => setIsShow(true)} />
					<EditButton callback={() => getDashboardNewsId(item.id)} />
				</div>
			</li>
		</>
	);
}
