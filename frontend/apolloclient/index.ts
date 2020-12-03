import { NextApiRequest } from 'next';
import { WebSocketLink } from '@apollo/client/link/ws';
import { HttpLink, split } from '@apollo/client';
import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';
import { Authentication, TokenType } from '@frontend/types';
import { onError } from '@apollo/client/link/error';
import { w3cwebsocket } from 'websocket';
import { getMainDefinition } from '@apollo/client/utilities';

import RefreshToken from './RefreshToken';
import { CacheConfig } from './CacheConfig';

let apolloClient: ApolloClient<NormalizedCacheObject>;
const isBrowser = typeof window === 'undefined';
const isSSR_Mode = !isBrowser;

const { HOST } = process.env;
const { HOST_GRAPHQL } = process.env;
const { HOST_GRAPHGQLSUB } = process.env;

const httpLink = new HttpLink({
	uri: HOST_GRAPHQL,
	credentials: 'include',
	fetch,
});

const wsLink: WebSocketLink = isSSR_Mode
	? null
	: new WebSocketLink({
			uri: HOST_GRAPHGQLSUB ?? 'ws:://localhost:4000/graphql',
			reconnect: true,
			webSocketImpl: w3cwebsocket,
			options: {
				connectionParams: {
					headers: {
						'Access-Control-Allow-Origin': HOST,
						'Access-Control-Allow-Credentials': 'true',
					},
				},
			},
	  });

const SplitHTTPWS = isSSR_Mode
	? httpLink
	: split(
			({ query }) => {
				const def = getMainDefinition(query);
				return (
					def.kind == 'OperationDefinition' &&
					def.operation == 'subscription'
				);
			},
			wsLink,
			httpLink,
	  );

const getAuthorization = (): Authentication | null => {
	const auth = localStorage.getItem(TokenType.Authentication);
	if (!auth) return null;

	try {
		return JSON.parse(auth);
	} catch (e) {
		localStorage.clear();
		throw e;
	}
};

const authLink = setContext((_, req: NextApiRequest) => {
	const headers = { ...req?.headers };

	const authentication = getAuthorization();
	headers[TokenType.Authentication] = authentication?.accessToken;

	return { headers };
});

const linkError = onError(({ graphQLErrors, operation, forward }) => {
	if (graphQLErrors)
		for (const { extensions } of graphQLErrors) {
			if (extensions?.exception?.status != 401) continue;

			const authentication = getAuthorization();
			const refreshToken = authentication?.refreshToken;

			if (!refreshToken) {
				localStorage.clear();
				return;
			}

			return RefreshToken(refreshToken, operation, forward);
		}
});

const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
	new ApolloClient({
		ssrMode: isSSR_Mode,
		cache: new InMemoryCache(CacheConfig),
		link: authLink.concat(linkError).concat(SplitHTTPWS),
	});

export const initializeApollo = (
	initialState = null,
): ApolloClient<NormalizedCacheObject> => {
	const _apolloClient = apolloClient ?? createApolloClient();

	if (initialState) _apolloClient.cache.restore(initialState ?? {});
	if (isSSR_Mode) return _apolloClient;
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
};

export const useApollo = (
	initialState: unknown,
): ApolloClient<NormalizedCacheObject> =>
	useMemo(() => initializeApollo(initialState), [initialState]);
