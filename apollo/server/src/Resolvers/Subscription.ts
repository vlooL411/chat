import { PubSub } from 'graphql-subscriptions'
import { SubscriptionResolvers } from '@generated/backend'

export enum Sub {
  ADD_CHAT = "ADD_CHAT",
  DELETE_CHAT = "DELETE_CHAT",

  ADD_MESSAGE = "ADD_MESSAGE",
  SWAP_MESSAGE = "SWAP_MESSAGE",
  DELETE_MESSAGE = "DELETE_MESSAGE",
}

export const Subscription = (pubsub: PubSub): SubscriptionResolvers => {
  const subscribe = (sub: Sub) => ({
    subscribe: (): AsyncIterator<any> => pubsub.asyncIterator(sub),
  });

  return {
    AddChat: subscribe(Sub.ADD_CHAT),
    DeleteChat: subscribe(Sub.DELETE_CHAT),

    AddMessage: subscribe(Sub.ADD_MESSAGE),
    SwapMessage: subscribe(Sub.SWAP_MESSAGE),
    DeleteMessage: subscribe(Sub.DELETE_MESSAGE),
  };
};
