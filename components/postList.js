import { gql, useQuery, NetworkStatus } from '@apollo/client'
import Link from 'next/link';
import ErrorMessage from './errorMessage'
import Loading from './loading'
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable } from 'react-native-web';
import {CardLink} from './Card'
import Button from './Button'

export const ALL_POSTS_QUERY = gql`
	query GetPostsByAuthor($first: Int!, $skip: Int!) {
		posts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
			id
			title
			content
			createdAt
			updatedAt
			createdBy {
				name
			}
			author {
				name
			}
		}
		postsConnection {
			aggregate {
				count
			}
		}
	}
`;

const PAR_PAGE = 3;

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

	const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

	if (error) return <ErrorMessage message="Error loading posts." />
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

	const dateStringToRelative = (date) => {
		const dateDiff = (new Date(date)).getDate() - (new Date()).getDate();
		return new Intl.RelativeTimeFormat('ja', {
			numeric: 'auto',
		}).format(dateDiff, "day") + ` (${(new Date(date)).toLocaleString('ja')})`;
	};

	const renderItem = ({ item }) => (
		<CardLink
			href={`/posts/${item.id}`}
			title={item.title}
			information={dateStringToRelative(item.createdAt)}
			content={item.content} />
	);


	return (
		<section>
			<SafeAreaView>
				<FlatList
					data={posts}
					renderItem={renderItem}
					keyExtractor={item => item.id}
				/>
			</SafeAreaView>

			{areMorePosts && (
				<Button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
					{loadingMorePosts ? '読み込み中...' : 'もっと見る'}
				</Button>
			)}
		</section>
	);
}