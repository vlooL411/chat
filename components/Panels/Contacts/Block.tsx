import { Contact } from '@frontend'
import { ReactElement } from 'react'
import { WhatDate } from 'components/common/WhatDate'

import BlockPanel from '../BlockPanel'

type Props = {
    contact: Contact
    onSelectContact: () => void
}

const fiveMinute: number = 1000 * 60 * 5
const { EMPTY_AVATAR_USER } = process.env
const Block = ({ contact, onSelectContact }: Props): ReactElement => {
    const whoIsContact = contact?.whoIsContact
    const User = contact?.User

    const isOnline = new Date(User?.dateLastOnline)?.getTime() + fiveMinute > new Date().getTime()

    return <BlockPanel
        text={User?.status}
        title={whoIsContact ? whoIsContact : User?.name}
        image={User?.image ?? EMPTY_AVATAR_USER}
        date={isOnline ? 'Online' : WhatDate(new Date(User?.dateLastOnline))}
        onClick={onSelectContact} />
}

export default Block