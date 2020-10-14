import { MockedResponse } from '@apollo/client/testing'

import Create from '../../Create'
import { InviteChatDocument, LeaveChatDocument, RemoveChatDocument } from '../../../generated/graphql-frontend'
import { Chat, Messages, User } from '../../../generated/graphql-frontend'
import { ExplolerMocks } from './Exploler.mock'

//TODO Same ChatExploler.mock
export const ContactExplolerMocks: MockedResponse<
  Record<string, User | Messages | Chat | Chat[]>
>[] = [
  ...ExplolerMocks,
  Create.RequestResultQ(InviteChatDocument, { InviteChat: Create.chat() }),
  Create.RequestResultQ(RemoveChatDocument, { RemoveChat: Create.chat() }),
  Create.RequestResultQ(LeaveChatDocument, { LeaveChat: Create.chat() }),
];
