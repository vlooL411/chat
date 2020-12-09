import Create from 'mocks/Create';
import { MockedResponse } from '@apollo/client/testing';
import { ContactsQuery, FindContactQuery } from '@frontend/types';
import { ContactsDocument, FindContactDocument } from '@frontend/types';

type Mock = ContactsQuery | FindContactQuery;

const user = Create.user();

export const ContactsMocks: MockedResponse<Mock>[] = [
	Create.QueryResultQ<ContactsQuery>(ContactsDocument, {
		Contacts: Create.contacts(user),
	}),
	Create.RequestResult<FindContactQuery>(
		{ query: FindContactDocument, variables: { text: 'text' } },
		{
			FindContacts: {
				Existing: Create.contacts(user),
				Incoming: Create.contactsRandomUser(),
			},
		},
	),
];
