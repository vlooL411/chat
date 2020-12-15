import { ReactElement, useState } from 'react';
import { Contact, useUserUpdateOnlineQuery } from '@frontend/types';

import CreateChatPages from './CreateChatPages';
import ExplolersPages from './ExplolersPages';
import PanelsPages from './PanelsPages';
import SidebarPages from './SidebarPages';
import { useReducer } from './Reducer';

const Pages = (): ReactElement => {
	const [{ panelCurrent, setCreateChat, setPanelCurrent }] = useReducer();
	const [chatCurrent, setChatCurrent] = useState<string | Contact>(null!);

	useUserUpdateOnlineQuery({ fetchPolicy: 'network-only' });

	return (
		<div className='index' style={{ display: 'flex' }}>
			<SidebarPages
				setPanelCurrent={setPanelCurrent}
				setCreateChat={setCreateChat}
			/>
			<PanelsPages
				setChatCurrent={setChatCurrent}
				setCreateChat={setCreateChat}
			/>
			<ExplolersPages
				panelCurrent={panelCurrent}
				chatCurrent={chatCurrent}
			/>
			<CreateChatPages />
		</div>
	);
};

export default Pages;
