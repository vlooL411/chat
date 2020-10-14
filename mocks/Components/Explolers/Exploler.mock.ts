import { MockedResponse } from '@apollo/client/testing'

import Create from '../../Create'
import {
  AddMessageDocument,
  ChatDocument,
  DeleteMessageDocument,
  MessagesDocument,
  SwapMessageDocument,
} from '../../../generated/graphql-frontend'
import { Chat, Messages, User } from '../../../generated/graphql-frontend'
import { BarExplolerMocks } from './Bar/BarExploler.mock'

export const ExplolerMocks: MockedResponse<
  Record<string, User | Messages | Chat>
>[] = [
  ...BarExplolerMocks,
  Create.RequestResultQ(ChatDocument, { Chat: Create.chat() }),
  Create.RequestResultQ(MessagesDocument, { Messages: Create.Messages() }),
  Create.RequestResultQ(SwapMessageDocument, { SwapMessage: Create.chat() }),
  Create.RequestResultQ(AddMessageDocument, { AddMessage: Create.chat() }),
  Create.RequestResultQ(DeleteMessageDocument, { DeleteMessage: Create.chat() }),
];
