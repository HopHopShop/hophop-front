import { X } from 'lucide-react';
import Image from 'next/image';

import AddToFavoriteButton from '@/components/AddToFavoriteButton/AddToFavoriteButton';
import ProductIdActions from '@/components/ProductIdActions/ProductIdActions';
import { robotoCondensed } from '@/styles/fonts/fonts';
import ProductIdDesktopSwiper from '@/template/ProductIdDesktopSwiper/ProductIdDesktopSwiper';
import ProductIdMobileSwiper from '@/template/ProductIdMobileSwiper/ProductIdMobileSwiper';
import { getImages } from '@/utils/typeGuards';

import styles from './styles.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

export interface InterfacePrePublishProduct {
	product: IProduct | null;
	setShowPrePublish: (showPrePublish: boolean) => void;
}

export default function PrePublishProduct(props: InterfacePrePublishProduct) {
	const { product, setShowPrePublish } = props;
	if (product === null) return null;
	const imagesArr = getImages(product.images);
	return (
		<div className={styles.publishContainer}>
			<div className={styles.container}>
				<div className={styles.headWrapper}>
					<h3>Pre-publish view</h3>
					<button
						onClick={() => {
							setShowPrePublish(false);
						}}
					>
						<X color="#192C32" />
					</button>
				</div>
				<section className={styles.wrapper}>
					<div className={styles.productPage}>
						{imagesArr.length ? (
							<>
								<ProductIdMobileSwiper
									isPreview={true}
									className={styles.showMobileSwiper}
									product={product}
								/>
								<ProductIdDesktopSwiper
									className={styles.hideDesktopSwiper}
									product={product}
								/>
							</>
						) : (
							<div className={styles.defaultImageWrapper}>
								<div className={styles.mobileActions}>
									<AddToFavoriteButton isPreview={true} product={product} />
								</div>
								<Image
									src="/default-image.png"
									width={500}
									height={500}
									alt={product.name}
									className={styles.img}
								/>
							</div>
						)}
						<div className={styles.productPage__description}>
							<div className={styles.info}>
								<div className={styles.info__wrapper}>
									<div className={styles.info__title}>
										<h1 className={styles.title}>{product?.name}</h1>
										<span
											className={`${styles.subTitle} ${robotoCondensed.className}`}
										>
											{product?.category?.name}
										</span>
									</div>
									<span className={styles.price}>${product?.price}</span>
								</div>
								<p className={`${styles.desc} ${robotoCondensed.className}`}>
									{product?.description}
								</p>
							</div>
							<ProductIdActions
								isPreview={true}
								className={styles.hideLikeButton}
								product={product}
							/>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
