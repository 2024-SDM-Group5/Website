/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
	reactStrictMode: false,
	assetPrefix: isProd ? 'https://pc214.ee.ntu.edu.tw/website' : undefined,
	basePath: '/website',
};

export default nextConfig;
