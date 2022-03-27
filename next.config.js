/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */

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

module.exports = config