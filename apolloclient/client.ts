import { Chat } from "./types";
import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import schema from "./schema";
import { useMemo } from "react";
import { w3cwebsocket } from "websocket";
import { NextApiRequest, NextApiResponse } from "next";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SchemaLink } from "@apollo/client/link/schema";
import { getMainDefinition } from "@apollo/client/utilities";

let apolloClient: ApolloClient<NormalizedCacheObject>;
const isBrowser = process.browser;
const ssrMode = !isBrowser;

export type ResolverContext = {
  req?: NextApiRequest;
  res?: NextApiResponse;
};

const { HOST } = process.env;
const { HOST_GRAPHQL } = process.env;
const { HOST_GRAPHGQLSUB } = process.env;

const httpLink = new HttpLink({
  uri: HOST_GRAPHQL,
  credentials: "include",
});

const wsLink = new WebSocketLink({
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

const SplitHTTPWS = isBrowser
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind == "OperationDefinition" && def.operation == "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

const cache = new InMemoryCache({
  typePolicies: {
    Chat: {
      fields: {
        messages: {
          merge: (_, incoming) => incoming,
        },
      },
    },
  },
});

const createApolloClient = (
  context?: ResolverContext
): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    ssrMode,
    cache,
    link: ssrMode ? new SchemaLink({ schema, context }) : SplitHTTPWS,
  });

export const initializeApollo = (
  initialState: any = null,
  context?: ResolverContext
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  if (initialState) _apolloClient.cache.restore(initialState);
  if (ssrMode) return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (
  initialState: any
): ApolloClient<NormalizedCacheObject> =>
  useMemo(() => initializeApollo(initialState), [initialState]);
