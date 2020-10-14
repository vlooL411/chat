import { MockedResponse } from '@apollo/client/testing'

import Create from '../../../Create'
import { User, UserCurrentDocument } from '../../../../generated/graphql-frontend'

export const BarDropMocks: MockedResponse<Record<string, User>>[] = [
  Create.RequestResultQ(UserCurrentDocument, { UserCurrent: Create.user() }),
];
