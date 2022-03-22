import App from '../../components/app'
import PostShow from '../../components/postShow'
import { initializeApollo, addApolloState } from '../../src/lib/apollo-client'
import { gql, query, useQuery, NetworkStatus } from '@apollo/client'

const ShowPage = ({ id }) => (
	<App>
		<PostShow id={ id } />
	</App>
)

export async function getStaticPaths() {
	const apolloClient = initializeApollo();
	const query = gql`
		query GetPostIdList {
			posts {
				id
			}
		}
	`;

	const {data, loading, networkStatus} = await apolloClient.query({
		query: query,
	});

	return {
		paths: data.posts.map((post) => `/posts/${post.id}`),
		fallback: "blocking",
	};
}

export async function getStaticProps({ params }) {
	const SHOW_POST_QUERY = gql`
		query GetPostById($id: ID!) {
			post(where: {id: $id}) {
				id
				title
				content
			}
		}
	`;

	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: SHOW_POST_QUERY,
		variables: {
			id: params.id,
		}
	})

	return addApolloState(apolloClient, {
		props: {
			id : params.id
		},
		revalidate: 1,
	})
}

export default ShowPage