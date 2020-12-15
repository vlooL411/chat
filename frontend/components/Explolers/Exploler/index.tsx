import Loader from 'components/Loader';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import {
	Chat,
	ChatInfoFragment,
	InfoMore,
	MessagesChatFragment,
	useAddMessageSubscription,
	useDeleteMessageSubscription,
	useMessagesLazyQuery,
} from '@frontend/types';
import { useChatLazyQuery, useSwapMessageSubscription } from '@frontend/types';
import { Errors } from 'utils';

import Scroll from '../Scroll';
import style from './exploler.module.sass';
import useMore from './useMore';
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
	limit = 5,
	scrollLoad = 100,
}: Props): ReactElement => {
	const { exploler, scrollcontainer } = style;
	const { loader, loader_up, loader_down } = style;
	console.log('render Exploler');

	const [mesActionMode, setMesActionMode] = useState<MessageActionMode>({
		mode: 'send',
	});

	const [getChat, { loading, data, error }] = useChatLazyQuery();
	const [
		getMessages,
		{ data: dataMess, loading: loadMess, error: errMess, subscribeToMore },
	] = useMessagesLazyQuery();

	//#region Subscription
	const { error: errSwap } = useSwapMessageSubscription();
	const { error: errAdd } = useAddMessageSubscription();
	const { error: errDel } = useDeleteMessageSubscription();

	useMore(subscribeToMore);
	//#endregion

	Errors('Exploler', error, errMess, errSwap, errAdd, errDel);

	const Refetch = (
		limit: number,
		messageid: string,
		isIncoming = false,
	): void =>
		getMessages({ variables: { chatid, limit, messageid, isIncoming } });

	useEffect(() => {
		if (!chatid) return;

		const lastMessageID =
			localStorage.getItem(`ChatLastMes${chatid?.toString()}`) ?? null;

		getChat({ variables: { chatid } });
		Refetch(limit, lastMessageID, true);
	}, [chatid]);

	const chat: ChatInfoFragment = data?.Chat;
	const infoMore: InfoMore = dataMess?.Messages?.InfoMore;
	const chatMess: MessagesChatFragment = dataMess?.Messages?.Chat;

	const ScrollChat = useMemo<ReactElement>(
		() => (
			<Scroll
				chat={chatMess}
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

	const Bar = useMemo<ReactElement>(
		() => <BarExploler {...BarProps(chat)} />,
		[chatid, chat],
	);
	const MessageAct = useMemo<ReactElement>(
		() => <MessageAction chatid={chatid} action={mesActionMode} />,
		[chatid, mesActionMode],
	);

	return (
		<div className={exploler}>
			{Bar}
			<div className={scrollcontainer}>
				<Loader
					loading={loadMess}
					className={`${loader} ${loader_up}`}
				/>
				{ScrollChat}
				{/* {loadMess || loading ? */}
				<Loader
					loading={loadMess || loading}
					className={`${loader} ${loader_down}`}
				/>
				{/* : */}
				{/* <FontAwesomeIcon icon={faChevronCircleDown} className={`${down} ${loader} ${loader_down}`} />} */}
			</div>
			{MessageAct}
		</div>
	);
};

export default Exploler;
