
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum TokenType {
    authentication = "authentication"
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
    accessToken: Token;
    refreshToken: Token;
    givenName: string;
    familyName: string;
    middleName: string;
    email: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    provider?: Provider;
    auth?: Authentication;
    google?: GoogleNetwork;
    facebook?: FacebookNetwork;
    chats_id?: string[];
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
    _id: string;
    givenName: string;
    familyName: string;
    middleName: string;
    email: string;
    accessToken: Token;
    refreshToken: Token;
}

export interface FacebookNetwork extends SocialNetwork {
    _id: string;
    givenName: string;
    familyName: string;
    middleName: string;
    email: string;
    accessToken: Token;
    refreshToken: Token;
}

export interface Authentication {
    accessToken: Token;
    refreshToken: Token;
}

export interface IQuery {
    Login(input?: LoginInput): Authentication | Promise<Authentication>;
    Refresh(refreshToken: Token): Authentication | Promise<Authentication>;
    Chat(chatid: string): Chat | Promise<Chat>;
    Chats(chatid?: string, limit?: number, isIncoming?: boolean): Chat[] | Promise<Chat[]>;
    FindChat(title: string): Chat[] | Promise<Chat[]>;
    Contacts(): Contact[] | Promise<Contact[]>;
    FindContacts(text: string): Contacts | Promise<Contacts>;
    Messages(chatid: string, messageid?: string, limit?: number, isIncoming?: boolean): Messages | Promise<Messages>;
    FindMessage(text: string): Chat[] | Promise<Chat[]>;
    User(id: string): UserSafe | Promise<UserSafe>;
    UserCurrent(): UserSafe | Promise<UserSafe>;
    UserID(name?: string, email?: string): UserSafe | Promise<UserSafe>;
    UserUpdateOnline(): string | Promise<string>;
}

export interface IMutation {
    Register(input: RegisterInput): UserSafe | Promise<UserSafe>;
    CreateChat(title: string): string | Promise<string>;
    InviteChat(chatid: string): string | Promise<string>;
    LeaveChat(chatid: string): string | Promise<string>;
    RemoveChat(chatid: string): string | Promise<string>;
    SendMessage(chatid: string, text: string): string | Promise<string>;
    ChangeMessage(chatid: string, messageid: string, text: string): string | Promise<string>;
    RemoveMessage(chatid: string, messageid: string): string | Promise<string>;
}

export interface Chat {
    _id: string;
    title: string;
    image?: string;
    date: Date;
    creaters_id: string[];
    creater: Creater;
    access: Access;
    lastMessage?: Message;
    users_id?: string[];
    messages?: Message[];
}

export interface ISubscription {
    AddChat(): Chat | Promise<Chat>;
    DeleteChat(): Chat | Promise<Chat>;
    AddMessage(): Message | Promise<Message>;
    SwapMessage(): Message | Promise<Message>;
    DeleteMessage(): Message | Promise<Message>;
}

export interface Contact {
    _id: string;
    userid: string;
    date: Date;
    whoIsContact?: string;
    User?: UserSafe;
}

export interface Contacts {
    Existing?: Contact[];
    Incoming?: Contact[];
}

export interface InfoMore {
    _id?: string;
    isEndUp?: string;
    isEndDown?: string;
    lastIndex?: string;
    size?: number;
}

export interface Response {
    message: string;
    type: TypeResponse;
}

export interface Message {
    _id: string;
    userid: string;
    date: Date;
    text?: string;
    attachments?: string[];
    isSend?: boolean;
    isRead?: boolean;
    isChange?: boolean;
    isFavorite?: boolean;
}

export interface Messages {
    Chat: Chat;
    InfoMore?: InfoMore;
}

export interface UserSafe extends IUser {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    provider?: Provider;
    auth?: Authentication;
    google?: GoogleNetwork;
    facebook?: FacebookNetwork;
    chats_id?: string[];
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
    password?: Password;
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    provider?: Provider;
    auth?: Authentication;
    google?: GoogleNetwork;
    facebook?: FacebookNetwork;
    chats_id?: string[];
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

export type Token = string;
export type Password = string;
