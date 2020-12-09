import Create from 'mocks/Create';
import { MockedResponse } from '@apollo/client/testing';
import { UserCurrentDocument } from '@frontend/types';
import { UserCurrentQuery } from '@frontend/types';

export type MockBarDrop = UserCurrentQuery;

export const BarDropMocks: MockedResponse<MockBarDrop>[] = [
	Create.QueryResultQ<UserCurrentQuery>(UserCurrentDocument, {
		UserCurrent: Create.user(),
	}),
];
