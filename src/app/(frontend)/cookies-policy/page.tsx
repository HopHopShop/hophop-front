import Container from '@/components/Container/Container';
import ContentBlock from '@/components/ContentBlock/ContentBlock';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './page.module.scss';

const data = {
	sections: [
		{
			headline: 'Cookies Policy',
		},
		{
			title: 'Introduction',
			paragraphs: [
				'Welcome to “HopHopShop” ("we", "us", "our"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Cookies Policy explains what cookies are, how we use them, and how you can manage your preferences regarding their use.',
			],
			listItems: [],
			listType: '',
		},
		{
			title: 'What are Cookies?',
			paragraphs: [
				'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site. Cookies can be "persistent" or "session" cookies.',
			],
			listItems: [
				'<b>Persistent Cookies:</b> These cookies remain on your device for a set period or until you delete them.',
				'<b>Session Cookies:</b> These cookies are temporary and are deleted once you close your browser.',
			],
			listType: 'ul',
		},
		{
			title: 'How We Use Cookies',
			paragraphs: ['We use cookies for a variety of purposes, including:'],
			listItems: [
				'<b>Essential Cookies:</b> These cookies are necessary for the website to function and cannot be switched off in our systems.',
				'<b>Performance Cookies:</b> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
				'<b>Functionality Cookies:</b> These cookies allow our website to remember choices you make and provide enhanced, more personal features.',
				'<b>Targeting/Advertising Cookies:</b> These cookies are used to deliver advertisements that are more relevant to you and your interests.',
			],
			listType: 'ul',
		},
		{
			title: 'Types of Cookies We Use',
			paragraphs: [
				'Here are the specific types of cookies we use on our website:',
			],
			listItems: [
				'<b>Strictly Necessary Cookies:</b> [List names of cookies, purpose, and duration]',
				'<b>Analytics/Performance Cookies:</b> [List names of cookies, purpose, and duration]',
				'<b>Functionality Cookies:</b> [List names of cookies, purpose, and duration]',
				'<b>Advertising/Targeting Cookies:</b> [List names of cookies, purpose, and duration]',
			],
			listType: 'ul',
		},
		{
			title: 'Third-Party Cookies',
			paragraphs: [
				'We may also use third-party cookies from our advertising partners, social media sites, and analytics providers. These cookies are used to integrate with social media, provide advertising tailored to your interests, and gather information for analytics purposes.',
			],
			listItems: [],
			listType: '',
		},
		{
			title: 'Managing Your Cookies Preferences',
			paragraphs: [
				'You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.',
				'To manage your cookies preferences, you can adjust the settings in your browser. Here are the links to the support pages of some common browsers:',
			],
			listItems: [
				'<a href="https://support.google.com/accounts/answer/61416?hl=en&co=GENIE.Platform%3DDesktop">Google Chrome</a>',
				'<a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer">Mozilla Firefox</a>',
				'<a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09">Microsoft Edge</a>',
				'<a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac">Apple Safari</a>',
			],
			listType: 'ul',
		},
		{
			title: 'Changes to This Cookies Policy',
			paragraphs: [
				'We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this Cookies Policy regularly to stay informed about our use of cookies and related technologies.',
			],
			listItems: [],
			listType: '',
		},
		{
			title: 'Contact Us',
			paragraphs: [
				'If you have any questions or concerns about this Cookies Policy or our data practices, please contact us at: <a href="mailto:hophopshopme@gmail.com">hophopshopme@gmail.com</a>',
			],
			listItems: [],
			listType: '',
		},
	],
};

export default function CookiesPolicy() {
	return (
		<>
			<div className={`${styles.wrapper} ${robotoCondensed.className}`}>
				{data.sections.map((section, index) => (
					<ContentBlock
						key={index}
						headline={section.headline}
						title={section.title}
						paragraphs={section.paragraphs}
						listItems={section.listItems}
						listType={section.listType as 'ul' | 'ol'}
					/>
				))}
			</div>
		</>
	);
}
