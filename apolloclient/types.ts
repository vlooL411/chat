import { Types } from "mongoose";
import { NextApiRequest } from "next";

export type ID = number | string | Types.ObjectId;

export type User = {
  _id: ID;
  name: string;
  email: string;
  password: string;
  image?: string;
  status?: string;
  chats_id: ID[];
  friends: Friend[];
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

export enum ChatCreater {
  User = "User",
  Chat = "Chat",
}

export type Chat = {
  _id: ID;
  date: Date;
  creater_id: ID;
  creater: ChatCreater;
  title: string;
  image?: string;
  users_id?: User[];
  messages?: Message[];
  lastMessage?: Message;
  isNotifications?: boolean;
};

export type Friend = {
  _id: ID;
  user_id: ID;
  date: Date;
  whoIsFriend?: string;
};

export interface IMessanger {
  //Query
  User(id: ID): User;
  UserID(name?: string, email?: string, req?: NextApiRequest): User;
  Users(start: number, end: number): User[];
  Chat(id: ID): Chat;
  Chats(start: number, end: number): Chat[];
  Friends(id: ID): Friend[];

  //Mutation
  SendMessage(chatid: ID, text: string): string;
  ChangeMessage(chatid: ID, message_id: ID, text: string): string;
  RemoveMessage(chatid: ID, message_id: ID): string;

  //Subscription
  AddMessage(): string;
}

export interface IMessangerAsync {
  //Query
  User(id: ID, req: NextApiRequest): Promise<User>;
  UserID(name?: string, email?: string, req?: NextApiRequest): Promise<User>;
  Users(start: number, end: number, req: NextApiRequest): Promise<User[]>;
  Chat(id: ID, req: NextApiRequest): Promise<Chat>;
  Chats(start: number, end: number, req: NextApiRequest): Promise<Chat[]>;
  Friends(id: ID, req: NextApiRequest): Promise<Friend[]>;

  //Mutation
  SendMessage(
    chatid: ID,
    text: string,
    req: NextApiRequest
  ): Promise<string | Message>;
  ChangeMessage(
    chatid: ID,
    messageid: ID,
    text: string,
    req: NextApiRequest
  ): Promise<string | Message>;
  RemoveMessage(
    chatid: ID,
    messageid: ID,
    req: NextApiRequest
  ): Promise<string>;
}
