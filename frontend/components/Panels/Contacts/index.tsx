import Loader from 'components/Loader';
import Search from 'components/Search';
import BlockInfo from 'components/Search/BlockInfo';
import {
	Contact,
	ContactInfoFragment,
	useContactsQuery,
	useFindContactLazyQuery,
} from '@frontend/types';
import { ReactElement, useState } from 'react';

import style from '../styles/panel.module.sass';
import BlockContact from './BlockContact';

type Props = {
	onSelectContact: (contact: Contact) => void;
	onCreateContact: (contact: Contact) => void;
};

//TODO replace on the subscriptions (useContacts pollInterval)
const timeUpdateContact: number = 1000 * 60 * 5;
const Contacts = ({
	onSelectContact,
	onCreateContact,
}: Props): ReactElement => {
	const { panel } = style;

	const [state] = useState<{ Date?: Date; IsSearch: boolean }>({
		IsSearch: false,
	});

	const runFind = (text: string) => {
		getFind({ variables: { text } });
		state.IsSearch = true;
	};
	const stopFind = () => (state.IsSearch = false);

	const { loading, data } = useContactsQuery({
		pollInterval: timeUpdateContact,
	});
	const [
		getFind,
		{ data: dataFind, loading: loadFind },
	] = useFindContactLazyQuery({ fetchPolicy: 'no-cache' });

	const onFindContacts = (text: string) => {
		if (!text) {
			state.Date = null;
			stop();
			return;
		}

		const date = new Date();
		state.Date = date;
		setTimeout(() => {
			if (state.Date == date) runFind(text);
		}, 400);
	};

	const Block = (contact: Contact, key: number): ReactElement => (
		<BlockContact
			contact={contact}
			onSelectContact={() => onSelectContact(contact)}
			key={key}
		/>
	);

	const BlockExistning = (contact: Contact, key: number): ReactElement => (
		<BlockContact
			contact={contact}
			onSelectContact={() => onCreateContact(contact)}
			key={key}
		/>
	);

	const dataContacts: ContactInfoFragment[] = data?.Contacts;
	const dataFindExist: ContactInfoFragment[] =
		dataFind?.FindContacts?.Existing;
	const dataFindIncom: ContactInfoFragment[] =
		dataFind?.FindContacts?.Incoming;

	const isContactsEmpty: boolean = dataContacts?.length == 0;
	const countFindExist: number = dataFindExist?.length ?? 0;
	const countFindIncom: number = dataFindIncom?.length ?? 0;

	return (
		<div className={panel}>
			<Search
				loading={loadFind}
				onClick={() => null}
				onClear={stopFind}
				onChange={e => onFindContacts(e?.target?.value)}
			/>
			<Loader loading={loading} />
			{!state?.IsSearch ? (
				isContactsEmpty ? (
					<BlockInfo what={`Contacts empty`} />
				) : (
					dataContacts?.map(Block)
				)
			) : (
				<>
					<BlockInfo what={`Found your contacts ${countFindExist}`} />
					{dataFindExist?.map(Block)}
					<BlockInfo what={`Found contacts ${countFindIncom}`} />
					{dataFindIncom?.map(BlockExistning)}
				</>
			)}
		</div>
	);
};

export default Contacts;
