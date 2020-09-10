import { PubSub } from "graphql-subscriptions";
/* import { MQTTPubSub } from "graphql-mqtt-subscriptions"; */
import { IResolvers } from "apollo-server";
import { User, Chat, Friend, IMessangerAsync, Message } from "./types";

const pubsub = new PubSub();

enum Sub {
  ADD_MESSAGE = "ADD_MESSAGE",
  CHANGE_MESSAGE = "CHANGE_MESSAGE",
  REWOVE_MESSAGE = "REWOVE_MESSAGE",
}

const isString = (obj: any) => typeof obj === "string";

export const resolvers = (
  iMessanger: IMessangerAsync
): IResolvers | IResolvers[] => ({
  Query: {
    User: async (_, { id }, { req }): Promise<User> => iMessanger.User(id, req),
    Users: async (_, { start, end }, { req }): Promise<User[]> =>
      iMessanger.Users(start, end, req),
    Chat: async (_, { chatid }, { req }): Promise<Chat> =>
      iMessanger.Chat(chatid, req),
    Chats: async (_, { start, end }, { req }): Promise<Chat[]> =>
      iMessanger.Chats(start, end, req),
    Friends: async (_, { user_id }, { req }): Promise<Friend[]> =>
      iMessanger.Friends(user_id, req),
  },
  Mutation: {
    SendMessage: async (_, { chatid, text }, { req }): Promise<string> =>
      iMessanger.SendMessage(chatid, text, req).then(async (AddMessage) => {
        if (isString(AddMessage)) return AddMessage as string;

        await pubsub.publish(Sub.ADD_MESSAGE, { AddMessage });
        return "Message send";
      }),
    ChangeMessage: async (
      _,
      { chatid, messageid, text },
      { req }
    ): Promise<string> =>
      iMessanger
        .ChangeMessage(chatid, messageid, text, req)
        .then(async (ChangeMessage) => {
          if (isString(ChangeMessage)) return ChangeMessage as string;

          await pubsub.publish(Sub.CHANGE_MESSAGE, { ChangeMessage });
          return "Message change";
        }),
    RemoveMessage: async (_, { chatid, messageid }, { req }): Promise<string> =>
      iMessanger
        .RemoveMessage(chatid, messageid, req)
        .then(async (mes: string) => {
          if (mes == "Message remove")
            await pubsub.publish(Sub.REWOVE_MESSAGE, {
              RemoveMessage: { _id: messageid } as Message,
            });
          return mes;
        }),
  },
  Subscription: {
    AddMessage: {
      subscribe: () => pubsub.asyncIterator(Sub.ADD_MESSAGE),
    },
    ChangeMessage: {
      subscribe: () => pubsub.asyncIterator(Sub.CHANGE_MESSAGE),
    },
    RemoveMessage: {
      subscribe: () => pubsub.asyncIterator(Sub.REWOVE_MESSAGE),
    },
  },
});
