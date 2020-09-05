import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import MessangerMongoDB from "../base/MessangerMongoDB";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers(new MessangerMongoDB()),
});
