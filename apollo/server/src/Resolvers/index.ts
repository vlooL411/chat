import { PubSub } from 'graphql-subscriptions'
import { Resolvers } from '@generated/backend'
import { IMessangerAsync } from '@chat/apollocommon'

import { Query } from './Query'
import { Mutation } from './Mutation'
import { Subscription } from './Subscription'

/* import { MQTTPubSub } from "graphql-mqtt-subscriptions"; */

const pubsub = new PubSub();

export const resolvers = <T>(iMessanger: IMessangerAsync<T>): Resolvers =>
  ({
    Query: Query(iMessanger),
    Mutation: Mutation(iMessanger, pubsub),
    Subscription: Subscription(pubsub),
  });
