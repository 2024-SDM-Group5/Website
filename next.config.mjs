/** @type {import('next').NextConfig} */

const isDev = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

const nextConfig = {
	reactStrictMode: false,
	assetPrefix: isDev ? undefined : 'https://pc214.ee.ntu.edu.tw/website/',
	images: {
		domains: ['picsum.photos', 'myphotos.com', 'storage.googleapis.com'],
	},
};

export default nextConfig;
