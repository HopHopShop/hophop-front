/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ['@svgr/webpack'],
		});
		return config;
	}
};

export default nextConfig;
