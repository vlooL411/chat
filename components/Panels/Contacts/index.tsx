import Loader from 'components/Loader'
import Search from 'components/Search'
import { GQLT } from '@GQLT'
import { Contact } from '@types'
import { ReactElement, useState } from 'react'

import style from '../styles/panel.module.sass'
import Block from './Block'

type Props = {
    onSelectContact: (contact: Contact) => void
}

const Contacts = ({ onSelectContact }: Props): ReactElement => {
    const { panel } = style

    const [storageDate, _] = useState<{ Date?: Date }>({})
    const { loading, data } = GQLT.Query.useContacts()
    const [findContacts, { loading: loadFind, data: dataFind }] = GQLT.Query.useFindContactLazy()

    const [isSearch, setIsSearch] = useState<boolean>(false)
    const runFind = () => setIsSearch(true)
    const stopFind = () => setIsSearch(false)

    const onFindContacts = (text: string) => {
        if (!text) {
            storageDate.Date = null
            stopFind()
            return
        }

        const date = new Date()
        storageDate.Date = date
        setTimeout(() => {
            if (storageDate.Date == date) {
                findContacts({ variables: { text } })
                runFind()
            }
        }, 400)
    }

    const block = (contact: Contact, key): ReactElement =>
        <Block contact={contact} onSelectContact={() => onSelectContact(contact)} key={key} />

    const dataContacts: Contact[] = data?.Contacts
    const dataFindContacts: Contact[] = dataFind?.FindContact
    return <div className={panel}>
        <Search loading={loadFind}
            onClick={() => { }}
            onClear={stopFind}
            onChange={(e) => onFindContacts(e?.target?.value)} />
        <Loader loading={loading} />
        {!isSearch ?
            dataContacts?.map(block) :
            dataFindContacts?.map(block)}
    </div>
}

export default Contacts