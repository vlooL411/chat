import Loader from 'components/Loader';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Chat } from '@frontend/types';
import {
	useChatQuery,
	useMessagesQuery,
	useSwapMessageSubscription,
} from '@frontend/types';

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
	limit = 100,
	scrollLoad = 100,
}: Props): ReactElement => {
	const { exploler, scrollcontainer } = style;
	const { loader, loader_up, loader_down } = style;

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
	useSwapMessageSubscription();

	useMore(subscribeToMore);

	const Refetch = (
		limit: number,
		messageid: string,
		isIncoming = false,
	): void => {
		refetch({ chatid, limit, messageid, isIncoming });
	};

	useEffect(() => {
		if (!chatid) return;
		const lastMessageID = localStorage.getItem(
			`ChatLastMes${chatid?.toString()}`,
		);
		Refetch(limit, lastMessageID, true);
	}, [chatid]);

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
				/>
				{/* : */}
				{/* <FontAwesomeIcon icon={faChevronCircleDown} className={`${down} ${loader} ${loader_down}`} />} */}
			</div>
			{messageAction}
		</div>
	);
};

export default Exploler;
