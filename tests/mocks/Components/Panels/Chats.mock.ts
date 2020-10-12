import { MockedResponse } from '@apollo/client/testing'

import Create from '../../Create'
import { Chat, User } from '../../../../generated/graphql-frontend'
import {
  AddChatDocument,
  ChatsUserCurrentDocument,
  DeleteChatDocument,
  FindQueryChatDocument,
  SwapMessageDocument,
} from '../../../../generated/graphql-frontend'

export const ChatsMocks: MockedResponse<
  Record<string, Chat[] | User | Chat>
>[] = [
  {
    request: { query: ChatsUserCurrentDocument },
    result: {
      data: {
        Chats: Create.chats(),
        UserCurrent: Create.user(),
      },
    },
  },
  {
    request: {
      query: FindQueryChatDocument,
      variables: { text: "text" },
    },
    result: {
      data: {
        FindMessage: Create.chats(),
        FindChat: Create.chats(),
      },
    },
  },
  {
    request: { query: AddChatDocument },
    result: { data: { AddChat: Create.chat() } },
  },
  {
    request: { query: DeleteChatDocument },
    result: { data: { RemoveChat: Create.chat() } },
  },
  {
    request: { query: SwapMessageDocument },
    result: { data: { SwapMessage: Create.chat() } },
  },
];
