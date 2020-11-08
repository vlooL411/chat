import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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

export type UpdateOnlineUserQueryVariables = Exact<{ [key: string]: never; }>;


export type UpdateOnlineUserQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'UpdateOnlineUser'>
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

export const ChatInfoFragmentDoc = gql`
    fragment ChatInfo on Chat {
  _id
  title
  image
  date
  creater
  creaters_id
  access
}
    `;
export const LastMessageFragmentDoc = gql`
    fragment LastMessage on Chat {
  lastMessage {
    _id
    text
    date
  }
}
    `;
export const ChatFindFragmentFragmentDoc = gql`
    fragment chatFindFragment on Chat {
  ...ChatInfo
  messages {
    _id
    text
    date
  }
  ...LastMessage
}
    ${ChatInfoFragmentDoc}
${LastMessageFragmentDoc}`;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  _id
  name
  image
  status
  isClosed
  isOnlineMobile
  dateLastOnline
}
    `;
export const ContactInfoFragmentDoc = gql`
    fragment ContactInfo on Contact {
  _id
  userid
  date
  whoIsContact
  User {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const InfoMoreFragmentDoc = gql`
    fragment InfoMore on InfoMore {
  _id
  size
  isEndUp
  isEndDown
  lastIndex
}
    `;
export const ChatMessagesFragmentDoc = gql`
    fragment ChatMessages on Chat {
  messages {
    _id
    userid
    text
    date
    isChange
  }
}
    `;
export const InviteChatDocument = gql`
    mutation inviteChat($chatid: ID!) {
  InviteChat(chatid: $chatid)
}
    `;
export type InviteChatMutationFn = Apollo.MutationFunction<InviteChatMutation, InviteChatMutationVariables>;

/**
 * __useInviteChatMutation__
 *
 * To run a mutation, you first call `useInviteChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteChatMutation, { data, loading, error }] = useInviteChatMutation({
 *   variables: {
 *      chatid: // value for 'chatid'
 *   },
 * });
 */
export function useInviteChatMutation(baseOptions?: Apollo.MutationHookOptions<InviteChatMutation, InviteChatMutationVariables>) {
        return Apollo.useMutation<InviteChatMutation, InviteChatMutationVariables>(InviteChatDocument, baseOptions);
      }
export type InviteChatMutationHookResult = ReturnType<typeof useInviteChatMutation>;
export type InviteChatMutationResult = Apollo.MutationResult<InviteChatMutation>;
export type InviteChatMutationOptions = Apollo.BaseMutationOptions<InviteChatMutation, InviteChatMutationVariables>;
export const LeaveChatDocument = gql`
    mutation leaveChat($chatid: ID!) {
  LeaveChat(chatid: $chatid)
}
    `;
export type LeaveChatMutationFn = Apollo.MutationFunction<LeaveChatMutation, LeaveChatMutationVariables>;

/**
 * __useLeaveChatMutation__
 *
 * To run a mutation, you first call `useLeaveChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveChatMutation, { data, loading, error }] = useLeaveChatMutation({
 *   variables: {
 *      chatid: // value for 'chatid'
 *   },
 * });
 */
export function useLeaveChatMutation(baseOptions?: Apollo.MutationHookOptions<LeaveChatMutation, LeaveChatMutationVariables>) {
        return Apollo.useMutation<LeaveChatMutation, LeaveChatMutationVariables>(LeaveChatDocument, baseOptions);
      }
export type LeaveChatMutationHookResult = ReturnType<typeof useLeaveChatMutation>;
export type LeaveChatMutationResult = Apollo.MutationResult<LeaveChatMutation>;
export type LeaveChatMutationOptions = Apollo.BaseMutationOptions<LeaveChatMutation, LeaveChatMutationVariables>;
export const RemoveChatDocument = gql`
    mutation removeChat($chatid: ID!) {
  RemoveChat(chatid: $chatid)
}
    `;
export type RemoveChatMutationFn = Apollo.MutationFunction<RemoveChatMutation, RemoveChatMutationVariables>;

/**
 * __useRemoveChatMutation__
 *
 * To run a mutation, you first call `useRemoveChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChatMutation, { data, loading, error }] = useRemoveChatMutation({
 *   variables: {
 *      chatid: // value for 'chatid'
 *   },
 * });
 */
export function useRemoveChatMutation(baseOptions?: Apollo.MutationHookOptions<RemoveChatMutation, RemoveChatMutationVariables>) {
        return Apollo.useMutation<RemoveChatMutation, RemoveChatMutationVariables>(RemoveChatDocument, baseOptions);
      }
export type RemoveChatMutationHookResult = ReturnType<typeof useRemoveChatMutation>;
export type RemoveChatMutationResult = Apollo.MutationResult<RemoveChatMutation>;
export type RemoveChatMutationOptions = Apollo.BaseMutationOptions<RemoveChatMutation, RemoveChatMutationVariables>;
export const CreateChatDocument = gql`
    mutation createChat($title: String!) {
  CreateChat(title: $title)
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, baseOptions);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const ChatDocument = gql`
    query chat($chatid: ID!) {
  Chat(chatid: $chatid) {
    ...ChatInfo
    ...LastMessage
  }
}
    ${ChatInfoFragmentDoc}
${LastMessageFragmentDoc}`;

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      chatid: // value for 'chatid'
 *   },
 * });
 */
export function useChatQuery(baseOptions?: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        return Apollo.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, baseOptions);
      }
export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, baseOptions);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const ChatsDocument = gql`
    query chats($chatid: ID, $limit: Int, $isIncoming: Boolean) {
  Chats(chatid: $chatid, limit: $limit, isIncoming: $isIncoming) {
    ...ChatInfo
    ...LastMessage
  }
}
    ${ChatInfoFragmentDoc}
${LastMessageFragmentDoc}`;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *      chatid: // value for 'chatid'
 *      limit: // value for 'limit'
 *      isIncoming: // value for 'isIncoming'
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: Apollo.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        return Apollo.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, baseOptions);
      }
export function useChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          return Apollo.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, baseOptions);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const AddChatDocument = gql`
    subscription addChat {
  AddChat {
    ...ChatInfo
    lastMessage {
      _id
      text
    }
  }
}
    ${ChatInfoFragmentDoc}`;

/**
 * __useAddChatSubscription__
 *
 * To run a query within a React component, call `useAddChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddChatSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAddChatSubscription(baseOptions?: Apollo.SubscriptionHookOptions<AddChatSubscription, AddChatSubscriptionVariables>) {
        return Apollo.useSubscription<AddChatSubscription, AddChatSubscriptionVariables>(AddChatDocument, baseOptions);
      }
export type AddChatSubscriptionHookResult = ReturnType<typeof useAddChatSubscription>;
export type AddChatSubscriptionResult = Apollo.SubscriptionResult<AddChatSubscription>;
export const DeleteChatDocument = gql`
    subscription deleteChat {
  DeleteChat {
    _id
  }
}
    `;

/**
 * __useDeleteChatSubscription__
 *
 * To run a query within a React component, call `useDeleteChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeleteChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeleteChatSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDeleteChatSubscription(baseOptions?: Apollo.SubscriptionHookOptions<DeleteChatSubscription, DeleteChatSubscriptionVariables>) {
        return Apollo.useSubscription<DeleteChatSubscription, DeleteChatSubscriptionVariables>(DeleteChatDocument, baseOptions);
      }
export type DeleteChatSubscriptionHookResult = ReturnType<typeof useDeleteChatSubscription>;
export type DeleteChatSubscriptionResult = Apollo.SubscriptionResult<DeleteChatSubscription>;
export const ChatsUserCurrentDocument = gql`
    query chatsUserCurrent($chatid: ID, $limit: Int, $isIncoming: Boolean) {
  Chats(chatid: $chatid, limit: $limit, isIncoming: $isIncoming) {
    ...ChatInfo
    ...LastMessage
  }
  UserCurrent {
    _id
    chats_id
  }
}
    ${ChatInfoFragmentDoc}
${LastMessageFragmentDoc}`;

/**
 * __useChatsUserCurrentQuery__
 *
 * To run a query within a React component, call `useChatsUserCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsUserCurrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsUserCurrentQuery({
 *   variables: {
 *      chatid: // value for 'chatid'
 *      limit: // value for 'limit'
 *      isIncoming: // value for 'isIncoming'
 *   },
 * });
 */
export function useChatsUserCurrentQuery(baseOptions?: Apollo.QueryHookOptions<ChatsUserCurrentQuery, ChatsUserCurrentQueryVariables>) {
        return Apollo.useQuery<ChatsUserCurrentQuery, ChatsUserCurrentQueryVariables>(ChatsUserCurrentDocument, baseOptions);
      }
export function useChatsUserCurrentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatsUserCurrentQuery, ChatsUserCurrentQueryVariables>) {
          return Apollo.useLazyQuery<ChatsUserCurrentQuery, ChatsUserCurrentQueryVariables>(ChatsUserCurrentDocument, baseOptions);
        }
export type ChatsUserCurrentQueryHookResult = ReturnType<typeof useChatsUserCurrentQuery>;
export type ChatsUserCurrentLazyQueryHookResult = ReturnType<typeof useChatsUserCurrentLazyQuery>;
export type ChatsUserCurrentQueryResult = Apollo.QueryResult<ChatsUserCurrentQuery, ChatsUserCurrentQueryVariables>;
export const FindQueryChatDocument = gql`
    query findQueryChat($text: String!) {
  FindMessage(text: $text) {
    ...chatFindFragment
  }
  FindChat(title: $text) {
    ...chatFindFragment
  }
}
    ${ChatFindFragmentFragmentDoc}`;

/**
 * __useFindQueryChatQuery__
 *
 * To run a query within a React component, call `useFindQueryChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindQueryChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindQueryChatQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useFindQueryChatQuery(baseOptions?: Apollo.QueryHookOptions<FindQueryChatQuery, FindQueryChatQueryVariables>) {
        return Apollo.useQuery<FindQueryChatQuery, FindQueryChatQueryVariables>(FindQueryChatDocument, baseOptions);
      }
export function useFindQueryChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindQueryChatQuery, FindQueryChatQueryVariables>) {
          return Apollo.useLazyQuery<FindQueryChatQuery, FindQueryChatQueryVariables>(FindQueryChatDocument, baseOptions);
        }
export type FindQueryChatQueryHookResult = ReturnType<typeof useFindQueryChatQuery>;
export type FindQueryChatLazyQueryHookResult = ReturnType<typeof useFindQueryChatLazyQuery>;
export type FindQueryChatQueryResult = Apollo.QueryResult<FindQueryChatQuery, FindQueryChatQueryVariables>;
export const ContactsDocument = gql`
    query contacts {
  Contacts {
    ...ContactInfo
  }
}
    ${ContactInfoFragmentDoc}`;

/**
 * __useContactsQuery__
 *
 * To run a query within a React component, call `useContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useContactsQuery(baseOptions?: Apollo.QueryHookOptions<ContactsQuery, ContactsQueryVariables>) {
        return Apollo.useQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, baseOptions);
      }
export function useContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactsQuery, ContactsQueryVariables>) {
          return Apollo.useLazyQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, baseOptions);
        }
export type ContactsQueryHookResult = ReturnType<typeof useContactsQuery>;
export type ContactsLazyQueryHookResult = ReturnType<typeof useContactsLazyQuery>;
export type ContactsQueryResult = Apollo.QueryResult<ContactsQuery, ContactsQueryVariables>;
export const FindContactDocument = gql`
    query findContact($text: String!) {
  FindContact(text: $text) {
    Existing {
      ...ContactInfo
    }
    Incoming {
      ...ContactInfo
    }
  }
}
    ${ContactInfoFragmentDoc}`;

/**
 * __useFindContactQuery__
 *
 * To run a query within a React component, call `useFindContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindContactQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useFindContactQuery(baseOptions?: Apollo.QueryHookOptions<FindContactQuery, FindContactQueryVariables>) {
        return Apollo.useQuery<FindContactQuery, FindContactQueryVariables>(FindContactDocument, baseOptions);
      }
export function useFindContactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindContactQuery, FindContactQueryVariables>) {
          return Apollo.useLazyQuery<FindContactQuery, FindContactQueryVariables>(FindContactDocument, baseOptions);
        }
export type FindContactQueryHookResult = ReturnType<typeof useFindContactQuery>;
export type FindContactLazyQueryHookResult = ReturnType<typeof useFindContactLazyQuery>;
export type FindContactQueryResult = Apollo.QueryResult<FindContactQuery, FindContactQueryVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($chatid: ID!, $text: String!) {
  SendMessage(chatid: $chatid, text: $text)
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      chatid: // value for 'chatid'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const ChangeMessageDocument = gql`
    mutation changeMessage($chatid: ID!, $messageid: ID!, $text: String!) {
  ChangeMessage(chatid: $chatid, messageid: $messageid, text: $text)
}
    `;
export type ChangeMessageMutationFn = Apollo.MutationFunction<ChangeMessageMutation, ChangeMessageMutationVariables>;

/**
 * __useChangeMessageMutation__
 *
 * To run a mutation, you first call `useChangeMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeMessageMutation, { data, loading, error }] = useChangeMessageMutation({
 *   variables: {
 *      chatid: // value for 'chatid'
 *      messageid: // value for 'messageid'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useChangeMessageMutation(baseOptions?: Apollo.MutationHookOptions<ChangeMessageMutation, ChangeMessageMutationVariables>) {
        return Apollo.useMutation<ChangeMessageMutation, ChangeMessageMutationVariables>(ChangeMessageDocument, baseOptions);
      }
export type ChangeMessageMutationHookResult = ReturnType<typeof useChangeMessageMutation>;
export type ChangeMessageMutationResult = Apollo.MutationResult<ChangeMessageMutation>;
export type ChangeMessageMutationOptions = Apollo.BaseMutationOptions<ChangeMessageMutation, ChangeMessageMutationVariables>;
export const RemoveMessageDocument = gql`
    mutation removeMessage($chatid: ID!, $messageid: ID!) {
  RemoveMessage(chatid: $chatid, messageid: $messageid)
}
    `;
export type RemoveMessageMutationFn = Apollo.MutationFunction<RemoveMessageMutation, RemoveMessageMutationVariables>;

/**
 * __useRemoveMessageMutation__
 *
 * To run a mutation, you first call `useRemoveMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMessageMutation, { data, loading, error }] = useRemoveMessageMutation({
 *   variables: {
 *      chatid: // value for 'chatid'
 *      messageid: // value for 'messageid'
 *   },
 * });
 */
export function useRemoveMessageMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMessageMutation, RemoveMessageMutationVariables>) {
        return Apollo.useMutation<RemoveMessageMutation, RemoveMessageMutationVariables>(RemoveMessageDocument, baseOptions);
      }
export type RemoveMessageMutationHookResult = ReturnType<typeof useRemoveMessageMutation>;
export type RemoveMessageMutationResult = Apollo.MutationResult<RemoveMessageMutation>;
export type RemoveMessageMutationOptions = Apollo.BaseMutationOptions<RemoveMessageMutation, RemoveMessageMutationVariables>;
export const MessagesDocument = gql`
    query messages($chatid: ID!, $messageid: ID, $limit: Int, $isIncoming: Boolean = false) {
  Messages(
    chatid: $chatid
    messageid: $messageid
    limit: $limit
    isIncoming: $isIncoming
  ) {
    Chat {
      ...ChatMessages
      ...LastMessage
    }
    InfoMore {
      ...InfoMore
    }
  }
}
    ${ChatMessagesFragmentDoc}
${LastMessageFragmentDoc}
${InfoMoreFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      chatid: // value for 'chatid'
 *      messageid: // value for 'messageid'
 *      limit: // value for 'limit'
 *      isIncoming: // value for 'isIncoming'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const AddMessageDocument = gql`
    subscription addMessage {
  AddMessage {
    _id
    userid
    text
    date
    isChange
  }
}
    `;

/**
 * __useAddMessageSubscription__
 *
 * To run a query within a React component, call `useAddMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAddMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<AddMessageSubscription, AddMessageSubscriptionVariables>) {
        return Apollo.useSubscription<AddMessageSubscription, AddMessageSubscriptionVariables>(AddMessageDocument, baseOptions);
      }
export type AddMessageSubscriptionHookResult = ReturnType<typeof useAddMessageSubscription>;
export type AddMessageSubscriptionResult = Apollo.SubscriptionResult<AddMessageSubscription>;
export const SwapMessageDocument = gql`
    subscription swapMessage {
  SwapMessage {
    _id
    text
    isChange
  }
}
    `;

/**
 * __useSwapMessageSubscription__
 *
 * To run a query within a React component, call `useSwapMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSwapMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSwapMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSwapMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SwapMessageSubscription, SwapMessageSubscriptionVariables>) {
        return Apollo.useSubscription<SwapMessageSubscription, SwapMessageSubscriptionVariables>(SwapMessageDocument, baseOptions);
      }
export type SwapMessageSubscriptionHookResult = ReturnType<typeof useSwapMessageSubscription>;
export type SwapMessageSubscriptionResult = Apollo.SubscriptionResult<SwapMessageSubscription>;
export const DeleteMessageDocument = gql`
    subscription deleteMessage {
  DeleteMessage {
    _id
  }
}
    `;

/**
 * __useDeleteMessageSubscription__
 *
 * To run a query within a React component, call `useDeleteMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeleteMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDeleteMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<DeleteMessageSubscription, DeleteMessageSubscriptionVariables>) {
        return Apollo.useSubscription<DeleteMessageSubscription, DeleteMessageSubscriptionVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageSubscriptionHookResult = ReturnType<typeof useDeleteMessageSubscription>;
export type DeleteMessageSubscriptionResult = Apollo.SubscriptionResult<DeleteMessageSubscription>;
export const UserDocument = gql`
    query user($id: ID!) {
  User(id: $id) {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserCurrentDocument = gql`
    query userCurrent {
  UserCurrent {
    ...UserInfo
    chats_id
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useUserCurrentQuery__
 *
 * To run a query within a React component, call `useUserCurrentQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCurrentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCurrentQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCurrentQuery(baseOptions?: Apollo.QueryHookOptions<UserCurrentQuery, UserCurrentQueryVariables>) {
        return Apollo.useQuery<UserCurrentQuery, UserCurrentQueryVariables>(UserCurrentDocument, baseOptions);
      }
export function useUserCurrentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCurrentQuery, UserCurrentQueryVariables>) {
          return Apollo.useLazyQuery<UserCurrentQuery, UserCurrentQueryVariables>(UserCurrentDocument, baseOptions);
        }
export type UserCurrentQueryHookResult = ReturnType<typeof useUserCurrentQuery>;
export type UserCurrentLazyQueryHookResult = ReturnType<typeof useUserCurrentLazyQuery>;
export type UserCurrentQueryResult = Apollo.QueryResult<UserCurrentQuery, UserCurrentQueryVariables>;
export const UpdateOnlineUserDocument = gql`
    query updateOnlineUser {
  UpdateOnlineUser
}
    `;

/**
 * __useUpdateOnlineUserQuery__
 *
 * To run a query within a React component, call `useUpdateOnlineUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateOnlineUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateOnlineUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUpdateOnlineUserQuery(baseOptions?: Apollo.QueryHookOptions<UpdateOnlineUserQuery, UpdateOnlineUserQueryVariables>) {
        return Apollo.useQuery<UpdateOnlineUserQuery, UpdateOnlineUserQueryVariables>(UpdateOnlineUserDocument, baseOptions);
      }
export function useUpdateOnlineUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdateOnlineUserQuery, UpdateOnlineUserQueryVariables>) {
          return Apollo.useLazyQuery<UpdateOnlineUserQuery, UpdateOnlineUserQueryVariables>(UpdateOnlineUserDocument, baseOptions);
        }
export type UpdateOnlineUserQueryHookResult = ReturnType<typeof useUpdateOnlineUserQuery>;
export type UpdateOnlineUserLazyQueryHookResult = ReturnType<typeof useUpdateOnlineUserLazyQuery>;
export type UpdateOnlineUserQueryResult = Apollo.QueryResult<UpdateOnlineUserQuery, UpdateOnlineUserQueryVariables>;