import { MockedResponse } from '@apollo/client/testing'

import Create from '../../Create'
import { Chat, User } from '../../../generated/graphql-frontend'
import {
  AddChatDocument,
  ChatsUserCurrentDocument,
  DeleteChatDocument,
  FindQueryChatDocument,
  SwapMessageDocument,
} from '../../../generated/graphql-frontend'

export const ChatsMocks: MockedResponse<
  Record<string, Chat[] | User | Chat>
>[] = [
  Create.RequestResultQ(ChatsUserCurrentDocument, {
    Chats: Create.chats(),
    UserCurrent: Create.user(),
  }),
  Create.RequestResult(
    { query: FindQueryChatDocument, variables: { text: "text" } },
    { Chats: Create.chats(), UserCurrent: Create.user() }
  ),
  Create.RequestResultQ(AddChatDocument, { AddChat: Create.chat() }),
  Create.RequestResultQ(DeleteChatDocument, { DeleteChat: Create.chat() }),
  Create.RequestResultQ(SwapMessageDocument, { SwapMessage: Create.chat() }),
];
