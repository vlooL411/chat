
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { Types } from "mongoose"

export enum TokenType {
    authentication = "authentication",
    access = "access",
    refresh = "refresh"
}

export enum Creater {
    Contact = "Contact",
    Chat = "Chat"
}

export enum Access {
    Public = "Public",
    Private = "Private",
    Squad = "Squad",
    Duo = "Duo",
    Own = "Own"
}

export enum TypeResponse {
    error = "error",
    warn = "warn",
    success = "success"
}

export enum Provider {
    auth = "auth",
    google = "google",
    facebook = "facebook"
}

export interface LoginInput {
    name: string;
    password: Password;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: Password;
}

export interface SocialNetwork {
    _id: string;
    auth: Authentication;
    givenName: string;
    familyName: string;
    middleName: string;
    email: string;
}

export interface IUser {
    _id: ObjectID;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    provider?: Provider;
    auth?: Authentication;
    google?: GoogleNetwork;
    facebook?: FacebookNetwork;
    chats_id?: ObjectID[];
    contacts?: Contact[];
    createdAt: Date;
    dateLastOnline?: Date;
    isOnline?: boolean;
    isOnlineMobile?: boolean;
    isClosed?: boolean;
    isVerified?: boolean;
    isActivated?: boolean;
    isLocked?: boolean;
    isActive?: boolean;
}

export interface GoogleNetwork extends SocialNetwork {
    __typename?: 'GoogleNetwork';
    _id: string;
    givenName: string;
    familyName: string;
    middleName: string;
    email: string;
    auth: Authentication;
}

export interface FacebookNetwork extends SocialNetwork {
    __typename?: 'FacebookNetwork';
    _id: string;
    givenName: string;
    familyName: string;
    middleName: string;
    email: string;
    auth: Authentication;
}

export interface Authentication {
    __typename?: 'Authentication';
    accessToken: Token;
    refreshToken: Token;
}

export interface IQuery {
    __typename?: 'IQuery';
    Login(input?: LoginInput): Authentication | Promise<Authentication>;
    Refresh(refreshToken: Token): Authentication | Promise<Authentication>;
    Chat(chatid: ObjectID): Chat | Promise<Chat>;
    Chats(): Chat[] | Promise<Chat[]>;
    FindChat(title: string): Chat[] | Promise<Chat[]>;
    Contacts(): Contact[] | Promise<Contact[]>;
    FindContacts(text: string): Contacts | Promise<Contacts>;
    Messages(chatid: ObjectID, messageid?: ObjectID, limit?: number, isIncoming?: boolean): Messages | Promise<Messages>;
    FindMessage(text: string): Chat[] | Promise<Chat[]>;
    User(id: ObjectID): UserSafe | Promise<UserSafe>;
    UserCurrent(): UserSafe | Promise<UserSafe>;
    UserUpdateOnline(): string | Promise<string>;
}

export interface IMutation {
    __typename?: 'IMutation';
    Register(input: RegisterInput): UserSafe | Promise<UserSafe>;
    CreateChat(title: string): string | Promise<string>;
    InviteChat(chatid: ObjectID): string | Promise<string>;
    LeaveChat(chatid: ObjectID): string | Promise<string>;
    RemoveChat(chatid: ObjectID): Chat | Promise<Chat>;
    SendMessage(chatid: ObjectID, text: string): string | Promise<string>;
    ChangeMessage(chatid: ObjectID, messageid: ObjectID, text: string): string | Promise<string>;
    RemoveMessage(chatid: ObjectID, messageid: ObjectID): string | Promise<string>;
}

export interface Chat {
    __typename?: 'Chat';
    _id: ObjectID;
    title: string;
    image?: string;
    createdAt: Date;
    creaters_id: ObjectID[];
    creater: Creater;
    access: Access;
    lastMessage?: Message;
    users_id?: ObjectID[];
    messages?: Message[];
}

export interface ISubscription {
    __typename?: 'ISubscription';
    AddChat(): Chat | Promise<Chat>;
    DeleteChat(): Chat | Promise<Chat>;
    AddMessage(): Message | Promise<Message>;
    SwapMessage(): Message | Promise<Message>;
    DeleteMessage(): Message | Promise<Message>;
}

export interface Contact {
    __typename?: 'Contact';
    _id: ObjectID;
    userid: ObjectID;
    createdAt: Date;
    whoIsContact?: string;
    User?: UserSafe;
}

export interface Contacts {
    __typename?: 'Contacts';
    Existing?: Contact[];
    Incoming?: Contact[];
}

export interface InfoMore {
    __typename?: 'InfoMore';
    _id?: ObjectID;
    isEndUp?: ObjectID;
    isEndDown?: ObjectID;
    lastIndex?: ObjectID;
    size?: number;
}

export interface Response {
    __typename?: 'Response';
    message: string;
    type: TypeResponse;
}

export interface Message {
    __typename?: 'Message';
    _id: ObjectID;
    userid: ObjectID;
    createdAt: Date;
    text?: string;
    attachments?: string[];
    isSend?: boolean;
    isRead?: boolean;
    isChange?: boolean;
    isFavorite?: boolean;
}

export interface Messages {
    __typename?: 'Messages';
    Chat: Chat;
    InfoMore?: InfoMore;
}

export interface UserSafe extends IUser {
    __typename?: 'UserSafe';
    _id: ObjectID;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    provider?: Provider;
    auth?: Authentication;
    google?: GoogleNetwork;
    facebook?: FacebookNetwork;
    chats_id?: ObjectID[];
    contacts?: Contact[];
    createdAt: Date;
    dateLastOnline?: Date;
    isOnline?: boolean;
    isOnlineMobile?: boolean;
    isClosed?: boolean;
    isVerified?: boolean;
    isActivated?: boolean;
    isLocked?: boolean;
    isActive?: boolean;
}

export interface User extends IUser {
    __typename?: 'User';
    password?: Password;
    _id: ObjectID;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    provider?: Provider;
    auth?: Authentication;
    google?: GoogleNetwork;
    facebook?: FacebookNetwork;
    chats_id?: ObjectID[];
    contacts?: Contact[];
    createdAt: Date;
    dateLastOnline?: Date;
    isOnline?: boolean;
    isOnlineMobile?: boolean;
    isClosed?: boolean;
    isVerified?: boolean;
    isActivated?: boolean;
    isLocked?: boolean;
    isActive?: boolean;
}

export type ObjectID = Types.ObjectId;
export type Token = string;
export type Password = string;
