import { Contact } from '@frontend/types';
import { ReactElement } from 'react';
import { WhatDate } from 'components/common/WhatDate';

import BlockPanel from '../BlockPanel';

type Props = {
	contact: Contact;
	onSelectContact: () => void;
};

const fiveMinute: number = 1000 * 60 * 5;
const { EMPTY_AVATAR_USER } = process.env;
const BlockContact = ({ contact, onSelectContact }: Props): ReactElement => {
	const whoIsContact = contact?.whoIsContact;
	const user = contact?.User;

	const isOnline =
		new Date(user?.dateLastOnline)?.getTime() + fiveMinute >
		new Date().getTime();

	return (
		<BlockPanel
			text={user?.status}
			title={whoIsContact ?? user?.name}
			image={user?.avatar ?? EMPTY_AVATAR_USER}
			date={
				isOnline ? 'Online' : WhatDate(new Date(user?.dateLastOnline))
			}
			onClick={onSelectContact}
		/>
	);
};

export default BlockContact;
