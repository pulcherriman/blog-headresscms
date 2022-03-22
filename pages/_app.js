import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../src/lib/apollo-client'
import Header from '../components/header'
import Footer from '../components/footer'

export default function App({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps)

	return (
		<ApolloProvider client={apolloClient}>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</ApolloProvider>
	)
}