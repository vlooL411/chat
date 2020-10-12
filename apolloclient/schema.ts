import MessangerMongoDB from 'base/MessangerMongoDB'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './typeDefs'
import { resolvers } from './resolvers'

export default makeExecutableSchema({
  typeDefs,
  resolvers: resolvers(new MessangerMongoDB()),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
