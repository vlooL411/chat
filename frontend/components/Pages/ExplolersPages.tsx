import ChatExploler from 'components/Explolers/ChatExploler';
import ContactExploler from 'components/Explolers/ContactExploler';
import { ReactElement } from 'react';
import { Contact } from '@frontend/types';

import { Panels } from './PanelsPages';

type Props = { panelCurrent: Panels; chatCurrent: string | Contact };

const ExplolersPages = ({ panelCurrent, chatCurrent }: Props): ReactElement => {
	switch (panelCurrent) {
		case Panels.Chats:
			return <ChatExploler chatid={chatCurrent as string} />;
		case Panels.Contacts:
			return <ContactExploler contact={chatCurrent as Contact} />;
		default:
			return null;
	}
};

export default ExplolersPages;
