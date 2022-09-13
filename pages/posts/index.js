import App from '../../components/app'
import Head from 'next/head'
import PostList, {
	ALL_POSTS_QUERY,
	allPostsQueryVars
} from '../../components/postList'
import { initializeApollo, addApolloState } from '../../src/lib/apollo-client'
import { dateStringToRelative } from '../../lib/utils'
import {CardLink} from '../../components/card'


export default function IndexPage({ convertedPosts, postsConnection }) {
	return (
		<App>
			<Head>
				<title>ぷるまんのブログ</title>
			</Head>
			<PostList 
				convertedPosts={convertedPosts}
				postsConnection={postsConnection}
			/>
		</App>
	)
}

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	const data = await apolloClient.query({
		query: ALL_POSTS_QUERY,
		variables: allPostsQueryVars,
	})
	const { posts, postsConnection } = data.data;

	
	const convertedPosts = posts.map((post) => {
		return {
			key: post.id,
			href: `/posts/${post.id}`,
			title: post.title,
			information: dateStringToRelative(post.createdAt),
			content: post.content.substr(0,200)
		};
	});

	return addApolloState(apolloClient, {
		props: { convertedPosts, postsConnection },
		revalidate: 10,
	})
}
