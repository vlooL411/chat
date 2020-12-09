import Loader from 'components/Loader';
import Search from 'components/Search';
import BlockInfo from 'components/Search/BlockInfo';
import { ReactElement, useState } from 'react';
import {
	Chat,
	ChatFindFragmentFragment,
	Message,
	useChatsQuery,
	useFindQueryChatLazyQuery,
} from '@frontend/types';

import BlockMessage from './BlockMessage';
import style from './styles/panel.module.sass';
import useMore from './useMore';

type Props = { onSelectChat: (id: string) => void };

const Chats = ({ onSelectChat }: Props): ReactElement => {
	const { panel } = style;

	const [state, setState] = useState<{ IsSearch?: boolean; Date?: Date }>({});

	const runFind = (text: string): void => {
		state.IsSearch = true;
		getFind({ variables: { text } });
	};
	const stopFind = (): void => setState({});

	const { loading, data, subscribeToMore } = useChatsQuery();
	useMore(subscribeToMore);
	const [
		getFind,
		{ loading: loadFind, data: dataFind },
	] = useFindQueryChatLazyQuery({ fetchPolicy: 'no-cache' });

	const onFindChatsMess = (text: string) => {
		if (!text) {
			state.Date = null;
			stopFind();
			return;
		}

		const date = new Date();
		state.Date = date;
		setTimeout(() => {
			if (state.Date == date) runFind(text);
		}, 400);
	};

	const BlockMes = (
		chat: ChatFindFragmentFragment,
		message: Partial<Message>,
	): ReactElement => (
		<BlockMessage
			chat={chat}
			message={message}
			onSelectChat={onSelectChat}
		/>
	);

	const Block = (chat: Chat): ReactElement =>
		BlockMes(chat, chat?.lastMessage);

	const dataChats: ChatFindFragmentFragment[] = data?.Chats;
	const dataFindChats = dataFind?.FindChat;
	const dataFindMess = dataFind?.FindMessage;

	const isChatsEmpty: boolean = dataChats?.length == 0;
	const countFindChats: number = dataFindChats?.length;
	const countFindMess: number = dataFindMess?.reduce(
		(sum, { messages }) => sum + (messages ? messages.length : 0),
		0,
	);

	return (
		<div className={panel}>
			<Search
				loading={loadFind}
				onClick={() => null}
				onClear={stopFind}
				onChange={e => onFindChatsMess(e?.target?.value)}
			/>
			<Loader loading={loading} />
			{!state.IsSearch ? (
				isChatsEmpty ? (
					<BlockInfo what={`Chats empty`} />
				) : (
					dataChats?.map(Block)
				)
			) : (
				<>
					<BlockInfo what={`Found chats ${countFindChats ?? 0}`} />
					{dataFindChats?.map(Block)}
					<BlockInfo what={`Found messages ${countFindMess ?? 0}`} />
					{dataFindMess?.map(chat =>
						chat?.messages?.map(mes => BlockMes(chat, mes)),
					)}
				</>
			)}
		</div>
	);
};

export default Chats;
