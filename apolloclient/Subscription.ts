import { PubSub } from "graphql-subscriptions";

export enum Sub {
  ADD_CHAT = "ADD_CHAT",
  REMOVE_CHAT = "REMOVE_CHAT",

  ADD_MESSAGE = "ADD_MESSAGE",
  CHANGE_MESSAGE = "CHANGE_MESSAGE",
  REWOVE_MESSAGE = "REWOVE_MESSAGE",
}

const subscribe = (pubsub: PubSub, sub: Sub) => ({
  subscribe: () => pubsub.asyncIterator(sub),
});

export const Subscription = (pubsub: PubSub) => ({
  AddChat: subscribe(pubsub, Sub.ADD_CHAT),
  RemoveChat: subscribe(pubsub, Sub.REMOVE_CHAT),
  AddMessage: subscribe(pubsub, Sub.ADD_MESSAGE),
  ChangeMessage: subscribe(pubsub, Sub.CHANGE_MESSAGE),
  RemoveMessage: subscribe(pubsub, Sub.REWOVE_MESSAGE),
});
