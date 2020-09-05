import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";
import { schema } from "./schema";
import { IncomingMessage, ServerResponse } from "http";
import { SchemaLink } from "@apollo/client/link/schema";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
const isBrowser = process.browser;
const ssrMode = !isBrowser;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

const { GRAPHQL } = process.env;
const { HOST_WS } = process.env;

const httpLink = new HttpLink({
  uri: `/api${GRAPHQL}`,
  credentials: "include",
});

const SplitHTTPWS = isBrowser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      isBrowser
        ? new WebSocketLink(
            new SubscriptionClient(HOST_WS, { reconnect: true })
          )
        : null,
        
      httpLink
    )
  : httpLink;

const createApolloClient = (
  context?: ResolverContext
): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    ssrMode,
    link: ssrMode ? new SchemaLink({ schema, context }) : SplitHTTPWS,
    cache: new InMemoryCache(),
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
