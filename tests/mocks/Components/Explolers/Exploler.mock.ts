import { MockedResponse } from '@apollo/client/testing'

import Create from '../../Create'
import {
  AddMessageDocument,
  ChatDocument,
  DeleteMessageDocument,
  MessagesDocument,
  SwapMessageDocument,
} from '../../../../generated/graphql-frontend'
import { Chat, Messages, User } from '../../../../generated/graphql-frontend'
import { BarExplolerMocks } from './Bar/BarExploler.mock'

export const ExplolerMocks: MockedResponse<
  Record<string, User | Messages | Chat>
>[] = [
  ...BarExplolerMocks,
  {
    request: { query: ChatDocument },
    result: { data: { Chat: Create.chat() } },
  },
  {
    request: { query: MessagesDocument },
    result: { data: { Messages: Create.Messages() } },
  },
  {
    request: { query: SwapMessageDocument },
    result: { data: { SwapMessage: Create.chat() } },
  },
  {
    request: { query: AddMessageDocument },
    result: { data: { AddMessage: Create.chat() } },
  },
  {
    request: { query: DeleteMessageDocument },
    result: { data: { DeleteMessage: Create.chat() } },
  },
];
