import { API } from '@API'
import { Types } from 'mongoose'
import { NextApiRequest } from 'next'

export type ID = number | string | Types.ObjectId;

export type InfoMore = {
  _id: ID;
  lastIndex?: ID;
  size: number;
  isEndUp?: ID;
  isEndDown?: ID;
};

export type Contact = {
  _id: ID;
  userid: ID;
  date: Date;
  name?: string;
  image?: string;
  status?: string;
  whoIsContact?: string;
};

export type User = {
  _id: ID;
  name: string;
  email: string;
  password: string;
  image?: string;
  status?: string;
  chats_id?: ID[];
  contacts?: Contact[];
  permissions?: number;
  isOnline?: boolean;
  isOnlineMobile?: boolean;
  dateLastOnline?: Date;
};

export type Message = {
  _id: ID;
  userid: ID;
  date: Date;
  text?: string;
  attachments?: string[];
  isRead?: boolean;
  isChange?: boolean;
  isFavorite?: boolean;
};

export enum Creater {
  Contact = "Contact",
  Chat = "Chat",
}

export enum Access {
  Public = "Public",
  Private = "Private",
  Squad = "Squad",
  Duo = "Duo",
  Own = "Own",
}

export type Chat = {
  _id: ID;
  title: string;
  image?: string;
  date: Date;
  creaters_id: ID[];
  creater: Creater;
  access: Access;
  users_id?: ID[];
  lastMessage?: Message;
  messages?: Message[];
};

export type Messages = {
  Chat: Chat;
  InfoMore?: InfoMore;
};

export interface IMessanger {
  //Query
  User(id: ID): User;
  UserID(name?: string, email?: string, req?: NextApiRequest): User;
  Users(start: number, end: number): User[];
  Chat(chatid: ID): Chat;
  Chats(start: number, end: number): Chat[];
  Friends(id: ID): Contact[];

  //Mutation
  SendMessage(chatid: ID, text: string): string;
  ChangeMessage(chatid: ID, message_id: ID, text: string): string;
  RemoveMessage(chatid: ID, message_id: ID): string;

  //Subscription
  AddMessage(): string;
}

export interface IMessangerAsync {
  UpdateOnlineUser(req: NextApiRequest): Promise<string>;

  //#region Query
  User(body: API.User.GetBody, req: NextApiRequest): Promise<User>;
  Users(body: API.User.GetsBody, req: NextApiRequest): Promise<User[]>;
  UserID(body: API.User.idBody, req?: NextApiRequest): Promise<User>;
  UserCurrent(req: NextApiRequest): Promise<User>;
  Contacts(req?: NextApiRequest): Promise<Contact[]>;
  FindContact(
    body: API.Contact.FindBody,
    req: NextApiRequest
  ): Promise<Contact[]>;

  Chat(body: API.Chat.GetBody, req: NextApiRequest): Promise<Chat>;
  Chats(body: API.Chat.GetsBody, req: NextApiRequest): Promise<Chat[]>;
  FindChat(body: API.Chat.FindBody, req: NextApiRequest): Promise<Chat[]>;

  Messages(body: API.Message.GetsBody, req?: NextApiRequest): Promise<Messages>;
  FindMessage(body: API.Message.FindBody, req: NextApiRequest): Promise<Chat[]>;
  //#endregion

  //#region Mutation
  InviteChat(body: API.Chat.InviteBody, req: NextApiRequest): Promise<string>;
  LeaveChat(body: API.Chat.LeaveBody, req: NextApiRequest): Promise<string>;
  CreateChat(body: API.Chat.CreateBody, req: NextApiRequest): Promise<string>;
  RemoveChat(body: API.Chat.RemoveBody, req: NextApiRequest): Promise<string>;

  SendMessage(body: API.Message.SendBody, req: NextApiRequest): Promise<string>;
  ChangeMessage(
    body: API.Message.ChangeBody,
    req: NextApiRequest
  ): Promise<string>;
  RemoveMessage(
    body: API.Message.RemoveBody,
    req: NextApiRequest
  ): Promise<string>;
  //#endregion
}
