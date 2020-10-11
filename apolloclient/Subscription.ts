import { PubSub } from "graphql-subscriptions";

export enum Sub {
  ADD_CHAT = "ADD_CHAT",
  DELETE_CHAT = "DELETE_CHAT",

  ADD_MESSAGE = "ADD_MESSAGE",
  SWAP_MESSAGE = "SWAP_MESSAGE",
  DELETE_MESSAGE = "DELETE_MESSAGE",
}

const subscribe = (pubsub: PubSub, sub: Sub) => ({
  subscribe: () => pubsub.asyncIterator(sub),
});

export const Subscription = (pubsub: PubSub) => ({
  AddChat: subscribe(pubsub, Sub.ADD_CHAT),
  DeleteChat: subscribe(pubsub, Sub.DELETE_CHAT),

  AddMessage: subscribe(pubsub, Sub.ADD_MESSAGE),
  SwapMessage: subscribe(pubsub, Sub.SWAP_MESSAGE),
  DeleteMessage: subscribe(pubsub, Sub.DELETE_MESSAGE),
});
