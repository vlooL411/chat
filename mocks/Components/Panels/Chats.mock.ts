import Create from 'mocks/Create';
import { MockedResponse } from '@apollo/client/testing';
import {
	AddChatSubscription,
	Chat,
	ChatsUserCurrentQuery,
	DeleteChatSubscription,
	FindQueryChatQuery,
	SwapMessageSubscription,
	User,
} from '@generated/frontend';
import {
	AddChatDocument,
	ChatsUserCurrentDocument,
	DeleteChatDocument,
	FindQueryChatDocument,
	SwapMessageDocument,
} from '@generated/frontend';

type Mock =
	| ChatsUserCurrentQuery
	| FindQueryChatQuery
	| AddChatSubscription
	| DeleteChatSubscription
	| SwapMessageSubscription;

export const ChatsMocks: MockedResponse<Mock>[] = [
	Create.QueryResultQ<ChatsUserCurrentQuery>(ChatsUserCurrentDocument, {
		Chats: Create.chats(),
		UserCurrent: Create.user(),
	}),
	Create.RequestResult<FindQueryChatQuery>(
		{ query: FindQueryChatDocument, variables: { text: 'text' } },
		{ FindChat: Create.chats(), FindMessage: Create.messagesInTheChat() },
	),
	Create.QueryResultQ<AddChatSubscription>(AddChatDocument, {
		AddChat: Create.chat(),
	}),
	Create.QueryResultQ<DeleteChatSubscription>(DeleteChatDocument, {
		DeleteChat: Create.chat(),
	}),
	Create.QueryResultQ<SwapMessageSubscription>(SwapMessageDocument, {
		SwapMessage: Create.message(),
	}),
];
