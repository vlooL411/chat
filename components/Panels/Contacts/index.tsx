import Loader from 'components/Loader'
import Search from 'components/Search'
import BlockInfo from 'components/Search/BlockInfo'
import { Contact, useContactsQuery, useFindContactLazyQuery } from '@frontend'
import { ReactElement, useState } from 'react'

import style from '../styles/panel.module.sass'
import Block from './Block'

type Props = {
    onSelectContact: (contact: Contact) => void
    onCreateContact: (contact: Contact) => void
}

//TODO replace on the subscriptions (useContacts pollInterval)
const timeUpdateContact: number = 1000 * 60 * 5
const Contacts = ({ onSelectContact, onCreateContact }: Props): ReactElement => {
    const { panel } = style

    const [storage, _] = useState<{ Date?: Date, IsSearch: boolean }>({ IsSearch: false })

    const runFind = (text: string) => {
        getFind({ variables: { text } })
        storage.IsSearch = true
    }
    const stopFind = () => storage.IsSearch = false

    const { loading, data } = useContactsQuery({ pollInterval: timeUpdateContact })
    const [getFind, { data: dataFind, loading: loadFind }] = useFindContactLazyQuery({ fetchPolicy: 'no-cache' })

    const onFindContacts = (text: string) => {
        if (!text) {
            storage.Date = null;
            stop();
            return;
        }

        const date = new Date();
        storage.Date = date;
        setTimeout(() => {
            if (storage.Date == date) runFind(text);
        }, 400);
    }

    const block = (contact: Contact, key): ReactElement =>
        <Block contact={contact} onSelectContact={() => onSelectContact(contact)} key={key} />

    const blockExistning = (contact: Contact, key): ReactElement =>
        <Block contact={contact} onSelectContact={() => onCreateContact(contact)} key={key} />

    const dataContacts: Contact[] = data?.Contacts
    const dataFindExist: Contact[] = dataFind?.FindContact?.Existing
    const dataFindIncom: Contact[] = dataFind?.FindContact?.Incoming

    const isContactsEmpty = dataContacts?.length == 0
    const countFindExist: number = dataFindExist?.length ?? 0
    const countFindIncom: number = dataFindIncom?.length ?? 0

    return <div className={panel}>
        <Search loading={loadFind}
            onClick={() => { }}
            onClear={stopFind}
            onChange={(e) => onFindContacts(e?.target?.value)} />
        <Loader loading={loading} />
        {!storage?.IsSearch ?
            isContactsEmpty ?
                <BlockInfo what={`Contacts empty`} /> :
                dataContacts?.map(block) :
            <>
                <BlockInfo what={`Found your contacts ${countFindExist}`} />
                {dataFindExist?.map(block)}
                <BlockInfo what={`Found contacts ${countFindIncom}`} />
                {dataFindIncom?.map(blockExistning)}
            </>}
    </div>
}

export default Contacts