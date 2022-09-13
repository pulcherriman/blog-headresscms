import { gql, useQuery, NetworkStatus } from '@apollo/client'
import ErrorMessage from './errorMessage'
import Loading from './loading'
import {CardLink} from './card'
import Button from './button'
import { dateStringToRelative } from '../lib/utils'

export const ALL_POSTS_QUERY = gql`
	query GetPostsByAuthor($first: Int!, $skip: Int!) {
		posts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
			id
			title
			content
			createdAt
			updatedAt
		}
		postsConnection {
			aggregate {
				count
			}
		}
	}
`;

const PAR_PAGE = 10;

export const allPostsQueryVars = {
	skip: 0,
	first: PAR_PAGE,
}

const renderItem = function ({ item }) {
	return (
		<CardLink {...item} />
	);
};


export default function PostList({ convertedPosts, postsConnection}) {
	const areMorePosts = convertedPosts.length < postsConnection.aggregate.count;

	const loadMorePosts = () => {
		fetchMore({
			variables: {
				skip: convertedPosts.length,
			}
		})
	};

	return (
		<section>
			<ul style={{ "padding-left" : "0px" }}>
				{convertedPosts.map((item) => renderItem({ item }))}
			</ul>

			{areMorePosts && (
				<Button onClick={loadMorePosts} disabled={loadingMorePosts}>
					{loadingMorePosts ? '読み込み中...' : 'もっと見る'}
				</Button>
			)}
		</section>
	);
}