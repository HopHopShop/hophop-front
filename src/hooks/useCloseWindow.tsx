import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useUnsavedChanges = (shouldBlockNavigation: boolean) => {
	const router = useRouter();
	const [isModalVisible, setModalVisible] = useState(false);
	const [nextPath, setNextPath] = useState<string | null>(null);

	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (shouldBlockNavigation) {
				e.preventDefault();
				e.returnValue = ''; // Стандартне повідомлення браузера
			}
		};

		const handleRouteChange = (url: string) => {
			if (shouldBlockNavigation) {
				setNextPath(url); // Запам'ятовуємо куди юзер хоче перейти
				setModalVisible(true); // Показуємо попап
				// Запобігаємо навігації
				router.replace(window.location.pathname);
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		const handleLinkClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const isLink = target.closest('a');
			if (isLink && shouldBlockNavigation) {
				event.preventDefault(); // Запобігаємо переходу
				handleRouteChange(isLink.getAttribute('href')!); // Викликаємо функцію зміни маршруту
			}
		};

		document.addEventListener('click', handleLinkClick);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			document.removeEventListener('click', handleLinkClick);
		};
	}, [shouldBlockNavigation, router]);

	const confirmNavigation = () => {
		setModalVisible(false);
		if (nextPath) {
			router.push(nextPath); // Переходимо на нову сторінку після підтвердження
			setNextPath(null); // Скидаємо маршрут
		}
	};

	const cancelNavigation = () => {
		setModalVisible(false);
		setNextPath(null); // Скидаємо маршрут
	};

	return {
		isModalVisible,
		confirmNavigation,
		cancelNavigation,
	};
};
