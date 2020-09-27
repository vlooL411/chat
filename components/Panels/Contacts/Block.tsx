import { Contact } from '@types'
import { ReactElement } from 'react'
import { WhatDate } from 'components/common/WhatDate'
import { GQLT } from '@GQLT'

import BlockPanel from '../BlockPanel'

type Props = {
    contact: Contact
    onSelectContact: () => void
}

const twoMinute: number = 1000 * 60 * 2
const { EMPTY_AVATAR_USER } = process.env
const Block = ({ contact, onSelectContact }: Props): ReactElement => {
    const { image, name, status, whoIsContact } = contact

    //TODO remake
    const { data } = GQLT.Query.useUser({ variables: { id: contact?.userid }, pollInterval: twoMinute })

    const isOnline = new Date(data?.User?.dateLastOnline)?.getTime() + twoMinute > new Date().getTime()

    return <BlockPanel title={whoIsContact ? whoIsContact : name} text={status}
        image={image ?? EMPTY_AVATAR_USER}
        date={isOnline ? 'Online' : WhatDate(new Date(data?.User?.dateLastOnline))}
        onClick={onSelectContact} />
    // return <div key={key} className={block}>
    //     <img src={image ?? EMPTY_AVATAR_USER} />
    //     <p className={block_login}>{whoIsContact ?? name}</p>
    //     <p className={block_online}>
    //         {status}
    //         {/* {isOnline ? <FontAwesomeIcon icon={isOnlineMobile ? faMobileAlt : faPlug} /> :
    //             <span>
    //                 {dateLastOnline ?
    //                     <>last seen {WhatDateToday(new Date(dateLastOnline))}</> :
    //                     'never'}
    //             </span>} */}
    //     </p>
    //     <p className={block_status}>{status}</p>
    // </div>
}

export default Block