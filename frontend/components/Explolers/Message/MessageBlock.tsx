import Loader from 'components/Loader';
import { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { getHHMMSSPA } from 'components/common/WhatDate';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Message,
	useRemoveMessageMutation,
	useUserQuery,
} from '@frontend/types';

import style from './styles/messageBlock.module.sass';

type Props = {
	id?: string;
	chatid: string;
	message: Message;
	countCharForExpanded?: number;
	switchMessageAction?: (mes: Message) => void;
};

const MessageBlock = ({
	id = '',
	chatid,
	message,
	countCharForExpanded = 300,
	switchMessageAction = () => null,
}: Props): ReactElement => {
	const { mes, edit, expend } = style;
	const { mes_block, mes_block_text } = style;
	const { mes_block_info, mes_block_info_date } = style;

	const [isExpandMes, setIsExpandMes] = useState<boolean>(false);

	const isExpand = (): boolean =>
		message?.text?.length > countCharForExpanded;

	useEffect(() => {
		if (isExpand()) setIsExpandMes(true);
	}, [message?.text?.length]);

	const [
		removeMessage,
		{ loading: loadingRemove },
	] = useRemoveMessageMutation();
	const { data } = useUserQuery({ variables: { id: message?.userid } });

	const removeMes = (): void => {
		removeMessage({ variables: { chatid, messageid: message?._id } });
	};

	const onMouseEnter = (): void => {
		if (chatid)
			localStorage.setItem(
				`ChatLastMes${chatid.toString()}`,
				message?._id.toString(),
			);
	};

	const onSwitchMessageAction = (e: MouseEvent<HTMLDivElement>): void => {
		if (e.ctrlKey && e.button == 0) switchMessageAction(message);
	};
	const onRemoveMessage = (e: MouseEvent<HTMLDivElement>): void => {
		if (e.ctrlKey) removeMes();
	};

	const user = data?.User;
	const { EMPTY_AVATAR_USER } = process.env;
	return (
		<div id={id} className={mes} onMouseEnter={onMouseEnter}>
			<img src={user?.avatar ?? EMPTY_AVATAR_USER} />
			<div
				className={mes_block}
				onClick={onSwitchMessageAction}
				onDoubleClick={onRemoveMessage}>
				<Loader loading={loadingRemove} />
				<p className={mes_block_text}>
					{isExpandMes && isExpand() ? (
						<>
							{message?.text?.slice(0, countCharForExpanded)}...
							<br />
							<button
								className={expend}
								onClick={() => setIsExpandMes(false)}>
								expend...
							</button>
						</>
					) : (
						message?.text
					)}
				</p>
				<span className={mes_block_info}>
					<p className={mes_block_info_date}>
						{getHHMMSSPA(new Date(message?.createdAt))}
					</p>
					{message?.isRead && <FontAwesomeIcon icon={faCheck} />}
					{message?.isRead && (
						<FontAwesomeIcon
							icon={faCheck}
							style={{ marginLeft: '-.5em', zIndex: 100 }}
						/>
					)}
					{message?.isChange ? <p className={edit}>edited</p> : null}
				</span>
			</div>
		</div>
	);
};

export default MessageBlock;
