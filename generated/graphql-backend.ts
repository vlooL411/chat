import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};


export type InfoMore = {
  __typename?: 'InfoMore';
  _id?: Maybe<Scalars['ID']>;
  isEndUp?: Maybe<Scalars['ID']>;
  isEndDown?: Maybe<Scalars['ID']>;
  lastIndex?: Maybe<Scalars['ID']>;
  size?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  chats_id?: Maybe<Array<Maybe<Scalars['ID']>>>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  isClosed?: Maybe<Scalars['Boolean']>;
  isOnlineMobile?: Maybe<Scalars['Boolean']>;
  dateLastOnline?: Maybe<Scalars['Date']>;
};

export type Contact = {
  __typename?: 'Contact';
  _id: Scalars['ID'];
  userid: Scalars['ID'];
  date: Scalars['Date'];
  whoIsContact?: Maybe<Scalars['String']>;
  User?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  userid: Scalars['ID'];
  date: Scalars['Date'];
  text?: Maybe<Scalars['String']>;
  attachments?: Maybe<Array<Maybe<Scalars['String']>>>;
  isSend?: Maybe<Scalars['Boolean']>;
  isRead?: Maybe<Scalars['Boolean']>;
  isChange?: Maybe<Scalars['Boolean']>;
  isFavorite?: Maybe<Scalars['Boolean']>;
};

export enum Creater {
  Contact = 'Contact',
  Chat = 'Chat'
}

export enum Access {
  Public = 'Public',
  Private = 'Private',
  Squad = 'Squad',
  Duo = 'Duo',
  Own = 'Own'
}

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['ID'];
  title: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  date: Scalars['Date'];
  creaters_id: Array<Maybe<Scalars['ID']>>;
  creater: Creater;
  access: Access;
  lastMessage?: Maybe<Message>;
  users_id?: Maybe<Array<Maybe<Scalars['ID']>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
};

export type Messages = {
  __typename?: 'Messages';
  Chat: Chat;
  InfoMore?: Maybe<InfoMore>;
};

export type Contacts = {
  __typename?: 'Contacts';
  Existing?: Maybe<Array<Maybe<Contact>>>;
  Incoming?: Maybe<Array<Maybe<Contact>>>;
};

export type Query = {
  __typename?: 'Query';
  UpdateOnlineUser?: Maybe<Scalars['String']>;
  User?: Maybe<User>;
  UserCurrent?: Maybe<User>;
  UserID?: Maybe<User>;
  Users?: Maybe<Array<Maybe<User>>>;
  Contacts?: Maybe<Array<Maybe<Contact>>>;
  Chat?: Maybe<Chat>;
  Chats?: Maybe<Array<Maybe<Chat>>>;
  Messages?: Maybe<Messages>;
  FindChat?: Maybe<Array<Maybe<Chat>>>;
  FindMessage?: Maybe<Array<Maybe<Chat>>>;
  FindContact?: Maybe<Contacts>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserIdArgs = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  start: Scalars['Int'];
  end: Scalars['Int'];
};


export type QueryChatArgs = {
  chatid: Scalars['ID'];
};


export type QueryChatsArgs = {
  chatid?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  isIncoming?: Maybe<Scalars['Boolean']>;
};


export type QueryMessagesArgs = {
  chatid: Scalars['ID'];
  messageid?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  isIncoming?: Maybe<Scalars['Boolean']>;
};


export type QueryFindChatArgs = {
  title: Scalars['String'];
};


export type QueryFindMessageArgs = {
  text: Scalars['String'];
};


export type QueryFindContactArgs = {
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  InviteChat?: Maybe<Scalars['String']>;
  LeaveChat?: Maybe<Scalars['String']>;
  CreateChat?: Maybe<Scalars['String']>;
  RemoveChat?: Maybe<Scalars['String']>;
  SendMessage?: Maybe<Scalars['String']>;
  ChangeMessage?: Maybe<Scalars['String']>;
  RemoveMessage?: Maybe<Scalars['String']>;
};


export type MutationInviteChatArgs = {
  chatid: Scalars['ID'];
};


export type MutationLeaveChatArgs = {
  chatid: Scalars['ID'];
};


export type MutationCreateChatArgs = {
  title: Scalars['String'];
};


export type MutationRemoveChatArgs = {
  chatid: Scalars['ID'];
};


export type MutationSendMessageArgs = {
  chatid: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationChangeMessageArgs = {
  chatid: Scalars['ID'];
  messageid: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationRemoveMessageArgs = {
  chatid: Scalars['ID'];
  messageid: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  AddChat?: Maybe<Chat>;
  DeleteChat?: Maybe<Chat>;
  AddMessage?: Maybe<Message>;
  SwapMessage?: Maybe<Message>;
  DeleteMessage?: Maybe<Message>;
};

export type InviteChatMutationVariables = Exact<{
  chatid: Scalars['ID'];
}>;


export type InviteChatMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'InviteChat'>
);

export type LeaveChatMutationVariables = Exact<{
  chatid: Scalars['ID'];
}>;


export type LeaveChatMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'LeaveChat'>
);

export type RemoveChatMutationVariables = Exact<{
  chatid: Scalars['ID'];
}>;


export type RemoveChatMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'RemoveChat'>
);

export type CreateChatMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateChatMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'CreateChat'>
);

export type ChatQueryVariables = Exact<{
  chatid: Scalars['ID'];
}>;


export type ChatQuery = (
  { __typename?: 'Query' }
  & { Chat?: Maybe<(
    { __typename?: 'Chat' }
    & ChatInfoFragment
    & LastMessageFragment
  )> }
);

export type ChatsQueryVariables = Exact<{
  chatid?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  isIncoming?: Maybe<Scalars['Boolean']>;
}>;


export type ChatsQuery = (
  { __typename?: 'Query' }
  & { Chats?: Maybe<Array<Maybe<(
    { __typename?: 'Chat' }
    & ChatInfoFragment
    & LastMessageFragment
  )>>> }
);

export type AddChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AddChatSubscription = (
  { __typename?: 'Subscription' }
  & { AddChat?: Maybe<(
    { __typename?: 'Chat' }
    & { lastMessage?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, '_id' | 'text'>
    )> }
    & ChatInfoFragment
  )> }
);

export type DeleteChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type DeleteChatSubscription = (
  { __typename?: 'Subscription' }
  & { DeleteChat?: Maybe<(
    { __typename?: 'Chat' }
    & Pick<Chat, '_id'>
  )> }
);

export type ChatsUserCurrentQueryVariables = Exact<{
  chatid?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  isIncoming?: Maybe<Scalars['Boolean']>;
}>;


export type ChatsUserCurrentQuery = (
  { __typename?: 'Query' }
  & { Chats?: Maybe<Array<Maybe<(
    { __typename?: 'Chat' }
    & ChatInfoFragment
    & LastMessageFragment
  )>>>, UserCurrent?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'chats_id'>
  )> }
);

export type FindQueryChatQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type FindQueryChatQuery = (
  { __typename?: 'Query' }
  & { FindMessage?: Maybe<Array<Maybe<(
    { __typename?: 'Chat' }
    & ChatFindFragmentFragment
  )>>>, FindChat?: Maybe<Array<Maybe<(
    { __typename?: 'Chat' }
    & ChatFindFragmentFragment
  )>>> }
);

export type ChatFindFragmentFragment = (
  { __typename?: 'Chat' }
  & { messages?: Maybe<Array<Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'text' | 'date'>
  )>>> }
  & ChatInfoFragment
  & LastMessageFragment
);

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = (
  { __typename?: 'Query' }
  & { Contacts?: Maybe<Array<Maybe<(
    { __typename?: 'Contact' }
    & ContactInfoFragment
  )>>> }
);

export type FindContactQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type FindContactQuery = (
  { __typename?: 'Query' }
  & { FindContact?: Maybe<(
    { __typename?: 'Contacts' }
    & { Existing?: Maybe<Array<Maybe<(
      { __typename?: 'Contact' }
      & ContactInfoFragment
    )>>>, Incoming?: Maybe<Array<Maybe<(
      { __typename?: 'Contact' }
      & ContactInfoFragment
    )>>> }
  )> }
);

export type SendMessageMutationVariables = Exact<{
  chatid: Scalars['ID'];
  text: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'SendMessage'>
);

export type ChangeMessageMutationVariables = Exact<{
  chatid: Scalars['ID'];
  messageid: Scalars['ID'];
  text: Scalars['String'];
}>;


export type ChangeMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'ChangeMessage'>
);

export type RemoveMessageMutationVariables = Exact<{
  chatid: Scalars['ID'];
  messageid: Scalars['ID'];
}>;


export type RemoveMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'RemoveMessage'>
);

export type MessagesQueryVariables = Exact<{
  chatid: Scalars['ID'];
  messageid?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  isIncoming?: Maybe<Scalars['Boolean']>;
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { Messages?: Maybe<(
    { __typename?: 'Messages' }
    & { Chat: (
      { __typename?: 'Chat' }
      & ChatMessagesFragment
      & LastMessageFragment
    ), InfoMore?: Maybe<(
      { __typename?: 'InfoMore' }
      & InfoMoreFragment
    )> }
  )> }
);

export type AddMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AddMessageSubscription = (
  { __typename?: 'Subscription' }
  & { AddMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'userid' | 'text' | 'date' | 'isChange'>
  )> }
);

export type SwapMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SwapMessageSubscription = (
  { __typename?: 'Subscription' }
  & { SwapMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'text' | 'isChange'>
  )> }
);

export type DeleteMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type DeleteMessageSubscription = (
  { __typename?: 'Subscription' }
  & { DeleteMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, '_id'>
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { User?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )> }
);

export type UserCurrentQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCurrentQuery = (
  { __typename?: 'Query' }
  & { UserCurrent?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'chats_id'>
    & UserInfoFragment
  )> }
);

export type UserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'name' | 'image' | 'status' | 'isClosed' | 'isOnlineMobile' | 'dateLastOnline'>
);

export type ContactInfoFragment = (
  { __typename?: 'Contact' }
  & Pick<Contact, '_id' | 'userid' | 'date' | 'whoIsContact'>
  & { User?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )> }
);

export type InfoMoreFragment = (
  { __typename?: 'InfoMore' }
  & Pick<InfoMore, '_id' | 'size' | 'isEndUp' | 'isEndDown' | 'lastIndex'>
);

export type ChatMessagesFragment = (
  { __typename?: 'Chat' }
  & { messages?: Maybe<Array<Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'userid' | 'text' | 'date' | 'isChange'>
  )>>> }
);

export type ChatInfoFragment = (
  { __typename?: 'Chat' }
  & Pick<Chat, '_id' | 'title' | 'image' | 'date' | 'creater' | 'creaters_id' | 'access'>
);

export type LastMessageFragment = (
  { __typename?: 'Chat' }
  & { lastMessage?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, '_id' | 'text' | 'date'>
  )> }
);

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Date: ResolverTypeWrapper<Scalars['Date']>;
  InfoMore: ResolverTypeWrapper<InfoMore>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Contact: ResolverTypeWrapper<Contact>;
  Message: ResolverTypeWrapper<Message>;
  Creater: Creater;
  Access: Access;
  Chat: ResolverTypeWrapper<Chat>;
  Messages: ResolverTypeWrapper<Messages>;
  Contacts: ResolverTypeWrapper<Contacts>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Date: Scalars['Date'];
  InfoMore: InfoMore;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  User: User;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Contact: Contact;
  Message: Message;
  Chat: Chat;
  Messages: Messages;
  Contacts: Contacts;
  Query: {};
  Mutation: {};
  Subscription: {};
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type InfoMoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['InfoMore'] = ResolversParentTypes['InfoMore']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isEndUp?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isEndDown?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastIndex?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chats_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Contact']>>>, ParentType, ContextType>;
  isClosed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isOnlineMobile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dateLastOnline?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  whoIsContact?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attachments?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  isSend?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isRead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isChange?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  creaters_id?: Resolver<Array<Maybe<ResolversTypes['ID']>>, ParentType, ContextType>;
  creater?: Resolver<ResolversTypes['Creater'], ParentType, ContextType>;
  access?: Resolver<ResolversTypes['Access'], ParentType, ContextType>;
  lastMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  users_id?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Messages'] = ResolversParentTypes['Messages']> = ResolversObject<{
  Chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  InfoMore?: Resolver<Maybe<ResolversTypes['InfoMore']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contacts'] = ResolversParentTypes['Contacts']> = ResolversObject<{
  Existing?: Resolver<Maybe<Array<Maybe<ResolversTypes['Contact']>>>, ParentType, ContextType>;
  Incoming?: Resolver<Maybe<Array<Maybe<ResolversTypes['Contact']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  UpdateOnlineUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  UserCurrent?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  UserID?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserIdArgs, never>>;
  Users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'start' | 'end'>>;
  Contacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Contact']>>>, ParentType, ContextType>;
  Chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryChatArgs, 'chatid'>>;
  Chats?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType, RequireFields<QueryChatsArgs, never>>;
  Messages?: Resolver<Maybe<ResolversTypes['Messages']>, ParentType, ContextType, RequireFields<QueryMessagesArgs, 'chatid'>>;
  FindChat?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType, RequireFields<QueryFindChatArgs, 'title'>>;
  FindMessage?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType, RequireFields<QueryFindMessageArgs, 'text'>>;
  FindContact?: Resolver<Maybe<ResolversTypes['Contacts']>, ParentType, ContextType, RequireFields<QueryFindContactArgs, 'text'>>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  InviteChat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationInviteChatArgs, 'chatid'>>;
  LeaveChat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLeaveChatArgs, 'chatid'>>;
  CreateChat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateChatArgs, 'title'>>;
  RemoveChat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRemoveChatArgs, 'chatid'>>;
  SendMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'chatid' | 'text'>>;
  ChangeMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationChangeMessageArgs, 'chatid' | 'messageid' | 'text'>>;
  RemoveMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRemoveMessageArgs, 'chatid' | 'messageid'>>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  AddChat?: SubscriptionResolver<Maybe<ResolversTypes['Chat']>, "AddChat", ParentType, ContextType>;
  DeleteChat?: SubscriptionResolver<Maybe<ResolversTypes['Chat']>, "DeleteChat", ParentType, ContextType>;
  AddMessage?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "AddMessage", ParentType, ContextType>;
  SwapMessage?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "SwapMessage", ParentType, ContextType>;
  DeleteMessage?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "DeleteMessage", ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Date?: GraphQLScalarType;
  InfoMore?: InfoMoreResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  Messages?: MessagesResolvers<ContextType>;
  Contacts?: ContactsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
