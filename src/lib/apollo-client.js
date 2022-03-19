import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { ApolloLink } from "@apollo/client";
import { onError } from "apollo-link-error";

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

function createIsomorphLink() {
	// httpLink
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_API_ORIGIN, // Server URL (must be absolute)
		credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
	});
	// errorLink
	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors)
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(
			`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
		if (networkError) console.log(`[Network error]: ${networkError}`);
	});
	return ApolloLink.from([errorLink, httpLink]);
}

function createInMemoryCache() {
	const cache = new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					posts: {
						keyArgs: false,
						merge(existing, incoming, { readField }) {
							const merged = { ...existing };
							incoming.forEach(item => {
								merged[readField("id", item)] = item;
							});
							return merged;
						},
						read(existing) {
							return existing && Object.values(existing);
						},
					}
				},
			},
		},
	});
	if (typeof window !== 'undefined') {
		return cache.restore(window.__APOLLO_STATE__);
	}
	return cache;
}

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: createIsomorphLink(),
		cache: createInMemoryCache(),
		ssrForceFetchDelay: 100,
		defaultOptions: {
			watchQuery: {
			 	fetchPolicy: 'cache-and-network'
			},
		},
	})
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient()

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract()

		// Merge the initialState from getStaticProps/getServerSideProps in the existing cache
		const data = merge(existingCache, initialState, {
			// combine arrays using object equality (like in sets)
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter((d) =>
					sourceArray.every((s) => !isEqual(d, s))
				),
			],
		})

		// Restore the cache with the merged data
		_apolloClient.cache.restore(data)
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient

	return _apolloClient
}

export function addApolloState(client, pageProps) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
	}

	return pageProps
}

export function useApollo(pageProps) {
	const state = pageProps[APOLLO_STATE_PROP_NAME]
	const store = useMemo(() => initializeApollo(state), [state])
	return store
}