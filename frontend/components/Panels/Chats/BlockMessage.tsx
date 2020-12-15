import { ChatFindFragmentFragment, Message } from '@frontend/types';
import { WhatDate } from 'components/common/WhatDate';
import { ReactElement } from 'react';

import BlockPanel from '../BlockPanel';

type Props = {
	chat: ChatFindFragmentFragment;
	message: Partial<Message>;
	onSelectChat: (chatid: string) => void;
};

const { EMPTY_AVATAR_CHAT } = process.env;
const BlockMessage = ({ chat, message, onSelectChat }: Props): ReactElement => (
	<BlockPanel
		title={chat?.title}
		text={message?.text}
		image={chat?.image ?? EMPTY_AVATAR_CHAT}
		date={WhatDate(new Date(message?.createdAt))}
		onClick={() => onSelectChat(chat?._id)}
		key={message?._id}
	/>
);

export default BlockMessage;
