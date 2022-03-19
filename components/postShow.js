import { gql, useQuery, NetworkStatus } from '@apollo/client'
import Link from 'next/link';
import ErrorMessage from './errorMessage'

const SHOW_POST_QUERY = gql`
query GetPostById($id: ID!) {
	post(where: {id: $id}) {
		id
		title
		content
	}
}
`;

export default function PostShow({ id }) {
	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		SHOW_POST_QUERY,
		{
			variables: {
				id: id
			},
			notifyOnNetworkStatusChange: true,
		}
	)
	if (error) return <ErrorMessage message="Error loading posts." />
	if (loading) return <div>Loading</div>

	const post = data.post;

	return (
		<section>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
		</section>
	)
}