import Create from 'mocks/Create';
import { MockedResponse } from '@apollo/client/testing';
import { UserCurrentDocument } from '@generated/frontend';
import { UserCurrentQuery } from '@generated/frontend';

export type MockBarDrop = UserCurrentQuery;

export const BarDropMocks: MockedResponse<MockBarDrop>[] = [
	Create.QueryResultQ<UserCurrentQuery>(UserCurrentDocument, {
		UserCurrent: Create.user(),
	}),
];
