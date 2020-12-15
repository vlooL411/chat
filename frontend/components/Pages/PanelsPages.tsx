import Chats from 'components/Panels/Chats';
import Contacts from 'components/Panels/Contacts';
import { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { Contact } from '@frontend/types';

import { CreateChat } from './CreateChatPages';
import { Action, useReducer } from './Reducer';

export enum Panels {
	Chats,
	Contacts,
	Channels,
}

type Props = {
	setChatCurrent: (chat: string | Contact) => void;
	setCreateChat: (create: CreateChat) => void;
};

const PanelsPages = ({
	setChatCurrent,
	setCreateChat,
}: Props): ReactElement => {
	const [panelCurrent, setPanelCurrent] = useState<Panels>(Panels.Chats);

	const [state, dispatch] = useReducer();

	useEffect(() => {
		const lastPanel: number =
			+localStorage.getItem('Panel') ?? Panels.Chats;

		setPanelCurrent(lastPanel);

		state.setPanelCurrent = setPanelCurrent;
		dispatch(Action.UPDATE);
	}, []);

	useEffect(() => {
		localStorage.setItem('Panel', panelCurrent.toString());
		state.panelCurrent = panelCurrent;
		dispatch(Action.UPDATE);
	}, [panelCurrent]);

	switch (panelCurrent) {
		case Panels.Chats:
			return <Chats onSelectChat={setChatCurrent} />;
		case Panels.Contacts:
			return (
				<Contacts
					onSelectContact={setChatCurrent}
					onCreateContact={() => setCreateChat(CreateChat.Contact)}
				/>
			);
		default:
			return null;
	}
};

export default PanelsPages;
