/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
	reactStrictMode: false,
	// assetPrefix: isDev ? undefined : 'https://pc214.ee.ntu.edu.tw/website/',
	// basePath: isDev ? '/website' : undefined,
};

export default nextConfig;
