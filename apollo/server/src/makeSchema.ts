import { makeExecutableSchema } from 'graphql-tools'
import { AdapterDefault, IMessangerAsync } from '@chat/apollocommon'

import { resolvers } from './Resolvers'
import { typeDefs } from './typeDefs'

export const makeSchema =
  <T>(iMessanger: IMessangerAsync<T> = new AdapterDefault()) =>
    makeExecutableSchema({
      typeDefs,
      resolvers: resolvers(iMessanger),
      resolverValidationOptions: {
        requireResolversForResolveType: true
      }
    });