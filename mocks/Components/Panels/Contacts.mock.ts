import Create from 'mocks/Create'
import { MockedResponse } from '@apollo/client/testing'
import { ContactsQuery, FindContactQuery } from '@generated/frontend'
import { ContactsDocument, FindContactDocument } from '@generated/frontend'

type Mock = ContactsQuery | FindContactQuery;

const user = Create.user();

export const ContactsMocks: MockedResponse<Mock>[] = [
  Create.QueryResultQ<ContactsQuery>(ContactsDocument, {
    Contacts: Create.contacts(user),
  }),
  Create.RequestResult<FindContactQuery>(
    { query: FindContactDocument, variables: { text: "text" } },
    {
      FindContact: {
        Existing: Create.contacts(user),
        Incoming: Create.contactsRandomUser(),
      },
    }
  ),
];
