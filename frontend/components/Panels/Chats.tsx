import Loader from 'components/Loader';
import Search from 'components/Search';
import BlockInfo from 'components/Search/BlockInfo';
import { ID } from '@chat/apollocommon';
import { ReactElement, useEffect, useState } from 'react';
import { WhatDate } from 'components/common/WhatDate';
import {
	AddChatDocument,
	Chat,
	DeleteChatDocument,
	Message,
	useChatsUserCurrentQuery,
	useFindQueryChatLazyQuery,
} from '@frontend/types';

import BlockPanel from './BlockPanel';
import style from './styles/panel.module.sass';

type Props = {
	onSelectChat: (id: ID) => void;
};

const { EMPTY_AVATAR_CHAT } = process.env;
const Chats = ({ onSelectChat }: Props): ReactElement => {
	const { panel } = style;

	const [storage, _] = useState<{ IsSearch: boolean; Date?: Date }>({
		IsSearch: false,
	});
	const runFind = () => (storage.IsSearch = true);
	const stopFind = () => (storage.IsSearch = false);

	const { loading, data, subscribeToMore } = useChatsUserCurrentQuery();
	const [
		getFind,
		{ loading: loadFind, data: dataFind },
	] = useFindQueryChatLazyQuery({ fetchPolicy: 'no-cache' });

	//#region Subscription
	const addMore = () =>
		subscribeToMore({
			document: AddChatDocument,
			updateQuery: (_, { subscriptionData, variables }) => {
				const AddChat = (subscriptionData?.data as any)
					?.AddChat as Chat;
				if (!AddChat) return null;

				variables.isIncoming = true;
				return {
					Chats: [AddChat],
					UserCurrent: { chats_id: [AddChat?._id] },
				} as any;
			},
		});

	const remMore = () =>
		subscribeToMore({
			document: DeleteChatDocument,
			updateQuery: (prev, { subscriptionData, variables }) => {
				const RemoveChat = (subscriptionData?.data as any)
					?.RemoveChat as Chat;
				if (!RemoveChat) return null;
				const chats = prev?.Chats?.filter(
					chat => chat._id != RemoveChat._id,
				);
				const chats_id = (prev as any)?.UserCurrent?.chats_id.filter(
					id => id != RemoveChat._id,
				) as ID[];

				variables.isIncoming = true;
				return {
					Chats: chats,
					UserCurrent: { chats_id: chats_id },
				} as any;
			},
		});

	useEffect(() => {
		if (!subscribeToMore) return;
		addMore();
		remMore();
	}, []);
	//#endregion

	const onFindChatsMess = (text: string) => {
		if (!text) {
			storage.Date = null;
			stopFind();
			return;
		}

		const date = new Date();
		storage.Date = date;
		setTimeout(() => {
			if (storage.Date == date) {
				getFind({ variables: { text } });
				runFind();
			}
		}, 400);
	};

	const blockMes = (chat: Chat, mes: Message): ReactElement => (
		<BlockPanel
			title={chat?.title}
			text={mes?.text}
			image={chat?.image ?? EMPTY_AVATAR_CHAT}
			date={WhatDate(new Date(mes?.date))}
			onClick={() => onSelectChat(chat?._id)}
			key={mes?._id}
		/>
	);

	const block = (chat: Chat): ReactElement =>
		blockMes(chat, chat?.lastMessage);

	const dataChats = data?.Chats;
	const dataFindChats = dataFind?.FindChat;
	const dataFindMess = dataFind?.FindMessage;

	const isChatsEmpty = dataChats?.length == 0;
	const countFindChats = dataFindChats?.length;
	const countFindMess = dataFindMess?.reduce(
		(sum, curr) => sum + (curr?.messages ? curr?.messages.length : 0),
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
			{!storage.IsSearch ? (
				isChatsEmpty ? (
					<BlockInfo what={`Chats empty`} />
				) : (
					dataChats?.map(block)
				)
			) : (
				<>
					<BlockInfo what={`Found chats ${countFindChats ?? 0}`} />
					{dataFindChats?.map(block)}
					<BlockInfo what={`Found messages ${countFindMess ?? 0}`} />
					{dataFindMess?.map(chat =>
						chat?.messages?.map(mes =>
							blockMes(chat as any, mes as any),
						),
					)}
				</>
			)}
		</div>
	);
};

export default Chats;
