import fetch from 'cross-fetch'
import { HttpLink, split } from '@apollo/client'
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import { w3cwebsocket } from 'websocket'
import { WebSocketLink } from '@apollo/client/link/ws'
import { SchemaLink } from '@apollo/client/link/schema'
import { getMainDefinition } from '@apollo/client/utilities'
import { makeSchema } from '@chat/apolloserver'

import { CacheConfig } from './CacheConfig'

//TODO solve the problem of new WebSocketLink Cannot read property 'protocol' of undefined
const { NODE_ENV } = process.env
const isTest = ["test", "storybook"].includes(NODE_ENV);

let apolloClient: ApolloClient<NormalizedCacheObject>;
const isBrowser = typeof window === 'undefined';
const ssrMode = !isBrowser;

const { HOST } = process.env;
const { HOST_GRAPHQL } = process.env;
const { HOST_GRAPHGQLSUB } = process.env;

const httpLink = new HttpLink({
  uri: HOST_GRAPHQL,
  credentials: "include",
  fetch,
});

const wsLink = isTest
  ? null
  : new WebSocketLink({
    uri: HOST_GRAPHGQLSUB,
    reconnect: true,
    webSocketImpl: w3cwebsocket,
    options: {
      connectionParams: {
        headers: {
          "Access-Control-Allow-Origin": HOST,
          "Access-Control-Allow-Credentials": "true",
        },
      },
    },
  });

const SplitHTTPWS = ssrMode ?
  httpLink :
  split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return def.kind == "OperationDefinition" && def.operation == "subscription"
    },
    wsLink,
    httpLink
  )

const cache = new InMemoryCache(CacheConfig);

const schema = makeSchema()
const createApolloClient =
  (context?): ApolloClient<NormalizedCacheObject> =>
    new ApolloClient({
      ssrMode,
      cache,
      link: ssrMode ? new SchemaLink({ schema, context }) : SplitHTTPWS,
    });

export const initializeApollo = (
  initialState = null,
  context?
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  if (initialState) _apolloClient.cache.restore(initialState);
  if (ssrMode) return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo =
  (initialState): ApolloClient<NormalizedCacheObject> =>
    useMemo(() => initializeApollo(initialState), [initialState]);
