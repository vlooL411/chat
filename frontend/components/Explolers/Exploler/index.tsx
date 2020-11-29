import Loader from 'components/Loader';
import { last, LocalStorage } from '@common/utils';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Chat, MessagesQuery } from '@frontend/types';
import {
	AddMessageDocument,
	AddMessageSubscription,
	DeleteMessageDocument,
	DeleteMessageSubscription,
} from '@frontend/types';
import {
	useChatQuery,
	useMessagesQuery,
	useSwapMessageSubscription,
} from '@frontend/types';

import Scroll from '../Scroll';
import style from './exploler.module.sass';
import BarExploler, { BarProps } from '../Bar/BarExploler';
import MessageAction, { MessageActionMode } from '../Message/MessageAction';

type Props = {
	chatid: string;
	BarProps: (chat: Chat) => BarProps;
	limit?: number;
	scrollLoad?: number;
};

const Exploler = ({
	chatid,
	BarProps,
	limit = 100,
	scrollLoad = 100,
}: Props): ReactElement => {
	const { exploler, scrollcontainer } = style;
	const { down, loader, loader_up, loader_down } = style;

	const [mesActionMode, setMesActionMode] = useState<MessageActionMode>({
		mes: null,
		mode: 'send',
	});

	const { loading, data } = useChatQuery({ variables: { chatid } });
	const {
		data: dataMess,
		loading: loadMess,
		refetch,
		subscribeToMore,
	} = useMessagesQuery({ variables: { chatid } });

	const Refetch = (limit: number, messageid: string, isIncoming = false) =>
		refetch({ chatid, limit, messageid, isIncoming });

	useEffect(() => {
		if (!chatid) return;
		const lastMessageID = LocalStorage.getString(
			'ChatLastMes',
			chatid?.toString(),
		);
		Refetch(limit, lastMessageID, true);
	}, [chatid]);

	//#region Subscribtion
	useSwapMessageSubscription();

	const addMore = () =>
		subscribeToMore({
			document: AddMessageDocument,
			updateQuery: (prev, { subscriptionData, variables }) => {
				const AddMessage = ((subscriptionData?.data as unknown) as AddMessageSubscription)
					?.AddMessage;

				if (!AddMessage) return null;

				const lastMessage = AddMessage;
				const mess = prev?.Messages?.Chat?.messages;
				const lastElemID = last(mess)?._id;

				if (lastElemID == prev?.Messages?.InfoMore?.isEndDown)
					return {
						Messages: {
							Chat: { lastMessage },
							InfoMore: { isEndDown: lastMessage?._id },
						},
					} as MessagesQuery;

				variables.isIncoming = true;
				const messages = mess ? [...mess, AddMessage] : [AddMessage];
				return {
					Messages: {
						Chat: { lastMessage, messages },
						InfoMore: { isEndDown: lastMessage?._id },
					},
				};
			},
		});

	const remMore = () =>
		subscribeToMore({
			document: DeleteMessageDocument,
			updateQuery: (prev, { subscriptionData, variables }) => {
				const DeleteMessage = ((subscriptionData?.data as unknown) as DeleteMessageSubscription)
					?.DeleteMessage;

				if (!DeleteMessage) return null;

				variables.isIncoming = true;
				const messages = prev?.Messages?.Chat?.messages?.filter(
					el => el._id != DeleteMessage._id,
				);
				return { Messages: { Chat: { messages } } };
			},
		});

	useEffect(() => {
		if (!subscribeToMore) return;
		addMore();
		remMore();
	}, []);
	//#endregion

	const chat = data?.Chat;
	const infoMore = dataMess?.Messages?.InfoMore;
	const chatMess = dataMess?.Messages?.Chat;

	const scroll = useMemo(
		() => (
			<Scroll
				chat={chatMess as Chat}
				infoMore={infoMore}
				loadMess={loadMess}
				limit={limit}
				scrollLoad={scrollLoad}
				changeModeMessage={setMesActionMode}
				refetch={Refetch}
			/>
		),
		[infoMore, chatMess],
	);

	const bar = useMemo<ReactElement>(
		() => <BarExploler {...BarProps(chat as Chat)} />,
		[chatid, chat],
	);
	const messageAction = useMemo<ReactElement>(
		() => <MessageAction chatid={chatid} action={mesActionMode} />,
		[chatid, mesActionMode],
	);

	return (
		<div className={exploler}>
			{bar}
			<div className={scrollcontainer}>
				<Loader
					loading={loadMess}
					className={`${loader} ${loader_up}`}
				/>
				{scroll}
				{/* {loadMess || loading ? */}
				<Loader
					loading={loadMess || loading}
					className={`${loader} ${loader_down}`}
				/>{' '}
				{/* : */}
				{/* <FontAwesomeIcon icon={faChevronCircleDown} className={`${down} ${loader} ${loader_down}`} />} */}
			</div>
			{messageAction}
		</div>
	);
};

export default Exploler;
