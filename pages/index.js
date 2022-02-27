import App from '../components/app'
import Header from '../components/header'
import PostList, {
	ALL_POSTS_QUERY,
	allPostsQueryVars
} from '../components/postList'
import Footer from '../components/footer'

import { initializeApollo, addApolloState } from '../src/lib/apollo-client'


const IndexPage = () => (
	<App>
		<Header />
		<PostList />
		<Footer />
	</App>
)

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: ALL_POSTS_QUERY,
		variables: allPostsQueryVars,
	})
	
	return addApolloState(apolloClient, {
		props: {},
		revalidate: 1,
	})
}

export default IndexPage