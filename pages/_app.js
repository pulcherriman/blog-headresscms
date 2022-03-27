import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../src/lib/apollo-client'
import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps)

	return (
		<ApolloProvider client={apolloClient}>
			<Head>
				<meta name="description" content="plcherrim の ブログ" />
				<meta name="google-site-verification" content="Bsx8tHDERBeCX-IuyG1n14Dq8BprmhOm9UlpBUeLA-Y" />
			</Head>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</ApolloProvider>
	)
}