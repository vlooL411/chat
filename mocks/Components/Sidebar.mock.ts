import Create from '../../mocks/Create';
import { MockedResponse } from '@apollo/client/testing';
import { User } from 'generated/graphql-frontend';
import { UserCurrentDocument } from 'generated/graphql-frontend';

export const SidebarMocks: MockedResponse<Record<string, User>>[] = [
	Create.QueryResultQ(UserCurrentDocument, { UserCurrent: Create.user() }),
];
