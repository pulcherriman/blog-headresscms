import { gql, useQuery, NetworkStatus } from '@apollo/client'
import Link from 'next/link';
import ErrorMessage from './errorMessage'

export const ALL_POSTS_QUERY = gql`
	query GetPostsByAuthor($first: Int!, $skip: Int!) {
		posts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
			id
			title
			content
			createdAt
			updatedAt
			createdBy {
				id
			}
			author {
				id
			}
		}
		postsConnection {
			aggregate {
				count
			}
		}
	}
`;

const PAR_PAGE = 1;

export const allPostsQueryVars = {
	skip: 0,
	first: PAR_PAGE,
}

export default function PostList() {
	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		ALL_POSTS_QUERY,
		{
			variables: allPostsQueryVars,
			notifyOnNetworkStatusChange: true
		}
	)


	const loadingMorePosts = networkStatus === NetworkStatus.fetchMore


	if (error) return <ErrorMessage message="Error loading posts." />
	if (loading && !loadingMorePosts) return <div>Loading</div>

	const { posts, postsConnection } = data
	const areMorePosts = posts.length < postsConnection.aggregate.count

	const loadMorePosts = () => {
		fetchMore({
			variables: {
				skip: posts.length,
			}
		})
	}

	return (
		<section>
			<ul>
			{posts.map((post, index) => (
				<li key={post.id}>
					<div>
						<span>{index + 1}. </span>
						<Link href={'/posts/' + post.id}>
						<a>{post.title}</a>
						</Link>
						<p>{post.content}</p>
					</div>
				</li>
			))}
			</ul>

			{areMorePosts && (
				<button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
					{loadingMorePosts ? 'Loading...' : 'Show More'}
				</button>
			)}

			<style jsx>{`
			section {
				padding-bottom: 20px;
			}
			li {
				display: block;
				margin-bottom: 10px;
			}
			div {
				align-items: center;
				display: flex;
			}
			a {
				font-size: 14px;
				margin-right: 10px;
				text-decoration: none;
				padding-bottom: 0;
				border: 0;
			}
			span {
				font-size: 14px;
				margin-right: 5px;
			}
			ul {
				margin: 0;
				padding: 0;
			}
			button:before {
				align-self: center;
				border-style: solid;
				border-width: 6px 4px 0 4px;
				border-color: #ffffff transparent transparent transparent;
				content: '';
				height: 0;
				margin-right: 5px;
				width: 0;
			}
			`}</style>
		</section>
	)
}