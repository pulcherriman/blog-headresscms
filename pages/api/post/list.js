import App from '../../components/app'
import Header from '../../components/header'
import PostShow, {
	SHOW_POST_QUERY
} from '../../components/postShow'
import Footer from '../../components/footer'
import { initializeApollo, addApolloState } from '../../src/lib/apollo-client'
import Link from 'next/link'
import { gql, query, useQuery, NetworkStatus } from '@apollo/client'

const query = gql`
	query GetPostIdList {
		posts {
			id
		}
	}
`;

export default function postListApi() {
	const apolloClient = initializeApollo();
	apolloClient.query({
		query: query
	});
}
