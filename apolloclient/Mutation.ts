import { Sub } from "./Subscription";
import { PubSub } from "graphql-subscriptions";
import { Chat, Message, IMessangerAsync } from "@types";

const isString = (obj: any) => typeof obj === "string";

export const Mutation = (iMessanger: IMessangerAsync, pubsub: PubSub) => ({
  InviteChat: async (_, body, { req }): Promise<string> =>
    iMessanger.InviteChat(body, req).then(async (InviteChat) => {
      if (isString(InviteChat)) return InviteChat;

      await pubsub.publish(Sub.ADD_CHAT, {
        AddChat: (InviteChat as any) as Chat,
      });
      return "User joined chat";
    }),
  LeaveChat: async (_, body, { req }): Promise<string> =>
    iMessanger.LeaveChat(body, req).then(async (LeaveChat: Chat | string) => {
      if (isString(LeaveChat)) return LeaveChat as string;

      await pubsub.publish(Sub.REMOVE_CHAT, { RemoveChat: LeaveChat });
      return "User leave chat";
    }),
  CreateChat: async (_, body, { req }): Promise<string> =>
    iMessanger.CreateChat(body, req).then(async (AddChat: Chat | string) => {
      if (isString(AddChat)) return AddChat as string;

      await pubsub.publish(Sub.ADD_CHAT, { AddChat });
      return "Chat create";
    }),
  RemoveChat: async (_, body, { req }): Promise<string> =>
    iMessanger.RemoveChat(body, req).then(async (RemoveChat: Chat | string) => {
      if (isString(RemoveChat)) return RemoveChat as string;

      await pubsub.publish(Sub.REMOVE_CHAT, { RemoveChat });
      return "Chat remove";
    }),

  SendMessage: async (_, body, { req }): Promise<string> =>
    iMessanger
      .SendMessage(body, req)
      .then(async (AddMessage: Message | string) => {
        if (isString(AddMessage)) return AddMessage as string;

        await pubsub.publish(Sub.ADD_MESSAGE, { AddMessage });
        return "Message send";
      }),
  ChangeMessage: async (_, body, { req }): Promise<string> =>
    iMessanger
      .ChangeMessage(body, req)
      .then(async (ChangeMessage: Message | string) => {
        if (isString(ChangeMessage)) return ChangeMessage as string;

        await pubsub.publish(Sub.CHANGE_MESSAGE, { ChangeMessage });
        return "Message change";
      }),
  RemoveMessage: async (_, body, { req }): Promise<string> =>
    iMessanger.RemoveMessage(body, req).then(async (mes: string) => {
      if (mes == null) {
        await pubsub.publish(Sub.REWOVE_MESSAGE, {
          RemoveMessage: { _id: body?.messageid } as Message,
        });
        return "Message remove";
      }
      return mes;
    }),
});
