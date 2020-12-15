import Sidebar from 'components/Sidebar';
import { ReactElement } from 'react';
import {
	faComment,
	faQuoteRight,
	faSlidersH,
	faUserFriends,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';

import { Panels } from './PanelsPages';
import { CreateChat } from './CreateChatPages';

type Props = {
	setPanelCurrent: (panel: Panels) => void;
	setCreateChat: (chat: CreateChat) => void;
};

const SidebarPages = ({
	setPanelCurrent,
	setCreateChat,
}: Props): ReactElement => (
	<Sidebar
		faBlocks={[
			{
				fa: faComment,
				text: 'Chats',
				onClick: () => setPanelCurrent(Panels.Chats),
			},
			{
				fa: faUsers,
				text: 'Contacts',
				onClick: () => setPanelCurrent(Panels.Contacts),
			},
			{
				fa: faQuoteRight,
				text: 'Channels',
				onClick: () => setPanelCurrent(Panels.Channels),
			},
		]}
		extendBlocks={[
			{
				fa: faUserFriends,
				text: 'Create chat',
				onClick: () => setCreateChat(CreateChat.Chat),
			},
			{ fa: faUsers, text: 'Contacts', onClick: () => null },
			{ fa: faSlidersH, text: 'Settings' },
		]}
	/>
);

export default SidebarPages;
