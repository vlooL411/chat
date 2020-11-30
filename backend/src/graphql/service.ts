import { PubSub } from 'graphql-subscriptions';
import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { join } from 'path';

import Definitions from './scalars/definitions';

const pubsub = new PubSub();

@Injectable()
export default class GraphQLService implements GqlOptionsFactory {
	createGqlOptions(): GqlModuleOptions | Promise<GqlModuleOptions> {
		const { NODE_ENV } = process.env;
		const isProd = NODE_ENV === 'production';

		const { NEXTAUTH_URL_CALLBACK: origin } = process.env;

		return {
			typePaths: ['./src/**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql/index.ts'),
				...Definitions,
			},
			context: ({ req, res }) => ({ headers: req?.headers, res, pubsub }),
			cors: {
				credentials: true,
				origin,
			},
			bodyParserConfig: { limit: '50mb' },
			resolverValidationOptions: {
				requireResolversForResolveType: false,
			},
			introspection: true,
			playground: !isProd && {
				settings: {
					'request.credentials': 'include',
				},
			},
			tracing: !isProd,
			// cacheControl: isProd && {
			//     defaultMaxAge: 5,
			//     stripFormattedExtensions: false,
			//     calculateHttpHeaders: false
			// },
			installSubscriptionHandlers: true,
			subscriptions: {
				keepAlive: 1000,
				onConnect: async (connectionParams, webSocket, context) =>
					!isProd &&
					Logger.debug('🔗  Connected to websocket GraphQL'),
				onDisconnect: async (webSocket, context) =>
					!isProd &&
					Logger.debug('❌  Disconnected to websocket GraphQL'),
			},
		};
	}
}