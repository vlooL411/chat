import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { Subscription } from "./Subscription";
import { IMessangerAsync } from "./types";
import { IResolvers } from "apollo-server";
import { PubSub } from "graphql-subscriptions";
/* import { MQTTPubSub } from "graphql-mqtt-subscriptions"; */

const pubsub = new PubSub();

export const resolvers = (
  iMessanger: IMessangerAsync
): IResolvers | IResolvers[] => ({
  Query: Query(iMessanger),
  Mutation: Mutation(iMessanger, pubsub),
  Subscription: Subscription(pubsub),
});
