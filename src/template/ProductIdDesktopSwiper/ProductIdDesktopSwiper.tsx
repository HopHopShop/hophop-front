'use client';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getImages } from '@/utils/typeGuards';

import styles from './styles.module.scss';

interface IProps {
	product: IProduct;
	className?: string;
}

export default function ProductIdDesktopSwiper(props: IProps) {
	const { product, className = '' } = props;

	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
	const swiperRef = useRef<SwiperClass | null>(null);

	const handlePrev = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev();
		}
	};
	const handleNext = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext();
		}
	};

	return (
		<div className={`${styles.swiperWrapper} ${className}`}>
			<div className={styles.swiperContainer}>
				<button
					onClick={handleNext}
					className={`${styles.button} ${styles.button_right}`}
				>
					<ChevronLeft className={styles.iconRotate} />
				</button>
				<Swiper
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					loop={true}
					spaceBetween={10}
					navigation={false}
					thumbs={{ swiper: thumbsSwiper }}
					modules={[FreeMode, Navigation, Thumbs]}
					className={styles.mySwiper2}
				>
					{getImages(product?.images).map((img, key) => (
						<SwiperSlide key={key} className={styles.swiperSlide}>
							<Image width={610} height={700} src={img.image} alt="" />
						</SwiperSlide>
					))}
				</Swiper>
				<button
					onClick={handlePrev}
					className={` ${styles.button} ${styles.button_left}`}
				>
					<ChevronLeft />
				</button>
			</div>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop={true}
				spaceBetween={20}
				slidesPerView={2}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className={styles.mySwiper}
				direction={'vertical'}
			>
				{getImages(product?.images).map((img, key) => (
					<SwiperSlide key={key} className={styles.swiperSlide2}>
						<Image width={220} height={320} src={img.image} alt="" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
