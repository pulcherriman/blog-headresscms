import App from '../../components/app'
import Head from 'next/head'
import PostList, {
	ALL_POSTS_QUERY,
	allPostsQueryVars
} from '../../components/postList'
import { initializeApollo, addApolloState } from '../../src/lib/apollo-client'


const IndexPage = () => (
	<App>
		<Head>
			<title>ぷるまんのブログ</title>
		</Head>
		<PostList />
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
