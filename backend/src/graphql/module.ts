import { Module } from '@nestjs/common';
import { GraphQLModule as graphQLModule } from '@nestjs/graphql';

import * as Resolvers from './resolvers';
import * as Scalars from './scalars';
import GraphQLService from './service';

@Module({
	imports: [
		graphQLModule.forRootAsync({ useClass: GraphQLService }),
		...Object.values(Resolvers),
	],
	providers: [...Object.values(Scalars)],
})
export default class GraphQLModule {}
