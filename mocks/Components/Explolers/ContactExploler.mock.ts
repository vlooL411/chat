import Create from 'mocks/Create'
import { MockedResponse } from '@apollo/client/testing'
import { InviteChatDocument, LeaveChatDocument, RemoveChatDocument } from '@generated/frontend'
import { InviteChatMutation, LeaveChatMutation, RemoveChatMutation } from '@generated/frontend'

import { ExplolerMocks, MockExploler } from './Exploler.mock'

type MockContactExploler =
  | MockExploler
  | InviteChatMutation
  | RemoveChatMutation
  | LeaveChatMutation;

//TODO Same as ChatExploler.mock
export const ContactExplolerMocks: MockedResponse<MockContactExploler>[] = [
  ...ExplolerMocks,
  Create.QueryResultQ<InviteChatMutation>(InviteChatDocument, {
    InviteChat: "invite chat",
  }),
  Create.QueryResultQ<RemoveChatMutation>(RemoveChatDocument, {
    RemoveChat: "remove chat",
  }),
  Create.QueryResultQ<LeaveChatMutation>(LeaveChatDocument, {
    LeaveChat: "leave chat",
  }),
];
