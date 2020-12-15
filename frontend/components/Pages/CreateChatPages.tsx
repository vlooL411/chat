import CreateChatModal from 'components/CreateChat';
import CreateContactModal from 'components/CreateChat/CreateContactModal';
import { ReactElement, useEffect, useState } from 'react';

import { Action, useReducer } from './Reducer';

export enum CreateChat {
	None,
	Chat,
	Contact,
}

const CreateChatPages = (): ReactElement => {
	const [state, dispatch] = useReducer();
	const [createChat, setCreateChat] = useState<CreateChat>(null);

	useEffect(() => {
		state.setCreateChat = setCreateChat;
		dispatch(Action.UPDATE);
	}, []);

	const onClose = (): void => setCreateChat(CreateChat.None);

	switch (createChat) {
		case CreateChat.Chat:
			return <CreateChatModal onClose={onClose} />;
		case CreateChat.Contact:
			return <CreateContactModal onClose={onClose} />;
		default:
			return null;
	}
};

export default CreateChatPages;
