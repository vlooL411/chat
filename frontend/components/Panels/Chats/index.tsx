import Loader from 'components/Loader';
import BlockInfo from 'components/Search/BlockInfo';
import SearchControl from 'components/Search/Control';
import { ReactElement } from 'react';
import {
	Chat,
	ChatFindFragmentFragment,
	Message,
	useChatsQuery,
	useFindQueryChatLazyQuery,
} from '@frontend/types';

import style from '../styles/panel.module.sass';
import BlockMessage from './BlockMessage';
import useMore from './useMore';

type Props = { onSelectChat: (id: string) => void };

const Chats = ({ onSelectChat }: Props): ReactElement => {
	const { panel } = style;

	const { loading, data, subscribeToMore } = useChatsQuery();
	useMore(subscribeToMore);

	const [
		getFind,
		{ loading: loadFind, data: dataFind },
	] = useFindQueryChatLazyQuery({ fetchPolicy: 'no-cache' });
	const onRunFind = (text: string): void => getFind({ variables: { text } });

	const BlockMes = (
		chat: ChatFindFragmentFragment,
		message: Partial<Message>,
	): ReactElement => (
		<BlockMessage
			chat={chat}
			message={message}
			onSelectChat={onSelectChat}
			key={chat._id}
		/>
	);

	const Block = (chat: Chat): ReactElement =>
		BlockMes(chat, chat?.lastMessage);

	const dataChats: ChatFindFragmentFragment[] = data?.Chats;
	const dataFindChats = dataFind?.FindChat;
	const dataFindMess = dataFind?.FindMessage;

	const isChatsEmpty: boolean = dataChats?.length == 0;
	const countFindChats: number = dataFindChats?.length ?? 0;
	const countFindMess: number = dataFindMess?.reduce(
		(sum, { messages }) => sum + (messages ? messages.length : 0),
		0,
	);

	return (
		<SearchControl className={panel} loading={loadFind} onRun={onRunFind}>
			<>
				<BlockInfo what={`Found chats ${countFindChats}`} />
				{dataFindChats?.map(Block)}
				<BlockInfo what={`Found messages ${countFindMess}`} />
				{dataFindMess?.map(chat =>
					chat?.messages?.map(mes => BlockMes(chat, mes)),
				)}
			</>
			<>
				<Loader loading={loading} />
				{isChatsEmpty ? (
					<BlockInfo what={`Chats empty`} />
				) : (
					dataChats?.map(Block)
				)}
			</>
		</SearchControl>
	);
};

export default Chats;
