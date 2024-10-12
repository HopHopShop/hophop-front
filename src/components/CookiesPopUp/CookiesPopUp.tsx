'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { robotoCondensed } from '@/styles/fonts/fonts';

import CloseIcon from './close.svg';
import styles from './CookiesPopUp.module.scss';
import Container from '../Container/Container';

interface CookiesPopUpProps {}

export default function CookiesPopUp(props: CookiesPopUpProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const cookiesAccepted = localStorage.getItem('cookiesAccepted');
		if (!cookiesAccepted) {
			setIsVisible(true);
		}
	}, []);

	const acceptCookies = () => {
		localStorage.setItem('cookiesAccepted', 'true');
		setIsVisible(false);
	};

	if (!isVisible) {
		return null;
	}

	return (
		<div className={styles.popUpWrp}>
			<Container>
				<div className={styles.cookiesPopup}>
					<div className={styles.imgWrp}>
						<Image
							src={'/popUpImg.svg'}
							width={240}
							height={130}
							layout="responsive"
							alt="img"
						/>
					</div>
					<div className={styles.imgWrpMobile}>
						<Image
							src={'/popUpImgMobile.svg'}
							width={108}
							height={154}
							layout="responsive"
							alt="img"
						/>
					</div>
					<div className={styles.text}>
						<div className={styles.mainTextWrp}>
							<h3 className={styles.mainText}>I'm hungry! </h3>
							<span className={styles.mainTextSecondPart}>
								Can I use your cookies?
							</span>
						</div>
						<div className={`${robotoCondensed.className} ${styles.policy}`}>
							<span>
								We use cookies because nothing works without them.By continuing
								to use our site, you're agreeing to{' '}
							</span>
							<Link href={'/cookies-policy'} className={styles.link}>
								our policy.
							</Link>
						</div>
					</div>

					<button className={styles.button} onClick={acceptCookies}>
						<CloseIcon />
					</button>
				</div>
			</Container>
		</div>
	);
}
