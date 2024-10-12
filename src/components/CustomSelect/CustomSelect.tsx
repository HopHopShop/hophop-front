'use client';
import styles from './styles.module.scss';
import {
	HTMLAttributes,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useField, useFormikContext } from 'formik';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { ChevronDown } from 'lucide-react';
import Loader from '@/components/Loader/Loader';

interface IProps extends HTMLAttributes<HTMLDivElement> {
	placeholder: string;
	title: string;
	options: Option[];
	name: string;
	disabled?: boolean;
	isLoading?: boolean;
}

interface Option {
	id: string | number;
	name: string;
}

export default function CustomSelect(props: IProps) {
	const {
		disabled = false,
		isLoading = false,
		title,
		placeholder,
		options,
		name,
	} = props;
	const [field, meta] = useField({ name });
	const { setFieldValue, setFieldTouched } = useFormikContext();
	const isValidClass = `${meta.touched && meta.error ? styles.selectError : meta.touched ? styles.selectSuccess : ''}`;
	const [isShow, setIsShow] = useState<boolean>(false);
	const [wasOpened, setWasOpened] = useState<boolean>(false); // Трекінг відкриття
	const ref = useRef<any>(null);

	// Логіка для закриття селекту
	const handleSelectClose = useCallback(() => {
		if (wasOpened && field.value === '') {
			// Якщо селект був відкритий і нічого не вибрано
			setFieldTouched(name, true, true);
		}
		setIsShow(false);
		setWasOpened(false); // Скидаємо статус відкриття
	}, [field.value, name, setFieldTouched, wasOpened]);

	// Функція для обробки кліків поза селектом
	const handleClickOutside = useCallback(
		(event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				if (isShow) {
					// Якщо селект закривається (ззовні)
					handleSelectClose();
				}
			}
		},
		[handleSelectClose, isShow],
	);

	const handleOptionSelect = (option: Option) => {
		setFieldValue(name, option.name);
		setIsShow(false);
		setFieldTouched(name, true, false); // Виставляємо touched при виборі
		setWasOpened(false); // Закриваємо і скидаємо стан відкриття
	};

	// Функція для обробки відкриття і закриття списку
	const handleToggleSelect = () => {
		if (!isShow) {
			// Селект відкривається
			setWasOpened(true);
			setIsShow(true);
		} else {
			// Селект закривається
			handleSelectClose();
		}
	};

	// Додаємо обробник кліку поза елементом один раз
	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [handleClickOutside]);

	return (
		<div
			className={`${styles.selectWrapper} ${disabled || (isLoading && styles.disabled)}`}
		>
			{isLoading && <Loader className={styles.loader} />}
			{title && (
				<span className={`${robotoCondensed.className} ${styles.title}`}>
					{title}
				</span>
			)}
			<div className={styles.selectContainer} ref={ref}>
				<div
					role={'select'}
					className={`${styles.select} ${isValidClass} `}
					onClick={handleToggleSelect}
				>
					{field.value !== '' ? (
						<span className={`${robotoCondensed.className} ${styles.value}`}>
							{field.value}
						</span>
					) : (
						<span className={`${robotoCondensed.className} ${styles.opacity}`}>
							{placeholder}
						</span>
					)}
					<ChevronDown
						className={`${isShow && styles.rotate}`}
						color="#192C32"
					/>
				</div>
				{isShow && (
					<div className={`${styles.optionsWrapper} ${isValidClass}`}>
						<div className={styles.suggestionsWrapperScrollBar}>
							<div className={styles.suggestionsContainer}>
								{options.map((option) => (
									<div
										key={option.id}
										className={`${robotoCondensed.className} ${styles.option} ${field.value === option.name ? styles.active : ''}`}
										onClick={() => handleOptionSelect(option)}
									>
										{option.name}
									</div>
								))}
							</div>
						</div>
					</div>
				)}
				{meta.touched && meta.error && (
					<span className={styles.error}>{meta.error}</span>
				)}
			</div>
		</div>
	);
}
