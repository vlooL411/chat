import { MockedResponse } from '@apollo/client/testing';
import { UserCurrentDocument, UserSafe } from '../../generated/src/types';

import Create from '../Create';

export const SidebarMocks: MockedResponse<Record<string, UserSafe>>[] = [
	Create.QueryResultQ(UserCurrentDocument, { UserCurrent: Create.user() }),
];
