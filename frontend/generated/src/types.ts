import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	ObjectID: any;
	/** Date custom scalar type */
	Date: any;
	/** Token custom scalar string */
	Token: any;
	/** Password custom scalar type */
	Password: any;
};

export type SocialNetwork = {
	_id: Scalars['ID'];
	auth: Authentication;
	givenName: Scalars['String'];
	familyName: Scalars['String'];
	middleName: Scalars['String'];
	email: Scalars['String'];
};

export type LoginInput = {
	name: Scalars['String'];
	password: Scalars['Password'];
};

export type RegisterInput = {
	name: Scalars['String'];
	email: Scalars['String'];
	password: Scalars['Password'];
};

export type GoogleNetwork = SocialNetwork & {
	__typename?: 'GoogleNetwork';
	_id: Scalars['ID'];
	givenName: Scalars['String'];
	familyName: Scalars['String'];
	middleName: Scalars['String'];
	email: Scalars['String'];
	auth: Authentication;
};

export type FacebookNetwork = SocialNetwork & {
	__typename?: 'FacebookNetwork';
	_id: Scalars['ID'];
	givenName: Scalars['String'];
	familyName: Scalars['String'];
	middleName: Scalars['String'];
	email: Scalars['String'];
	auth: Authentication;
};

export enum TokenType {
	Authentication = 'authentication',
	Access = 'access',
	Refresh = 'refresh',
}

export type Authentication = {
	__typename?: 'Authentication';
	accessToken: Scalars['Token'];
	refreshToken: Scalars['Token'];
};

export type Query = {
	__typename?: 'Query';
	Login: Authentication;
	Refresh: Authentication;
	Chat?: Maybe<Chat>;
	Chats?: Maybe<Array<Maybe<Chat>>>;
	FindChat?: Maybe<Array<Maybe<Chat>>>;
	Contacts?: Maybe<Array<Maybe<Contact>>>;
	FindContacts?: Maybe<Contacts>;
	Messages?: Maybe<Messages>;
	FindMessage?: Maybe<Array<Maybe<Chat>>>;
	User?: Maybe<UserSafe>;
	UserCurrent?: Maybe<UserSafe>;
	UserUpdateOnline?: Maybe<Scalars['String']>;
};

export type QueryLoginArgs = {
	input?: Maybe<LoginInput>;
};

export type QueryRefreshArgs = {
	refreshToken: Scalars['Token'];
};

export type QueryChatArgs = {
	chatid: Scalars['ObjectID'];
};

export type QueryFindChatArgs = {
	title: Scalars['String'];
};

export type QueryFindContactsArgs = {
	text: Scalars['String'];
};

export type QueryMessagesArgs = {
	chatid: Scalars['ObjectID'];
	messageid?: Maybe<Scalars['ObjectID']>;
	limit?: Maybe<Scalars['Int']>;
	isIncoming?: Maybe<Scalars['Boolean']>;
};

export type QueryFindMessageArgs = {
	text: Scalars['String'];
};

export type QueryUserArgs = {
	id: Scalars['ObjectID'];
};

export type Mutation = {
	__typename?: 'Mutation';
	Register?: Maybe<UserSafe>;
	CreateChat?: Maybe<Scalars['String']>;
	InviteChat?: Maybe<Scalars['String']>;
	LeaveChat?: Maybe<Scalars['String']>;
	RemoveChat?: Maybe<Chat>;
	SendMessage?: Maybe<Scalars['String']>;
	ChangeMessage?: Maybe<Scalars['String']>;
	RemoveMessage?: Maybe<Scalars['String']>;
};

export type MutationRegisterArgs = {
	input: RegisterInput;
};

export type MutationCreateChatArgs = {
	title: Scalars['String'];
};

export type MutationInviteChatArgs = {
	chatid: Scalars['ObjectID'];
};

export type MutationLeaveChatArgs = {
	chatid: Scalars['ObjectID'];
};

export type MutationRemoveChatArgs = {
	chatid: Scalars['ObjectID'];
};

export type MutationSendMessageArgs = {
	chatid: Scalars['ObjectID'];
	text: Scalars['String'];
};

export type MutationChangeMessageArgs = {
	chatid: Scalars['ObjectID'];
	messageid: Scalars['ObjectID'];
	text: Scalars['String'];
};

export type MutationRemoveMessageArgs = {
	chatid: Scalars['ObjectID'];
	messageid: Scalars['ObjectID'];
};

export enum Creater {
	Contact = 'Contact',
	Chat = 'Chat',
}

export enum Access {
	Public = 'Public',
	Private = 'Private',
	Squad = 'Squad',
	Duo = 'Duo',
	Own = 'Own',
}

export type Chat = {
	__typename?: 'Chat';
	_id: Scalars['ObjectID'];
	title: Scalars['String'];
	image?: Maybe<Scalars['String']>;
	createdAt: Scalars['Date'];
	creaters_id: Array<Maybe<Scalars['ObjectID']>>;
	creater: Creater;
	access: Access;
	lastMessage?: Maybe<Message>;
	users_id?: Maybe<Array<Maybe<Scalars['ObjectID']>>>;
	messages?: Maybe<Array<Maybe<Message>>>;
};

export type Subscription = {
	__typename?: 'Subscription';
	AddChat?: Maybe<Chat>;
	DeleteChat?: Maybe<Chat>;
	AddMessage: Message;
	SwapMessage: Message;
	DeleteMessage: Message;
};

export type Contact = {
	__typename?: 'Contact';
	_id: Scalars['ObjectID'];
	userid: Scalars['ObjectID'];
	createdAt: Scalars['Date'];
	whoIsContact?: Maybe<Scalars['String']>;
	User?: Maybe<UserSafe>;
};

export type Contacts = {
	__typename?: 'Contacts';
	Existing?: Maybe<Array<Maybe<Contact>>>;
	Incoming?: Maybe<Array<Maybe<Contact>>>;
};

export type InfoMore = {
	__typename?: 'InfoMore';
	_id?: Maybe<Scalars['ObjectID']>;
	isEndUp?: Maybe<Scalars['ObjectID']>;
	isEndDown?: Maybe<Scalars['ObjectID']>;
	lastIndex?: Maybe<Scalars['ObjectID']>;
	size?: Maybe<Scalars['Int']>;
};

export enum TypeResponse {
	Error = 'error',
	Warn = 'warn',
	Success = 'success',
}

export type Response = {
	__typename?: 'Response';
	message: Scalars['String'];
	type: TypeResponse;
};

export type Message = {
	__typename?: 'Message';
	_id: Scalars['ObjectID'];
	userid: Scalars['ObjectID'];
	createdAt: Scalars['Date'];
	text?: Maybe<Scalars['String']>;
	attachments?: Maybe<Array<Maybe<Scalars['String']>>>;
	isSend?: Maybe<Scalars['Boolean']>;
	isRead?: Maybe<Scalars['Boolean']>;
	isChange?: Maybe<Scalars['Boolean']>;
	isFavorite?: Maybe<Scalars['Boolean']>;
};

export type Messages = {
	__typename?: 'Messages';
	Chat: Chat;
	InfoMore?: Maybe<InfoMore>;
};

export enum Provider {
	Auth = 'auth',
	Google = 'google',
	Facebook = 'facebook',
}

export type IUser = {
	_id: Scalars['ObjectID'];
	name: Scalars['String'];
	email: Scalars['String'];
	avatar?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	provider?: Maybe<Provider>;
	auth?: Maybe<Authentication>;
	google?: Maybe<GoogleNetwork>;
	facebook?: Maybe<FacebookNetwork>;
	chats_id?: Maybe<Array<Scalars['ObjectID']>>;
	contacts?: Maybe<Array<Contact>>;
	createdAt: Scalars['Date'];
	dateLastOnline?: Maybe<Scalars['Date']>;
	isOnline?: Maybe<Scalars['Boolean']>;
	isOnlineMobile?: Maybe<Scalars['Boolean']>;
	isClosed?: Maybe<Scalars['Boolean']>;
	isVerified?: Maybe<Scalars['Boolean']>;
	isActivated?: Maybe<Scalars['Boolean']>;
	isLocked?: Maybe<Scalars['Boolean']>;
	isActive?: Maybe<Scalars['Boolean']>;
};

export type UserSafe = IUser & {
	__typename?: 'UserSafe';
	_id: Scalars['ObjectID'];
	name: Scalars['String'];
	email: Scalars['String'];
	avatar?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	provider?: Maybe<Provider>;
	auth?: Maybe<Authentication>;
	google?: Maybe<GoogleNetwork>;
	facebook?: Maybe<FacebookNetwork>;
	chats_id?: Maybe<Array<Scalars['ObjectID']>>;
	contacts?: Maybe<Array<Contact>>;
	createdAt: Scalars['Date'];
	dateLastOnline?: Maybe<Scalars['Date']>;
	isOnline?: Maybe<Scalars['Boolean']>;
	isOnlineMobile?: Maybe<Scalars['Boolean']>;
	isClosed?: Maybe<Scalars['Boolean']>;
	isVerified?: Maybe<Scalars['Boolean']>;
	isActivated?: Maybe<Scalars['Boolean']>;
	isLocked?: Maybe<Scalars['Boolean']>;
	isActive?: Maybe<Scalars['Boolean']>;
};

export type User = IUser & {
	__typename?: 'User';
	password?: Maybe<Scalars['Password']>;
	_id: Scalars['ObjectID'];
	name: Scalars['String'];
	email: Scalars['String'];
	avatar?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	provider?: Maybe<Provider>;
	auth?: Maybe<Authentication>;
	google?: Maybe<GoogleNetwork>;
	facebook?: Maybe<FacebookNetwork>;
	chats_id?: Maybe<Array<Scalars['ObjectID']>>;
	contacts?: Maybe<Array<Contact>>;
	createdAt: Scalars['Date'];
	dateLastOnline?: Maybe<Scalars['Date']>;
	isOnline?: Maybe<Scalars['Boolean']>;
	isOnlineMobile?: Maybe<Scalars['Boolean']>;
	isClosed?: Maybe<Scalars['Boolean']>;
	isVerified?: Maybe<Scalars['Boolean']>;
	isActivated?: Maybe<Scalars['Boolean']>;
	isLocked?: Maybe<Scalars['Boolean']>;
	isActive?: Maybe<Scalars['Boolean']>;
};

export type LoginQueryVariables = Exact<{
	name: Scalars['String'];
	password: Scalars['Password'];
}>;

export type LoginQuery = { __typename?: 'Query' } & {
	Login: { __typename?: 'Authentication' } & Pick<
		Authentication,
		'accessToken' | 'refreshToken'
	>;
};

export type ChatInfoFragment = { __typename?: 'Chat' } & Pick<
	Chat,
	| '_id'
	| 'title'
	| 'image'
	| 'createdAt'
	| 'creater'
	| 'creaters_id'
	| 'access'
>;

export type LastMessageFragment = { __typename?: 'Chat' } & {
	lastMessage?: Maybe<
		{ __typename?: 'Message' } & Pick<Message, '_id' | 'text' | 'createdAt'>
	>;
};

export type InviteChatMutationVariables = Exact<{
	chatid: Scalars['ObjectID'];
}>;

export type InviteChatMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'InviteChat'
>;

export type LeaveChatMutationVariables = Exact<{
	chatid: Scalars['ObjectID'];
}>;

export type LeaveChatMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'LeaveChat'
>;

export type RemoveChatMutationVariables = Exact<{
	chatid: Scalars['ObjectID'];
}>;

export type RemoveChatMutation = { __typename?: 'Mutation' } & {
	RemoveChat?: Maybe<{ __typename?: 'Chat' } & Pick<Chat, '_id'>>;
};

export type CreateChatMutationVariables = Exact<{
	title: Scalars['String'];
}>;

export type CreateChatMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'CreateChat'
>;

export type ChatQueryVariables = Exact<{
	chatid: Scalars['ObjectID'];
}>;

export type ChatQuery = { __typename?: 'Query' } & {
	Chat?: Maybe<
		{ __typename?: 'Chat' } & ChatInfoFragment & LastMessageFragment
	>;
};

export type ChatsQueryVariables = Exact<{ [key: string]: never }>;

export type ChatsQuery = { __typename?: 'Query' } & {
	Chats?: Maybe<
		Array<
			Maybe<
				{ __typename?: 'Chat' } & ChatInfoFragment & LastMessageFragment
			>
		>
	>;
};

export type AddChatSubscriptionVariables = Exact<{ [key: string]: never }>;

export type AddChatSubscription = { __typename?: 'Subscription' } & {
	AddChat?: Maybe<
		{ __typename?: 'Chat' } & ChatInfoFragment & LastMessageFragment
	>;
};

export type DeleteChatSubscriptionVariables = Exact<{ [key: string]: never }>;

export type DeleteChatSubscription = { __typename?: 'Subscription' } & {
	DeleteChat?: Maybe<{ __typename?: 'Chat' } & Pick<Chat, '_id'>>;
};

export type ChatsUserCurrentQueryVariables = Exact<{ [key: string]: never }>;

export type ChatsUserCurrentQuery = { __typename?: 'Query' } & {
	Chats?: Maybe<
		Array<
			Maybe<
				{ __typename?: 'Chat' } & ChatInfoFragment & LastMessageFragment
			>
		>
	>;
	UserCurrent?: Maybe<
		{ __typename?: 'UserSafe' } & Pick<UserSafe, '_id' | 'chats_id'>
	>;
};

export type FindQueryChatQueryVariables = Exact<{
	text: Scalars['String'];
}>;

export type FindQueryChatQuery = { __typename?: 'Query' } & {
	FindMessage?: Maybe<
		Array<Maybe<{ __typename?: 'Chat' } & ChatFindFragmentFragment>>
	>;
	FindChat?: Maybe<
		Array<Maybe<{ __typename?: 'Chat' } & ChatFindFragmentFragment>>
	>;
};

export type ChatFindFragmentFragment = { __typename?: 'Chat' } & {
	messages?: Maybe<
		Array<
			Maybe<
				{ __typename?: 'Message' } & Pick<
					Message,
					'_id' | 'text' | 'createdAt'
				>
			>
		>
	>;
} & ChatInfoFragment &
	LastMessageFragment;

export type ContactInfoFragment = { __typename?: 'Contact' } & Pick<
	Contact,
	'_id' | 'userid' | 'createdAt' | 'whoIsContact'
> & { User?: Maybe<{ __typename?: 'UserSafe' } & UserInfoFragment> };

export type ContactsQueryVariables = Exact<{ [key: string]: never }>;

export type ContactsQuery = { __typename?: 'Query' } & {
	Contacts?: Maybe<
		Array<Maybe<{ __typename?: 'Contact' } & ContactInfoFragment>>
	>;
};

export type FindContactQueryVariables = Exact<{
	text: Scalars['String'];
}>;

export type FindContactQuery = { __typename?: 'Query' } & {
	FindContacts?: Maybe<
		{ __typename?: 'Contacts' } & {
			Existing?: Maybe<
				Array<Maybe<{ __typename?: 'Contact' } & ContactInfoFragment>>
			>;
			Incoming?: Maybe<
				Array<Maybe<{ __typename?: 'Contact' } & ContactInfoFragment>>
			>;
		}
	>;
};

export type MessagesChatFragment = { __typename?: 'Chat' } & {
	messages?: Maybe<
		Array<
			Maybe<
				{ __typename?: 'Message' } & Pick<
					Message,
					'_id' | 'userid' | 'text' | 'createdAt' | 'isChange'
				>
			>
		>
	>;
};

export type SendMessageMutationVariables = Exact<{
	chatid: Scalars['ObjectID'];
	text: Scalars['String'];
}>;

export type SendMessageMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'SendMessage'
>;

export type ChangeMessageMutationVariables = Exact<{
	chatid: Scalars['ObjectID'];
	messageid: Scalars['ObjectID'];
	text: Scalars['String'];
}>;

export type ChangeMessageMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'ChangeMessage'
>;

export type RemoveMessageMutationVariables = Exact<{
	chatid: Scalars['ObjectID'];
	messageid: Scalars['ObjectID'];
}>;

export type RemoveMessageMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'RemoveMessage'
>;

export type MessagesQueryVariables = Exact<{
	chatid: Scalars['ObjectID'];
	messageid?: Maybe<Scalars['ObjectID']>;
	limit?: Maybe<Scalars['Int']>;
	isIncoming?: Maybe<Scalars['Boolean']>;
}>;

export type MessagesQuery = { __typename?: 'Query' } & {
	Messages?: Maybe<
		{ __typename?: 'Messages' } & {
			Chat: { __typename?: 'Chat' } & MessagesChatFragment &
				LastMessageFragment;
			InfoMore?: Maybe<{ __typename?: 'InfoMore' } & InfoMoreFragment>;
		}
	>;
};

export type AddMessageSubscriptionVariables = Exact<{ [key: string]: never }>;

export type AddMessageSubscription = { __typename?: 'Subscription' } & {
	AddMessage: { __typename?: 'Message' } & Pick<
		Message,
		'_id' | 'userid' | 'text' | 'createdAt' | 'isChange'
	>;
};

export type SwapMessageSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SwapMessageSubscription = { __typename?: 'Subscription' } & {
	SwapMessage: { __typename?: 'Message' } & Pick<
		Message,
		'_id' | 'text' | 'isChange'
	>;
};

export type DeleteMessageSubscriptionVariables = Exact<{
	[key: string]: never;
}>;

export type DeleteMessageSubscription = { __typename?: 'Subscription' } & {
	DeleteMessage: { __typename?: 'Message' } & Pick<Message, '_id'>;
};

export type UserInfoFragment = { __typename?: 'UserSafe' } & Pick<
	UserSafe,
	| '_id'
	| 'name'
	| 'avatar'
	| 'status'
	| 'isClosed'
	| 'isOnlineMobile'
	| 'dateLastOnline'
>;

export type UserQueryVariables = Exact<{
	id: Scalars['ObjectID'];
}>;

export type UserQuery = { __typename?: 'Query' } & {
	User?: Maybe<{ __typename?: 'UserSafe' } & UserInfoFragment>;
};

export type UserCurrentQueryVariables = Exact<{ [key: string]: never }>;

export type UserCurrentQuery = { __typename?: 'Query' } & {
	UserCurrent?: Maybe<
		{ __typename?: 'UserSafe' } & Pick<UserSafe, 'chats_id'> &
			UserInfoFragment
	>;
};

export type InfoMoreFragment = { __typename?: 'InfoMore' } & Pick<
	InfoMore,
	'_id' | 'size' | 'isEndUp' | 'isEndDown' | 'lastIndex'
>;

export const ChatInfoFragmentDoc = gql`
	fragment ChatInfo on Chat {
		_id
		title
		image
		createdAt
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
			createdAt
		}
	}
`;
export const ChatFindFragmentFragmentDoc = gql`
	fragment chatFindFragment on Chat {
		...ChatInfo
		messages {
			_id
			text
			createdAt
		}
		...LastMessage
	}
	${ChatInfoFragmentDoc}
	${LastMessageFragmentDoc}
`;
export const UserInfoFragmentDoc = gql`
	fragment UserInfo on UserSafe {
		_id
		name
		avatar
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
		createdAt
		whoIsContact
		User {
			...UserInfo
		}
	}
	${UserInfoFragmentDoc}
`;
export const MessagesChatFragmentDoc = gql`
	fragment MessagesChat on Chat {
		messages {
			_id
			userid
			text
			createdAt
			isChange
		}
	}
`;
export const InfoMoreFragmentDoc = gql`
	fragment InfoMore on InfoMore {
		_id
		size
		isEndUp
		isEndDown
		lastIndex
	}
`;
export const LoginDocument = gql`
	query Login($name: String!, $password: Password!) {
		Login(input: { name: $name, password: $password }) {
			accessToken
			refreshToken
		}
	}
`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(
	baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>,
) {
	return Apollo.useQuery<LoginQuery, LoginQueryVariables>(
		LoginDocument,
		baseOptions,
	);
}
export function useLoginLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>,
) {
	return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(
		LoginDocument,
		baseOptions,
	);
}
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<
	LoginQuery,
	LoginQueryVariables
>;
export const InviteChatDocument = gql`
	mutation inviteChat($chatid: ObjectID!) {
		InviteChat(chatid: $chatid)
	}
`;
export type InviteChatMutationFn = Apollo.MutationFunction<
	InviteChatMutation,
	InviteChatMutationVariables
>;

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
export function useInviteChatMutation(
	baseOptions?: Apollo.MutationHookOptions<
		InviteChatMutation,
		InviteChatMutationVariables
	>,
) {
	return Apollo.useMutation<InviteChatMutation, InviteChatMutationVariables>(
		InviteChatDocument,
		baseOptions,
	);
}
export type InviteChatMutationHookResult = ReturnType<
	typeof useInviteChatMutation
>;
export type InviteChatMutationResult = Apollo.MutationResult<InviteChatMutation>;
export type InviteChatMutationOptions = Apollo.BaseMutationOptions<
	InviteChatMutation,
	InviteChatMutationVariables
>;
export const LeaveChatDocument = gql`
	mutation leaveChat($chatid: ObjectID!) {
		LeaveChat(chatid: $chatid)
	}
`;
export type LeaveChatMutationFn = Apollo.MutationFunction<
	LeaveChatMutation,
	LeaveChatMutationVariables
>;

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
export function useLeaveChatMutation(
	baseOptions?: Apollo.MutationHookOptions<
		LeaveChatMutation,
		LeaveChatMutationVariables
	>,
) {
	return Apollo.useMutation<LeaveChatMutation, LeaveChatMutationVariables>(
		LeaveChatDocument,
		baseOptions,
	);
}
export type LeaveChatMutationHookResult = ReturnType<
	typeof useLeaveChatMutation
>;
export type LeaveChatMutationResult = Apollo.MutationResult<LeaveChatMutation>;
export type LeaveChatMutationOptions = Apollo.BaseMutationOptions<
	LeaveChatMutation,
	LeaveChatMutationVariables
>;
export const RemoveChatDocument = gql`
	mutation removeChat($chatid: ObjectID!) {
		RemoveChat(chatid: $chatid) {
			_id
		}
	}
`;
export type RemoveChatMutationFn = Apollo.MutationFunction<
	RemoveChatMutation,
	RemoveChatMutationVariables
>;

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
export function useRemoveChatMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RemoveChatMutation,
		RemoveChatMutationVariables
	>,
) {
	return Apollo.useMutation<RemoveChatMutation, RemoveChatMutationVariables>(
		RemoveChatDocument,
		baseOptions,
	);
}
export type RemoveChatMutationHookResult = ReturnType<
	typeof useRemoveChatMutation
>;
export type RemoveChatMutationResult = Apollo.MutationResult<RemoveChatMutation>;
export type RemoveChatMutationOptions = Apollo.BaseMutationOptions<
	RemoveChatMutation,
	RemoveChatMutationVariables
>;
export const CreateChatDocument = gql`
	mutation createChat($title: String!) {
		CreateChat(title: $title)
	}
`;
export type CreateChatMutationFn = Apollo.MutationFunction<
	CreateChatMutation,
	CreateChatMutationVariables
>;

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
export function useCreateChatMutation(
	baseOptions?: Apollo.MutationHookOptions<
		CreateChatMutation,
		CreateChatMutationVariables
	>,
) {
	return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(
		CreateChatDocument,
		baseOptions,
	);
}
export type CreateChatMutationHookResult = ReturnType<
	typeof useCreateChatMutation
>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<
	CreateChatMutation,
	CreateChatMutationVariables
>;
export const ChatDocument = gql`
	query chat($chatid: ObjectID!) {
		Chat(chatid: $chatid) {
			...ChatInfo
			...LastMessage
		}
	}
	${ChatInfoFragmentDoc}
	${LastMessageFragmentDoc}
`;

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
export function useChatQuery(
	baseOptions: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>,
) {
	return Apollo.useQuery<ChatQuery, ChatQueryVariables>(
		ChatDocument,
		baseOptions,
	);
}
export function useChatLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>,
) {
	return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(
		ChatDocument,
		baseOptions,
	);
}
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const ChatsDocument = gql`
	query chats {
		Chats {
			...ChatInfo
			...LastMessage
		}
	}
	${ChatInfoFragmentDoc}
	${LastMessageFragmentDoc}
`;

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
 *   },
 * });
 */
export function useChatsQuery(
	baseOptions?: Apollo.QueryHookOptions<ChatsQuery, ChatsQueryVariables>,
) {
	return Apollo.useQuery<ChatsQuery, ChatsQueryVariables>(
		ChatsDocument,
		baseOptions,
	);
}
export function useChatsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>,
) {
	return Apollo.useLazyQuery<ChatsQuery, ChatsQueryVariables>(
		ChatsDocument,
		baseOptions,
	);
}
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<
	ChatsQuery,
	ChatsQueryVariables
>;
export const AddChatDocument = gql`
	subscription addChat {
		AddChat {
			...ChatInfo
			...LastMessage
		}
	}
	${ChatInfoFragmentDoc}
	${LastMessageFragmentDoc}
`;

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
export function useAddChatSubscription(
	baseOptions?: Apollo.SubscriptionHookOptions<
		AddChatSubscription,
		AddChatSubscriptionVariables
	>,
) {
	return Apollo.useSubscription<
		AddChatSubscription,
		AddChatSubscriptionVariables
	>(AddChatDocument, baseOptions);
}
export type AddChatSubscriptionHookResult = ReturnType<
	typeof useAddChatSubscription
>;
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
export function useDeleteChatSubscription(
	baseOptions?: Apollo.SubscriptionHookOptions<
		DeleteChatSubscription,
		DeleteChatSubscriptionVariables
	>,
) {
	return Apollo.useSubscription<
		DeleteChatSubscription,
		DeleteChatSubscriptionVariables
	>(DeleteChatDocument, baseOptions);
}
export type DeleteChatSubscriptionHookResult = ReturnType<
	typeof useDeleteChatSubscription
>;
export type DeleteChatSubscriptionResult = Apollo.SubscriptionResult<DeleteChatSubscription>;
export const ChatsUserCurrentDocument = gql`
	query chatsUserCurrent {
		Chats {
			...ChatInfo
			...LastMessage
		}
		UserCurrent {
			_id
			chats_id
		}
	}
	${ChatInfoFragmentDoc}
	${LastMessageFragmentDoc}
`;

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
 *   },
 * });
 */
export function useChatsUserCurrentQuery(
	baseOptions?: Apollo.QueryHookOptions<
		ChatsUserCurrentQuery,
		ChatsUserCurrentQueryVariables
	>,
) {
	return Apollo.useQuery<
		ChatsUserCurrentQuery,
		ChatsUserCurrentQueryVariables
	>(ChatsUserCurrentDocument, baseOptions);
}
export function useChatsUserCurrentLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ChatsUserCurrentQuery,
		ChatsUserCurrentQueryVariables
	>,
) {
	return Apollo.useLazyQuery<
		ChatsUserCurrentQuery,
		ChatsUserCurrentQueryVariables
	>(ChatsUserCurrentDocument, baseOptions);
}
export type ChatsUserCurrentQueryHookResult = ReturnType<
	typeof useChatsUserCurrentQuery
>;
export type ChatsUserCurrentLazyQueryHookResult = ReturnType<
	typeof useChatsUserCurrentLazyQuery
>;
export type ChatsUserCurrentQueryResult = Apollo.QueryResult<
	ChatsUserCurrentQuery,
	ChatsUserCurrentQueryVariables
>;
export const FindQueryChatDocument = gql`
	query findQueryChat($text: String!) {
		FindMessage(text: $text) {
			...chatFindFragment
		}
		FindChat(title: $text) {
			...chatFindFragment
		}
	}
	${ChatFindFragmentFragmentDoc}
`;

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
export function useFindQueryChatQuery(
	baseOptions: Apollo.QueryHookOptions<
		FindQueryChatQuery,
		FindQueryChatQueryVariables
	>,
) {
	return Apollo.useQuery<FindQueryChatQuery, FindQueryChatQueryVariables>(
		FindQueryChatDocument,
		baseOptions,
	);
}
export function useFindQueryChatLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		FindQueryChatQuery,
		FindQueryChatQueryVariables
	>,
) {
	return Apollo.useLazyQuery<FindQueryChatQuery, FindQueryChatQueryVariables>(
		FindQueryChatDocument,
		baseOptions,
	);
}
export type FindQueryChatQueryHookResult = ReturnType<
	typeof useFindQueryChatQuery
>;
export type FindQueryChatLazyQueryHookResult = ReturnType<
	typeof useFindQueryChatLazyQuery
>;
export type FindQueryChatQueryResult = Apollo.QueryResult<
	FindQueryChatQuery,
	FindQueryChatQueryVariables
>;
export const ContactsDocument = gql`
	query contacts {
		Contacts {
			...ContactInfo
		}
	}
	${ContactInfoFragmentDoc}
`;

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
export function useContactsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		ContactsQuery,
		ContactsQueryVariables
	>,
) {
	return Apollo.useQuery<ContactsQuery, ContactsQueryVariables>(
		ContactsDocument,
		baseOptions,
	);
}
export function useContactsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		ContactsQuery,
		ContactsQueryVariables
	>,
) {
	return Apollo.useLazyQuery<ContactsQuery, ContactsQueryVariables>(
		ContactsDocument,
		baseOptions,
	);
}
export type ContactsQueryHookResult = ReturnType<typeof useContactsQuery>;
export type ContactsLazyQueryHookResult = ReturnType<
	typeof useContactsLazyQuery
>;
export type ContactsQueryResult = Apollo.QueryResult<
	ContactsQuery,
	ContactsQueryVariables
>;
export const FindContactDocument = gql`
	query findContact($text: String!) {
		FindContacts(text: $text) {
			Existing {
				...ContactInfo
			}
			Incoming {
				...ContactInfo
			}
		}
	}
	${ContactInfoFragmentDoc}
`;

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
export function useFindContactQuery(
	baseOptions: Apollo.QueryHookOptions<
		FindContactQuery,
		FindContactQueryVariables
	>,
) {
	return Apollo.useQuery<FindContactQuery, FindContactQueryVariables>(
		FindContactDocument,
		baseOptions,
	);
}
export function useFindContactLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		FindContactQuery,
		FindContactQueryVariables
	>,
) {
	return Apollo.useLazyQuery<FindContactQuery, FindContactQueryVariables>(
		FindContactDocument,
		baseOptions,
	);
}
export type FindContactQueryHookResult = ReturnType<typeof useFindContactQuery>;
export type FindContactLazyQueryHookResult = ReturnType<
	typeof useFindContactLazyQuery
>;
export type FindContactQueryResult = Apollo.QueryResult<
	FindContactQuery,
	FindContactQueryVariables
>;
export const SendMessageDocument = gql`
	mutation sendMessage($chatid: ObjectID!, $text: String!) {
		SendMessage(chatid: $chatid, text: $text)
	}
`;
export type SendMessageMutationFn = Apollo.MutationFunction<
	SendMessageMutation,
	SendMessageMutationVariables
>;

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
export function useSendMessageMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SendMessageMutation,
		SendMessageMutationVariables
	>,
) {
	return Apollo.useMutation<
		SendMessageMutation,
		SendMessageMutationVariables
	>(SendMessageDocument, baseOptions);
}
export type SendMessageMutationHookResult = ReturnType<
	typeof useSendMessageMutation
>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<
	SendMessageMutation,
	SendMessageMutationVariables
>;
export const ChangeMessageDocument = gql`
	mutation changeMessage(
		$chatid: ObjectID!
		$messageid: ObjectID!
		$text: String!
	) {
		ChangeMessage(chatid: $chatid, messageid: $messageid, text: $text)
	}
`;
export type ChangeMessageMutationFn = Apollo.MutationFunction<
	ChangeMessageMutation,
	ChangeMessageMutationVariables
>;

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
export function useChangeMessageMutation(
	baseOptions?: Apollo.MutationHookOptions<
		ChangeMessageMutation,
		ChangeMessageMutationVariables
	>,
) {
	return Apollo.useMutation<
		ChangeMessageMutation,
		ChangeMessageMutationVariables
	>(ChangeMessageDocument, baseOptions);
}
export type ChangeMessageMutationHookResult = ReturnType<
	typeof useChangeMessageMutation
>;
export type ChangeMessageMutationResult = Apollo.MutationResult<ChangeMessageMutation>;
export type ChangeMessageMutationOptions = Apollo.BaseMutationOptions<
	ChangeMessageMutation,
	ChangeMessageMutationVariables
>;
export const RemoveMessageDocument = gql`
	mutation removeMessage($chatid: ObjectID!, $messageid: ObjectID!) {
		RemoveMessage(chatid: $chatid, messageid: $messageid)
	}
`;
export type RemoveMessageMutationFn = Apollo.MutationFunction<
	RemoveMessageMutation,
	RemoveMessageMutationVariables
>;

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
export function useRemoveMessageMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RemoveMessageMutation,
		RemoveMessageMutationVariables
	>,
) {
	return Apollo.useMutation<
		RemoveMessageMutation,
		RemoveMessageMutationVariables
	>(RemoveMessageDocument, baseOptions);
}
export type RemoveMessageMutationHookResult = ReturnType<
	typeof useRemoveMessageMutation
>;
export type RemoveMessageMutationResult = Apollo.MutationResult<RemoveMessageMutation>;
export type RemoveMessageMutationOptions = Apollo.BaseMutationOptions<
	RemoveMessageMutation,
	RemoveMessageMutationVariables
>;
export const MessagesDocument = gql`
	query messages(
		$chatid: ObjectID!
		$messageid: ObjectID
		$limit: Int
		$isIncoming: Boolean = false
	) {
		Messages(
			chatid: $chatid
			messageid: $messageid
			limit: $limit
			isIncoming: $isIncoming
		) {
			Chat {
				...MessagesChat
				...LastMessage
			}
			InfoMore {
				...InfoMore
			}
		}
	}
	${MessagesChatFragmentDoc}
	${LastMessageFragmentDoc}
	${InfoMoreFragmentDoc}
`;

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
export function useMessagesQuery(
	baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>,
) {
	return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(
		MessagesDocument,
		baseOptions,
	);
}
export function useMessagesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		MessagesQuery,
		MessagesQueryVariables
	>,
) {
	return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(
		MessagesDocument,
		baseOptions,
	);
}
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<
	typeof useMessagesLazyQuery
>;
export type MessagesQueryResult = Apollo.QueryResult<
	MessagesQuery,
	MessagesQueryVariables
>;
export const AddMessageDocument = gql`
	subscription addMessage {
		AddMessage {
			_id
			userid
			text
			createdAt
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
export function useAddMessageSubscription(
	baseOptions?: Apollo.SubscriptionHookOptions<
		AddMessageSubscription,
		AddMessageSubscriptionVariables
	>,
) {
	return Apollo.useSubscription<
		AddMessageSubscription,
		AddMessageSubscriptionVariables
	>(AddMessageDocument, baseOptions);
}
export type AddMessageSubscriptionHookResult = ReturnType<
	typeof useAddMessageSubscription
>;
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
export function useSwapMessageSubscription(
	baseOptions?: Apollo.SubscriptionHookOptions<
		SwapMessageSubscription,
		SwapMessageSubscriptionVariables
	>,
) {
	return Apollo.useSubscription<
		SwapMessageSubscription,
		SwapMessageSubscriptionVariables
	>(SwapMessageDocument, baseOptions);
}
export type SwapMessageSubscriptionHookResult = ReturnType<
	typeof useSwapMessageSubscription
>;
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
export function useDeleteMessageSubscription(
	baseOptions?: Apollo.SubscriptionHookOptions<
		DeleteMessageSubscription,
		DeleteMessageSubscriptionVariables
	>,
) {
	return Apollo.useSubscription<
		DeleteMessageSubscription,
		DeleteMessageSubscriptionVariables
	>(DeleteMessageDocument, baseOptions);
}
export type DeleteMessageSubscriptionHookResult = ReturnType<
	typeof useDeleteMessageSubscription
>;
export type DeleteMessageSubscriptionResult = Apollo.SubscriptionResult<DeleteMessageSubscription>;
export const UserDocument = gql`
	query user($id: ObjectID!) {
		User(id: $id) {
			...UserInfo
		}
	}
	${UserInfoFragmentDoc}
`;

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
export function useUserQuery(
	baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>,
) {
	return Apollo.useQuery<UserQuery, UserQueryVariables>(
		UserDocument,
		baseOptions,
	);
}
export function useUserLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
	return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
		UserDocument,
		baseOptions,
	);
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
	${UserInfoFragmentDoc}
`;

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
export function useUserCurrentQuery(
	baseOptions?: Apollo.QueryHookOptions<
		UserCurrentQuery,
		UserCurrentQueryVariables
	>,
) {
	return Apollo.useQuery<UserCurrentQuery, UserCurrentQueryVariables>(
		UserCurrentDocument,
		baseOptions,
	);
}
export function useUserCurrentLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		UserCurrentQuery,
		UserCurrentQueryVariables
	>,
) {
	return Apollo.useLazyQuery<UserCurrentQuery, UserCurrentQueryVariables>(
		UserCurrentDocument,
		baseOptions,
	);
}
export type UserCurrentQueryHookResult = ReturnType<typeof useUserCurrentQuery>;
export type UserCurrentLazyQueryHookResult = ReturnType<
	typeof useUserCurrentLazyQuery
>;
export type UserCurrentQueryResult = Apollo.QueryResult<
	UserCurrentQuery,
	UserCurrentQueryVariables
>;
