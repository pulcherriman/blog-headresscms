import { gql, useQuery, NetworkStatus } from '@apollo/client'
import ErrorMessage from './errorMessage'
import Loading from './loading'
import {CardLink} from './card'
import Button from './button'

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


const dateStringToRelative = function (date) {
	const dateObj = new Date(date);
	const dateDiff = parseInt((dateObj - Date.now()) / 1000 / 60 / 60 / 24);

	if (-dateDiff <= 30) {
		const rtf = new Intl.RelativeTimeFormat('ja', {
			numeric: 'auto',
		});
		return rtf.format(dateDiff, "day");
	}

	const formatted = `
		${dateObj.getMonth()+1}月
		${dateObj.getDate()}日 
		${dateObj.getHours()}:
		${dateObj.getSeconds()}
		`.replace(/\n|\r|\t/g, '');
	if (dateObj.getFullYear() !== (new Date()).getFullYear()) {
		return `${dateObj.getFullYear()}年${formatted}`;
	}
	return formatted;
};

const renderItem = function ({ item }) {
	return (
		<CardLink
			key={item.id}
			href={`/posts/${item.id}`}
			title={item.title}
			information={dateStringToRelative(item.createdAt)}
			content = { item.content.substr(0,200) } />
	);
};


export default function PostList() {
	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		ALL_POSTS_QUERY,
		{
			variables: allPostsQueryVars,
			notifyOnNetworkStatusChange: true
		}
	)

	const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

	if (error) return <ErrorMessage message="記事の読み込みに失敗しました。" />
	if (!data && loading && !loadingMorePosts) return <Loading />

	const { posts, postsConnection } = data;
	const areMorePosts = posts.length < postsConnection.aggregate.count;

	const loadMorePosts = () => {
		fetchMore({
			variables: {
				skip: posts.length,
			}
		})
	};

	const items = posts.map((item) => renderItem({ item }));



	return (
		<section>
			<ul style={{ "padding-left" : "0px" }}>
				{items}
			</ul>

			{areMorePosts && (
				<Button onClick={loadMorePosts} disabled={loadingMorePosts}>
					{loadingMorePosts ? '読み込み中...' : 'もっと見る'}
				</Button>
			)}
		</section>
	);
}