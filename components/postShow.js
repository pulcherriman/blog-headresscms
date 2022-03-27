import { gql, useQuery, NetworkStatus } from '@apollo/client'
import Head from 'next/head'
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
	if (error) return <ErrorMessage message="記事の読み込みに失敗しました。" />
	if (loading) return <div>Loading</div>

	const post = data.post;

	return (
		<section>
			<Head>
				<title>ぷるブログ - { post.title }</title>
			</Head>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
		</section>
	)
}