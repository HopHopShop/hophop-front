import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useField, useFormikContext } from 'formik';
import styles from './styles.module.scss';
import { robotoCondensed } from '@/styles/fonts/fonts';

const libraries: 'places'[] = ['places'];

interface IProps {
	placeholder: string;
	title: string;
	name: string;
	disabled?: boolean;
	isLoading?: boolean;
	initialValue: string;
}

interface Option {
	city: string;
	stateOrRegion: string | null;
	country: string;
}

const AddressesSelect = (props: IProps) => {
	const {
		initialValue,
		disabled = false,
		isLoading = false,
		title,
		...rest
	} = props;
	const [field, meta] = useField(rest);
	const { setFieldValue, setFieldTouched } = useFormikContext();
	const [searchValue, setSearchValue] = useState(initialValue);
	const [options, setOptions] = useState<Option[]>([]);
	const [isShow, setIsShow] = useState<boolean>(false);
	const [wasOpened, setWasOpened] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement | null>(null);
	const isValidClass = `${meta.touched && meta.error ? styles.selectError : meta.touched ? styles.selectSuccess : ''}`;
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: `${process.env.NEXT_PUBLIC_PLACES_KEY}`,
		libraries,
		language: 'en',
	});
	const handleInputChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setSearchValue(event.target.value);
		if (event.target.value.length > 3) {
			const service = new window.google.maps.places.AutocompleteService();
			service.getPlacePredictions(
				{ input: event.target.value },
				(predictions) => {
					if (predictions) {
						const placeService = new window.google.maps.places.PlacesService(
							document.createElement('div'),
						);
						const filteredPlaces: Option[] = [];

						predictions.forEach((prediction) => {
							placeService.getDetails(
								{ placeId: prediction.place_id },
								(placeDetails) => {
									const city = placeDetails?.address_components?.find(
										(component) => component.types.includes('locality'),
									)?.long_name;
									const stateOrRegion = placeDetails?.address_components?.find(
										(component) =>
											component.types.includes('administrative_area_level_1'),
									)?.long_name;
									const country = placeDetails?.address_components?.find(
										(component) => component.types.includes('country'),
									)?.long_name;

									if (city && country) {
										filteredPlaces.push({
											city,
											stateOrRegion: stateOrRegion || null,
											country,
										});
										setOptions([...filteredPlaces]);
									}
								},
							);
						});
					}
				},
			);
		}
	};

	const handleOptionSelect = (option: Option) => {
		setFieldValue(
			'shipping_address',
			`${option.city}, ${option.stateOrRegion || ''}, ${option.country}`,
		);
		setSearchValue(
			`${option.city}, ${option.stateOrRegion || ''}, ${option.country}`,
		);
		setIsShow(false);
		setFieldTouched('shipping_address', true, false);
		setWasOpened(false);
	};

	const handleToggleSelect = () => {
		if (!isShow) {
			setWasOpened(true);
			setIsShow(true);
		} else {
			setIsShow(false);
		}
	};

	const handleClickOutside = useCallback(
		(event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				if (isShow) {
					setIsShow(false);
					setWasOpened(false);
				}
			}
		},
		[isShow],
	);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [handleClickOutside]);

	if (loadError) return <div>Помилка завантаження карти</div>;
	if (!isLoaded) return <div>Завантаження...</div>;

	return (
		<div
			className={`${styles.selectWrapper} ${disabled || (!isLoaded && styles.disabled)}`}
		>
			{title && (
				<span className={`${robotoCondensed.className} ${styles.title}`}>
					{title}
				</span>
			)}
			<div className={styles.selectContainer} ref={ref}>
				<input
					{...field}
					{...rest}
					className={`${styles.select} ${isValidClass}`}
					value={searchValue}
					onChange={handleInputChange}
					onClick={handleToggleSelect}
					disabled={disabled}
				/>
				{isShow && options.length > 1 && (
					<div className={`${styles.optionsWrapper} ${isValidClass}`}>
						<div className={styles.suggestionsWrapperScrollBar}>
							<div className={styles.suggestionsContainer}>
								{options.map((option, index) => (
									<div
										key={index}
										className={`${robotoCondensed.className} ${styles.option}`}
										onClick={() => handleOptionSelect(option)}
									>
										{option.city}, {option.stateOrRegion || ''},{' '}
										{option.country}
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
};

export default AddressesSelect;
