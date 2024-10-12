import ContentBlock from '@/components/ContentBlock/ContentBlock';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './page.module.scss';

const data = {
	sections: [
		{
			headline: 'Terms of use',
		},
		{
			title: 'Introduction',
			paragraphs: [
				'Welcome to Hophopshop, an online store. These Terms of Use ("Terms") govern your use of our website and services. By accessing or using HopHopShop at HopHopShop , you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.',
			],
			listItems: [],
			listType: '',
		},
		{
			title: 'Definitions',
			listItems: [
				'Website" refers to Hophopshop, including all webpages, content, and services available at HopHopShop',
				'"We", "us", and "our" refer to Hophopshop, the owner and operator of the Website.',
				'"You" and "your" refer to you, the user or customer of our Website and services.',
			],
			listType: 'ul',
		},
		{
			title: 'Use of the Website',
			subTitle: 'Eligibility',
			paragraphs: [
				'You must be at least 16 years old to use our Website. By using the Website, you represent and warrant that you are at least 16 years old.',
			],
			listItems: [],
			listType: 'ul',
		},
		{
			subTitle: 'Account Registration',
			paragraphs: [
				'To access certain features of the Website, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your account password and for any activities or actions under your account.',
			],
			listItems: [],
			listType: 'ul',
		},
		{
			subTitle: 'Prohibited Activities',
			paragraphs: [
				'You agree not to engage in any of the following prohibited activities:',
			],
			listItems: [
				'Violating any applicable laws or regulations.',
				'Infringing on our intellectual property rights or the rights of others.',
				'Using the Website to distribute spam or unsolicited messages.',
				'Uploading or transmitting viruses or other harmful code.',
				'Engaging in any activity that disrupts or interferes with the Website’s operation.',
			],
			listType: 'ul',
		},
		{
			title: 'Orders and Payments',
			subTitle: 'Order Acceptance',
			paragraphs: [
				'All orders placed through our Website are subject to acceptance by us. We reserve the right to refuse or cancel any order for any reason, including availability of products, errors in the description or price of the product, or other reasons.',
			],
			listItems: [],
			listType: 'ul',
		},
		{
			subTitle: 'Pricing and Payment',
			paragraphs: [
				'All prices are listed in United States Dollar ($USD) and are subject to change without notice. Payments must be made through the methods specified on the Website. You agree to pay all charges incurred by you or on your behalf through the Website, including any applicable taxes.',
			],
		},
		{
			subTitle: 'Shipping and Delivery',
			paragraphs: [
				'We will make reasonable efforts to ensure that your order is shipped and delivered promptly. Shipping and delivery times are estimates and are not guaranteed. We are not responsible for any delays or damages during shipping.',
			],
		},
		{
			title: 'Returns and Refunds',
			subTitle: 'Return Policy',
			paragraphs: [
				'At Hophopshop, we want you to be completely satisfied with your purchase. If for any reason you are not satisfied, you may return most items within 14 days of delivery for a full refund or exchange, subject to the following conditions:',
			],
			listItems: [
				'Eligibility: Items must be in their original condition, unused, and in their original packaging. Some products, such as perishable goods, custom-made items, and intimate or sanitary goods, are not eligible for return.',
				'Proof of Purchase: A receipt or proof of purchase is required for all returns.',
				'Return Process: To initiate a return, please contact our customer service at hophopshopme@gmail.com with your order number and details about the product you would like to return. We will provide you with instructions on how to proceed with your return.',
				'Shipping Costs: Unless the return is due to our error (e.g., you received an incorrect or defective item), you will be responsible for all shipping costs associated with the return. Shipping costs are non-refundable.',
				'Refunds: Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be applied to your original method of payment within a certain amount of days, depending on your card issuer policies.',
			],
		},
		{
			subTitle: 'Refunds',
			paragraphs: [
				'Refunds will be processed according to our return policy. We reserve the right to refuse a refund if the return does not comply with our policy.',
			],
		},
		{
			title: 'Intellectual Property',
			subTitle: 'Ownership',
			paragraphs: [
				'All content on the Website, including text, graphics, logos, images, and software, is the property of Hophopshop or its licensors and is protected by intellectual property laws.',
			],
		},
		{
			subTitle: 'Limited License',
			paragraphs: [
				'You are granted a limited, non-exclusive, non-transferable license to access and use the Website for your personal use. You may not reproduce, distribute, modify, or create derivative works from any content on the Website without our prior written consent.',
			],
		},
		{
			title: 'Disclaimer of Warranties',
			paragraphs: [
				'The Website and all content, products, and services provided through it are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
			],
		},
		{
			title: 'Limitation of Liability',
			paragraphs: [
				'To the fullest extent permitted by law, Hophopshop shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the Website; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; (c) any interruption or cessation of transmission to or from the Website; (d) any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Website by any third party; (e) any errors or omissions in any content; and (f) any defamatory, offensive, or illegal conduct of any third party.',
			],
		},
		{
			title: 'Indemnification',
			paragraphs: [
				'You agree to indemnify, defend, and hold harmless Hophopshop, its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys fees) arising from your use of the Website or your violation of these Terms.',
			],
		},
		{
			title: 'Governing Law',
			paragraphs: [
				'These Terms and your use of the Website shall be governed by and construed in accordance with the laws of United States of America, without regard to its conflict of law principles.',
			],
		},
		{
			title: 'Changes to the Terms',
			paragraphs: [
				'We reserve the right to modify or update these Terms at any time. Any changes will be effective immediately upon posting on the Website. Your continued use of the Website following the posting of revised Terms constitutes your acceptance of the changes.',
			],
		},
		{
			title: 'Contact Information',
			paragraphs: [
				'If you have any questions about these Terms, please contact us at: hophopshopme@gmail.com',
			],
		},
	],
};

export default function TermsOfUse() {
	return (
		<>
			<div className={`${styles.wrapper} ${robotoCondensed.className}`}>
				{data.sections.map((section, index) => (
					<ContentBlock
						key={index}
						headline={section.headline}
						title={section.title}
						subTitle={section.subTitle}
						paragraphs={section.paragraphs}
						listItems={section.listItems}
						listType={section.listType as 'ul' | 'ol'}
					/>
				))}
			</div>
		</>
	);
}
