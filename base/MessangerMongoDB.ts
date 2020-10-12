import { NextApiRequest } from 'next'
import { IMessangerAsync } from '@types'
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

const { HOST_API } = process.env;

//resolvers use ./apolloclient/schema.ts
export default class MessangerMongoDB implements IMessangerAsync {
  constructor(public folder: string = "") {}

  async PostQuery<T>(
    relativeUrl: string,
    body,
    req: NextApiRequest
  ): Promise<T> {
    const data = await fetch(`${HOST_API}/${this.folder}${relativeUrl}`, {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: { ...req?.headers } as any,
    });

    return data.json().then((el) => el?.data);
  }

  UpdateOnlineUser = (req: NextApiRequest): Promise<string> =>
    this.PostQuery("User/online", {}, req);

  //#region Query
  //#region User
  User = (body: QueryUserArgs, req: NextApiRequest): Promise<User> =>
    this.PostQuery("User", body, req);
  UserCurrent = (req: NextApiRequest): Promise<User> =>
    this.PostQuery("User/current", {}, req);

  UserID = (body: QueryUserIdArgs, req: NextApiRequest = null): Promise<User> =>
    this.PostQuery("User/id", body, req);

  Users = (body: QueryUsersArgs, req: NextApiRequest): Promise<User[]> =>
    this.PostQuery("User/gets", body, req);

  Contacts = (req: NextApiRequest): Promise<Contact[]> =>
    this.PostQuery("Contact/gets", {}, req);

  FindContact = (
    body: QueryFindContactArgs,
    req: NextApiRequest
  ): Promise<Contacts> => this.PostQuery("Contact/find", body, req);
  //#endregion

  //#region Chat
  Chat = (body: QueryChatArgs, req: NextApiRequest): Promise<Chat> =>
    this.PostQuery("Chat", body, req);

  Chats = (body: QueryChatsArgs, req: NextApiRequest): Promise<Chat[]> =>
    this.PostQuery("Chat/gets", body, req);

  FindChat = (body: QueryFindChatArgs, req: NextApiRequest): Promise<Chat[]> =>
    this.PostQuery("Chat/find", body, req);

  Messages = (
    body: QueryMessagesArgs,
    req?: NextApiRequest
  ): Promise<Messages> => this.PostQuery("Message/gets", body, req);

  FindMessage = (
    body: QueryFindMessageArgs,
    req: NextApiRequest
  ): Promise<Chat[]> => this.PostQuery("Message/find", body, req);
  //#endregion

  //#region Mutation
  InviteChat = (
    body: MutationInviteChatArgs,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Chat/invite", body, req);
  LeaveChat = (
    body: MutationLeaveChatArgs,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Chat/leave", body, req);
  CreateChat = (
    body: MutationCreateChatArgs,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Chat/create", body, req);
  RemoveChat = (
    body: MutationRemoveChatArgs,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Chat/remove", body, req);

  SendMessage = (
    body: MutationSendMessageArgs,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Message/send", body, req);

  ChangeMessage = (
    body: MutationChangeMessageArgs,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Message/change", body, req);

  RemoveMessage = (
    body: MutationRemoveMessageArgs,
    req: NextApiRequest
  ): Promise<string> => this.PostQuery("Message/remove", body, req);
  //#endregion
}
