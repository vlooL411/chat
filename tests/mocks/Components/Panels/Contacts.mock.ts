import { MockedResponse } from '@apollo/client/testing'

import Create from './../../Create'
import { Contact, ContactsDocument, FindContactDocument } from '../../../../generated/graphql-frontend'

export const ContactsMocks: MockedResponse<
  Record<string, Contact[] | Contact>
>[] = [
  {
    request: {
      query: ContactsDocument,
      variables: { first: 4 },
    },
    result: {
      data: {
        Contacts: Create.contacts(),
      },
    },
  },
  {
    request: {
      query: FindContactDocument,
      variables: { text: "text" },
    },
    result: {
      data: {
        Existing: Create.contact(),
        Incoming: Create.contact(),
      },
    },
  },
];
