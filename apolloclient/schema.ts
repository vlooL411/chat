import typeDefs from "./typeDefs";
import { resolvers } from "./resolvers";
import { makeExecutableSchema } from "graphql-tools";
import MessangerMongoDB from "../base/MessangerMongoDB";

export default makeExecutableSchema({
  typeDefs,
  resolvers: resolvers(new MessangerMongoDB()),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
