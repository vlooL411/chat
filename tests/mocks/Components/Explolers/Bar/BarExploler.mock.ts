import { MockedResponse } from '@apollo/client/testing'

import { User } from '../../../../../generated/graphql-frontend'
import { BarDropMocks } from './BarDrop.mock'

export const BarExplolerMocks: MockedResponse<Record<string, User>>[] = [
  ...BarDropMocks,
];
