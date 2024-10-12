import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if the device is mobile based on window width.
 * @param breakpoint - The width breakpoint to consider as mobile. Default is 767px.
 * @returns boolean indicating if the device is mobile.
 */
export default function useIsMobile(breakpoint = 767): boolean {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= breakpoint);
		};

		handleResize(); // Initialize the state

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [breakpoint]);

	return isMobile;
}
