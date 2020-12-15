import ScrollLoadMore from 'components/Scroll/ScrollLoadMore';
import { ReactElement, useEffect, useState } from 'react';
import { first, last } from '@common/utils';
import { InfoMore, Message, MessagesChatFragment } from '@frontend/types';

import MessageBlock from '../Message/MessageBlock';
import style from './scroll.module.sass';
import { MessageActionMode } from '../Message/MessageAction';

type Props = {
	chat: MessagesChatFragment;
	infoMore: InfoMore;
	loadMess: boolean;
	limit: number;
	scrollLoad: number;
	refetch: (limit: number, id: string) => void;
	changeModeMessage: (action: MessageActionMode) => void;
};

const Scroll = ({
	chat,
	infoMore,
	loadMess,
	limit = 100,
	scrollLoad = 100,
	refetch,
	changeModeMessage,
}: Props): ReactElement => {
	const { scroll } = style;

	const [array, setArray] = useState<Message[]>([]);
	const messages = chat?.messages;

	useEffect(() => {
		if (!messages) return;

		const filter = (): Message[] =>
			[...array, ...messages]
				.filter(
					({ _id }, i, currentArray) =>
						currentArray.findIndex(el => _id == el._id) == i,
				)
				.sort(
					(a, b) =>
						new Date(a.createdAt).getTime() -
						new Date(b.createdAt).getTime(),
				);

		setArray(filter());
	}, [messages]);

	const ScrollElem = (mes: Message, chatid: string): ReactElement => (
		<MessageBlock
			id={mes?._id}
			chatid={chatid}
			message={mes}
			key={mes?._id}
			switchMessageAction={mes =>
				changeModeMessage({ mes, mode: 'change' })
			}
		/>
	);

	const onLoadMoreUp = (isUpdate: boolean): void => {
		const isEndUp = infoMore?.isEndUp;
		if (!isEndUp || loadMess) return;

		const upID = first(array)?._id;
		if (!isUpdate && upID == isEndUp && messages.length > 1) return;

		refetch(-limit, upID);
	};

	const onLoadMoreDown = (isUpdate: boolean): void => {
		const isEndDown = infoMore?.isEndDown;
		if (!isEndDown || loadMess) return;

		const downID = last(array)?._id;
		if (!isUpdate && downID == isEndDown && messages.length > limit) return;

		refetch(limit, downID);
	};

	const chatid = chat?._id;
	return (
		<ScrollLoadMore<Message>
			className={scroll}
			array={array}
			onElemInit={mes => ScrollElem(mes, chatid)}
			scrollUp={scrollLoad}
			scrollDown={scrollLoad}
			onScrollUp={onLoadMoreUp}
			onScrollDown={onLoadMoreDown}
			getFirstElemID={() =>
				localStorage.getItem(`ChatLastMes${chatid}`) ?? null
			}
		/>
	);
};

export default Scroll;
