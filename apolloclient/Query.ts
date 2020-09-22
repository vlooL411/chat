import { Chat, User, Messages, IMessangerAsync } from "@types";

export const Query = (iMessanger: IMessangerAsync) => ({
  User: async (_, body, { req }): Promise<User> => iMessanger.User(body, req),
  Users: async (_, { start, end }, { req }): Promise<User[]> =>
    iMessanger.Users(start, end, req),
  UserCurrent: async (_, __, { req }): Promise<User> =>
    iMessanger.UserCurrent(req),
  UserID: async (_, body, { req }): Promise<User> =>
    iMessanger.UserID(body, req),

  Chat: async (_, body, { req }): Promise<Chat> => iMessanger.Chat(body, req),
  Chats: async (_, { start, end }, { req }): Promise<Chat[]> =>
    iMessanger.Chats(start, end, req),
  FindChat: async (_, body, { req }): Promise<Chat[]> =>
    iMessanger.FindChat(body, req),

  Messages: async (_, body, { req }): Promise<Messages> =>
    iMessanger.Messages(body, req),
  FindMessage: async (_, body, { req }): Promise<Chat[]> =>
    iMessanger.FindMessage(body, req),
});
