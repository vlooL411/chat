import { Chat, Contact, Contacts, Messages, User } from '@generated/backend'
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
} from '@generated/backend'
import {
  MutationChangeMessageArgs,
  MutationCreateChatArgs,
  MutationInviteChatArgs,
  MutationLeaveChatArgs,
  MutationRemoveChatArgs,
  MutationRemoveMessageArgs,
  MutationSendMessageArgs,
} from '@generated/backend'

export interface IMessangerAsync<ApiRequest> {
  UpdateOnlineUser(req: ApiRequest): Promise<string>;

  //#region Query
  User(body: QueryUserArgs, req: ApiRequest): Promise<User>;
  Users(body: QueryUsersArgs, req: ApiRequest): Promise<User[]>;
  UserID(body: QueryUserIdArgs, req?: ApiRequest): Promise<User>;
  UserCurrent(req: ApiRequest): Promise<User>;
  Contacts(req?: ApiRequest): Promise<Contact[]>;
  FindContact(
    body: QueryFindContactArgs,
    req: ApiRequest
  ): Promise<Contacts>;

  Chat(body: QueryChatArgs, req: ApiRequest): Promise<Chat>;
  Chats(body: QueryChatsArgs, req: ApiRequest): Promise<Chat[]>;
  FindChat(body: QueryFindChatArgs, req: ApiRequest): Promise<Chat[]>;

  Messages(body: QueryMessagesArgs, req?: ApiRequest): Promise<Messages>;
  FindMessage(body: QueryFindMessageArgs, req: ApiRequest): Promise<Chat[]>;
  //#endregion

  //#region Mutation
  InviteChat(
    body: MutationInviteChatArgs,
    req: ApiRequest
  ): Promise<string>;
  LeaveChat(body: MutationLeaveChatArgs, req: ApiRequest): Promise<string>;
  CreateChat(
    body: MutationCreateChatArgs,
    req: ApiRequest
  ): Promise<string>;
  RemoveChat(
    body: MutationRemoveChatArgs,
    req: ApiRequest
  ): Promise<string>;

  SendMessage(
    body: MutationSendMessageArgs,
    req: ApiRequest
  ): Promise<string>;
  ChangeMessage(
    body: MutationChangeMessageArgs,
    req: ApiRequest
  ): Promise<string>;
  RemoveMessage(
    body: MutationRemoveMessageArgs,
    req: ApiRequest
  ): Promise<string>;
  //#endregion
}
