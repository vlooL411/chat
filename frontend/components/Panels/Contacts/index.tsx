import Loader from 'components/Loader';
import BlockInfo from 'components/Search/BlockInfo';
import SearchControl from 'components/Search/Control';
import {
	Contact,
	ContactInfoFragment,
	useContactsQuery,
	useFindContactLazyQuery,
} from '@frontend/types';
import { ReactElement } from 'react';

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

	const onRunFind = (text: string): void => getFind({ variables: { text } });

	const { loading, data } = useContactsQuery({
		pollInterval: timeUpdateContact,
	});
	const [
		getFind,
		{ data: dataFind, loading: loadFind },
	] = useFindContactLazyQuery({ fetchPolicy: 'no-cache' });

	const Block = (contact: Contact): ReactElement => (
		<BlockContact
			contact={contact}
			onSelectContact={() => onSelectContact(contact)}
			key={contact._id}
		/>
	);

	const BlockExistning = (contact: Contact): ReactElement => (
		<BlockContact
			contact={contact}
			onSelectContact={() => onCreateContact(contact)}
			key={contact._id}
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
		<SearchControl className={panel} loading={loadFind} onRun={onRunFind}>
			<>
				<BlockInfo what={`Found your contacts ${countFindExist}`} />
				{dataFindExist?.map(Block)}
				<BlockInfo what={`Found contacts ${countFindIncom}`} />
				{dataFindIncom?.map(BlockExistning)}
			</>
			<>
				<Loader loading={loading} />
				{isContactsEmpty ? (
					<BlockInfo what={`Contacts empty`} />
				) : (
					dataContacts?.map(Block)
				)}
			</>
		</SearchControl>
	);
};

export default Contacts;
