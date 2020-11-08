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
import { IMessangerAsync } from 'IMessangerAsync'

const { HOST } = process.env;

type ApiReq = { headers?}

export default class MessangerMongoDB implements IMessangerAsync<ApiReq> {
  constructor(public hostAPI: string = HOST, public folder: string = "") { }

  async PostQuery<T>(
    relativeUrl: string,
    body,
    req: ApiReq,
    method: string = "POST"
  ): Promise<T> {
    const { hostAPI, folder } = this

    const data = await fetch(`${hostAPI}/${folder}${relativeUrl}`, {
      method,
      body: JSON.stringify(body),
      credentials: "include",
      headers: { ...req?.headers } as any,
    });

    return data.json().then((el) => el?.data);
  }

  UpdateOnlineUser = (req: ApiReq): Promise<string> =>
    this.PostQuery("User/online", {}, req);

  //#region Query
  //#region User
  User = (body: QueryUserArgs, req: ApiReq): Promise<User> =>
    this.PostQuery("User", body, req);
  UserCurrent = (req: ApiReq): Promise<User> =>
    this.PostQuery("User/current", {}, req);

  UserID = (body: QueryUserIdArgs, req: ApiReq = null): Promise<User> =>
    this.PostQuery("User/id", body, req);

  Users = (body: QueryUsersArgs, req: ApiReq): Promise<User[]> =>
    this.PostQuery("User/gets", body, req);

  Contacts = (req: ApiReq): Promise<Contact[]> =>
    this.PostQuery("Contact/gets", {}, req);

  FindContact = (
    body: QueryFindContactArgs,
    req: ApiReq
  ): Promise<Contacts> => this.PostQuery("Contact/find", body, req);
  //#endregion

  //#region Chat
  Chat = (body: QueryChatArgs, req: ApiReq): Promise<Chat> =>
    this.PostQuery("Chat", body, req);

  Chats = (body: QueryChatsArgs, req: ApiReq): Promise<Chat[]> =>
    this.PostQuery("Chat/gets", body, req);

  FindChat = (body: QueryFindChatArgs, req: ApiReq): Promise<Chat[]> =>
    this.PostQuery("Chat/find", body, req);

  Messages = (
    body: QueryMessagesArgs,
    req?: ApiReq
  ): Promise<Messages> => this.PostQuery("Message/gets", body, req);

  FindMessage = (
    body: QueryFindMessageArgs,
    req: ApiReq
  ): Promise<Chat[]> => this.PostQuery("Message/find", body, req);
  //#endregion

  //#region Mutation
  InviteChat = (
    body: MutationInviteChatArgs,
    req: ApiReq
  ): Promise<string> => this.PostQuery("Chat/invite", body, req);
  LeaveChat = (
    body: MutationLeaveChatArgs,
    req: ApiReq
  ): Promise<string> => this.PostQuery("Chat/leave", body, req);
  CreateChat = (
    body: MutationCreateChatArgs,
    req: ApiReq
  ): Promise<string> => this.PostQuery("Chat/create", body, req);
  RemoveChat = (
    body: MutationRemoveChatArgs,
    req: ApiReq
  ): Promise<string> => this.PostQuery("Chat/remove", body, req);

  SendMessage = (
    body: MutationSendMessageArgs,
    req: ApiReq
  ): Promise<string> => this.PostQuery("Message/send", body, req);

  ChangeMessage = (
    body: MutationChangeMessageArgs,
    req: ApiReq
  ): Promise<string> => this.PostQuery("Message/change", body, req);

  RemoveMessage = (
    body: MutationRemoveMessageArgs,
    req: ApiReq
  ): Promise<string> => this.PostQuery("Message/remove", body, req);
  //#endregion
}
