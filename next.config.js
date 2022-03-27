/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})


const config = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/posts',
				permanent: true,
			},
		]
	},
}

module.exports = withBundleAnalyzer(config);