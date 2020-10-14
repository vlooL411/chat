import { MockedResponse } from '@apollo/client/testing'

import Create from './../../Create'
import { Contact, ContactsDocument, FindContactDocument } from '../../../generated/graphql-frontend'

export const ContactsMocks: MockedResponse<
  Record<string, Contact[] | Contact>
>[] = [
  Create.RequestResultQ(ContactsDocument, { Contacts: Create.contacts() }),
  Create.RequestResult(
    { query: FindContactDocument, variables: { text: "text" } },
    { Existing: Create.contact(), Incoming: Create.contact() }
  ),
];
