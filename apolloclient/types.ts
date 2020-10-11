import { Chat, Contact, Contacts, Messages, User } from '@backend'
import {
  QueryChatArgs,
  QueryChatsArgs,
  QueryFindChatArgs,
  QueryFindContactArgs,
  QueryFindMessageArgs,
  QueryMessagesArgs,
  QueryUserArgs,
  QueryUserIdArgs,
  QueryUsersArgs,
} from '@backend'
import {
  MutationChangeMessageArgs,
  MutationCreateChatArgs,
  MutationInviteChatArgs,
  MutationLeaveChatArgs,
  MutationRemoveChatArgs,
  MutationRemoveMessageArgs,
  MutationSendMessageArgs,
} from '@backend'
import { NextApiRequest } from 'next'

export type ID = string;

export interface IMessangerAsync {
  UpdateOnlineUser(req: NextApiRequest): Promise<string>;

  //#region Query
  User(body: QueryUserArgs, req: NextApiRequest): Promise<User>;
  Users(body: QueryUsersArgs, req: NextApiRequest): Promise<User[]>;
  UserID(body: QueryUserIdArgs, req?: NextApiRequest): Promise<User>;
  UserCurrent(req: NextApiRequest): Promise<User>;
  Contacts(req?: NextApiRequest): Promise<Contact[]>;
  FindContact(
    body: QueryFindContactArgs,
    req: NextApiRequest
  ): Promise<Contacts>;

  Chat(body: QueryChatArgs, req: NextApiRequest): Promise<Chat>;
  Chats(body: QueryChatsArgs, req: NextApiRequest): Promise<Chat[]>;
  FindChat(body: QueryFindChatArgs, req: NextApiRequest): Promise<Chat[]>;

  Messages(body: QueryMessagesArgs, req?: NextApiRequest): Promise<Messages>;
  FindMessage(body: QueryFindMessageArgs, req: NextApiRequest): Promise<Chat[]>;
  //#endregion

  //#region Mutation
  InviteChat(
    body: MutationInviteChatArgs,
    req: NextApiRequest
  ): Promise<string>;
  LeaveChat(body: MutationLeaveChatArgs, req: NextApiRequest): Promise<string>;
  CreateChat(
    body: MutationCreateChatArgs,
    req: NextApiRequest
  ): Promise<string>;
  RemoveChat(
    body: MutationRemoveChatArgs,
    req: NextApiRequest
  ): Promise<string>;

  SendMessage(
    body: MutationSendMessageArgs,
    req: NextApiRequest
  ): Promise<string>;
  ChangeMessage(
    body: MutationChangeMessageArgs,
    req: NextApiRequest
  ): Promise<string>;
  RemoveMessage(
    body: MutationRemoveMessageArgs,
    req: NextApiRequest
  ): Promise<string>;
  //#endregion
}
