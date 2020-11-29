import Sidebar from 'components/Sidebar';
import React from 'react';
import {
	faComment,
	faQuoteRight,
	faSlidersH,
	faUserFriends,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { SidebarBlock } from 'components/Sidebar/BlockSidebar';
import { MockedProvider } from '@apollo/client/testing';
import { SidebarMocks } from 'mocks/Components/Sidebar.mock';
import { ReactElement } from 'react';

export default { title: 'Sidebar' };

const faBlocks: SidebarBlock[] = [
	{ fa: faComment, text: 'Chats', href: '', onClick: () => null },
	{ fa: faUsers, text: 'Contacts', href: '', onClick: () => null },
	{ fa: faQuoteRight, text: 'Channels', href: '', onClick: () => null },
];
const extendBlocks: SidebarBlock[] = [
	{ fa: faUserFriends, text: 'Create chat', href: '', onClick: () => null },
	{ fa: faUsers, text: 'Contacts', href: '', onClick: () => null },
	{ fa: faSlidersH, text: 'Settings', href: '', onClick: () => null },
];

export const toStorybook = (): ReactElement => (
	<MockedProvider mocks={SidebarMocks}>
		<Sidebar faBlocks={faBlocks} extendBlocks={extendBlocks} />
	</MockedProvider>
);
