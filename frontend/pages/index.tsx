import CreateChatModal from 'components/CreateChat';
import CreateContactModal from 'components/CreateChat/CreateContactModal';
import ChatExploler from 'components/Explolers/ChatExploler';
import ContactExploler from 'components/Explolers/ContactExploler';
import Chats from 'components/Panels/Chats';
import Contacts from 'components/Panels/Contacts';
import Sidebar from 'components/Sidebar';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import {
	faComment,
	faQuoteRight,
	faSlidersH,
	faUserFriends,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Contact } from '@frontend/types';

enum Panels {
	Chats,
	Contacts,
	Channels,
}

enum CreateChat {
	None,
	Chat,
	Contact,
}

const Index = (): ReactElement => {
	const [panelCurrent, setPanelCurrent] = useState<Panels>(Panels.Chats);
	const [chatIDCurrent, setIDCurrent] = useState<string | Contact>(null!);

	const [createChat, setCreateChat] = useState<CreateChat>(null);

	useEffect(() => {
		const lastPanel: number =
			+localStorage.getItem('Panel') ?? Panels.Chats;

		setPanelCurrent(lastPanel);
	}, []);

	useEffect(() => {
		localStorage.setItem('Panel', panelCurrent.toString());
	}, [panelCurrent]);

	const switchPanel = useMemo<ReactElement>(() => {
		switch (panelCurrent) {
			case Panels.Chats:
				return <Chats onSelectChat={setIDCurrent} />;
			case Panels.Contacts:
				return (
					<Contacts
						onSelectContact={setIDCurrent}
						onCreateContact={() =>
							setCreateChat(CreateChat.Contact)
						}
					/>
				);
			default:
				return null;
		}
	}, [panelCurrent]);

	const switchExploler = useMemo<ReactElement>(() => {
		switch (panelCurrent) {
			case Panels.Chats:
				return <ChatExploler chatid={chatIDCurrent as string} />;
			case Panels.Contacts:
				return <ContactExploler contact={chatIDCurrent as Contact} />;
			default:
				return null;
		}
	}, [chatIDCurrent]);

	const switchCreateChat = useMemo<ReactElement>(() => {
		switch (createChat) {
			case CreateChat.Chat:
				return (
					<CreateChatModal
						onClose={() => setCreateChat(CreateChat.None)}
					/>
				);
			case CreateChat.Contact:
				return (
					<CreateContactModal
						onClose={() => setCreateChat(CreateChat.None)}
					/>
				);
			default:
				return null;
		}
	}, [createChat]);

	const sidebar = useMemo<ReactElement>(
		() => (
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
		),
		[],
	);

	return (
		<div style={{ display: 'flex', height: 'inherit' }}>
			{sidebar}
			{switchPanel}
			{switchExploler}
			{switchCreateChat}
		</div>
	);
};

export default Index;
