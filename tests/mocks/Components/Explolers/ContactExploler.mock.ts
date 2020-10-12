import { MockedResponse } from '@apollo/client/testing'

import Create from '../../Create'
import { InviteChatDocument, LeaveChatDocument, RemoveChatDocument } from '../../../../generated/graphql-frontend'
import { Chat, Messages, User } from '../../../../generated/graphql-frontend'
import { ExplolerMocks } from './Exploler.mock'

//TODO Same ChatExploler.mock
export const ContactExplolerMocks: MockedResponse<
  Record<string, User | Messages | Chat | Chat[]>
>[] = [
  ...ExplolerMocks,
  {
    request: { query: InviteChatDocument },
    result: { data: { InviteChat: Create.chat() } },
  },
  {
    request: { query: RemoveChatDocument },
    result: { data: { RemoveChat: Create.chat() } },
  },
  {
    request: { query: LeaveChatDocument },
    result: { data: { RemoveChat: Create.chat() } },
  },
];
