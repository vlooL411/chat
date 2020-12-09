import Create from 'mocks/Create';
import { MockedResponse } from '@apollo/client/testing';
import {
	InviteChatMutation,
	LeaveChatMutation,
	RemoveChatMutation,
} from '@frontend/types';
import {
	InviteChatDocument,
	LeaveChatDocument,
	RemoveChatDocument,
} from '@frontend/types';

import { ExplolerMocks, MockExploler } from './Exploler.mock';

type MockChatExploler =
	| MockExploler
	| InviteChatMutation
	| RemoveChatMutation
	| LeaveChatMutation;

export const ChatExplolerMocks: MockedResponse<MockChatExploler>[] = [
	...ExplolerMocks,
	Create.QueryResultQ<InviteChatMutation>(InviteChatDocument, {
		InviteChat: 'invite chat',
	}),
	Create.QueryResultQ<RemoveChatMutation>(RemoveChatDocument, {
		RemoveChat: { _id: 'remove chat' },
	}),
	Create.QueryResultQ<LeaveChatMutation>(LeaveChatDocument, {
		LeaveChat: 'leave chat',
	}),
];
