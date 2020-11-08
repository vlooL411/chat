import { MockedResponse } from '@apollo/client/testing'

import { BarDropMocks, MockBarDrop } from './BarDrop.mock'

export type MockBarExploler = MockBarDrop;

export const BarExplolerMocks: MockedResponse<MockBarExploler>[] = [
  ...BarDropMocks,
];
