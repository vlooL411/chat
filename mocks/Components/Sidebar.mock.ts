import { MockedResponse } from '@apollo/client/testing'

import Create from '../Create'
import { User } from '../../generated/graphql-frontend'
import { UserCurrentDocument } from '../../generated/graphql-frontend'

export const SidebarMocks: MockedResponse<Record<string, User>>[] = [
  Create.RequestResultQ(UserCurrentDocument, { UserCurrent: Create.user() }),
];
