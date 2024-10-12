'use client';

import React, { useEffect, useState } from 'react';

import style from './Timer.module.scss';

interface CountdownProps {
	targetDate: Date;
}

export default function Timer() {
	const calculateTimeLeft = () => {
		const targetDate = new Date('2024-07-11T00:00:00');
		const difference = targetDate.getTime() - new Date().getTime();
		let timeLeft = {
			days: '00',
			hours: '00',
			minutes: '00',
		};

		if (difference >= 0) {
			const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
			const minutesLeft = Math.floor((difference / 1000 / 60) % 60);
			timeLeft = {
				days: daysLeft < 10 ? `0${daysLeft}` : `${daysLeft}`,
				hours: hoursLeft < 10 ? `0${hoursLeft}` : `${hoursLeft}`,
				minutes: minutesLeft < 10 ? `0${minutesLeft}` : `${minutesLeft}`,
			};

			return timeLeft;
		}
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 60000);

		return () => clearTimeout(timer);
	});

	return (
		<div className={style.timer}>
			<div className={style.digitswrapper}>
				<span className={style.digits}>{timeLeft?.days}</span>
				<span className={style.letters}>days</span>
			</div>
			<div className={style.digitswrapper}>
				<span className={style.digits}>{timeLeft?.hours}</span>
				<span className={style.letters}>hours</span>
			</div>
			<div className={style.digitswrapper}>
				<span className={style.digits}>{timeLeft?.minutes}</span>
				<span className={style.letters}>mins</span>
			</div>
		</div>
	);
}
