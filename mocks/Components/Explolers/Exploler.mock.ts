import Create from 'mocks/Create';
import { MockedResponse } from '@apollo/client/testing';
import {
	AddMessageDocument,
	ChatDocument,
	DeleteMessageDocument,
	MessagesDocument,
	SwapMessageDocument,
} from '@generated/frontend';
import { ChatQuery, MessagesQuery } from '@generated/frontend';
import { QueryChatArgs, QueryMessagesArgs } from '@generated/frontend';
import {
	AddMessageSubscription,
	DeleteMessageSubscription,
	SwapMessageSubscription,
} from '@generated/frontend';

import { BarExplolerMocks, MockBarExploler } from './Bar/BarExploler.mock';

export type MockExploler =
	| MockBarExploler
	| ChatQuery
	| MessagesQuery
	| SwapMessageSubscription
	| AddMessageSubscription
	| SwapMessageSubscription
	| DeleteMessageSubscription;

const Chat = Create.chat();
export const ExplolerMocks: MockedResponse<MockExploler>[] = [
	...BarExplolerMocks,
	Create.RequestResultF<ChatQuery>(
		{ query: ChatDocument, variables: { chatid: Chat._id } as QueryChatArgs },
		{ Chat },
	),
	Create.RequestResultF<MessagesQuery>(
		{
			query: MessagesDocument,
			variables: {
				chatid: Chat._id,
				limit: 100,
				messageid: null,
				isIncoming: true,
			} as QueryMessagesArgs,
		},
		{ Messages: Create.Messages() },
	),
	Create.QueryResultQ<SwapMessageSubscription>(SwapMessageDocument, {
		SwapMessage: Create.message(),
	}),
	Create.QueryResultQ<AddMessageSubscription>(AddMessageDocument, {
		AddMessage: Create.message(),
	}),
	Create.QueryResultQ<DeleteMessageSubscription>(DeleteMessageDocument, {
		DeleteMessage: Create.message(),
	}),
];
