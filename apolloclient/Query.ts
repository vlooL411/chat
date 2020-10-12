import { Chat, Contact, Contacts, Messages, User } from '@backend'
import { IMessangerAsync } from '@types'

export const Query = (iMessanger: IMessangerAsync) => ({
  UpdateOnlineUser: async (_, __, { req }) => iMessanger.UpdateOnlineUser(req),

  User: async (_, body, { req }): Promise<User> => iMessanger.User(body, req),
  Users: async (_, body, { req }): Promise<User[]> =>
    iMessanger.Users(body, req),
  UserCurrent: async (_, __, { req }): Promise<User> =>
    iMessanger.UserCurrent(req),
  UserID: async (_, body, { req }): Promise<User> =>
    iMessanger.UserID(body, req),
  Contacts: async (_, __, { req }): Promise<Contact[]> =>
    iMessanger.Contacts(req),
  FindContact: async (_, body, { req }): Promise<Contacts> =>
    iMessanger.FindContact(body, req),

  Chat: async (_, body, { req }): Promise<Chat> => iMessanger.Chat(body, req),
  Chats: async (_, body, { req }): Promise<Chat[]> =>
    iMessanger.Chats(body, req),
  FindChat: async (_, body, { req }): Promise<Chat[]> =>
    iMessanger.FindChat(body, req),

  Messages: async (_, body, { req }): Promise<Messages> =>
    iMessanger.Messages(body, req),
  FindMessage: async (_, body, { req }): Promise<Chat[]> =>
    iMessanger.FindMessage(body, req),
});
