import Loader from 'components/Loader'
import { LocalStorage } from '@common/utils'
import { useEffect, useState } from 'react'
import { getHHMMSSPA } from 'components/common/WhatDate'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Message, User, useRemoveMessageMutation, useUserQuery } from '@generated/frontend'
import { ID } from '@chat/apollocommon'

import style from './styles/messageBlock.module.sass'

type Props = {
    chatid: ID
    message: Message
    countCharForExpanded?: number
    switchMessageAction?: (mes: Message) => void
}

const MessageBlock = ({ chatid, message, countCharForExpanded = 300, switchMessageAction = () => { } }: Props) => {
    const { mes, mes_block, edit } = style
    const { mes_block_text, expend, mes_block_info, mes_block_info_date } = style
    const [isExpandMes, setIsExpandMes] = useState<boolean>(false)

    const isExpand = message?.text?.length > countCharForExpanded

    useEffect(() => {
        if (isExpand)
            setIsExpandMes(true)
    }, [message?.text?.length])

    const [removeMessage, { loading: loadingRemove }] = useRemoveMessageMutation()
    const { data } = useUserQuery({ variables: { id: message?.userid } })

    const removeMes = () => removeMessage({ variables: { chatid, messageid: message?._id } })

    const onMouseEnter = () => {
        if (chatid)
            LocalStorage.setString('ChatLastMes', chatid.toString(), message?._id.toString())
    }

    const user = data?.User as User
    const { EMPTY_AVATAR_USER } = process.env
    return <div className={mes} onMouseEnter={onMouseEnter}>
        <img src={user?.image ?? EMPTY_AVATAR_USER} />
        <div className={mes_block}
            onClick={(e) => { if (e.ctrlKey && e.button == 0) switchMessageAction(message) }}
            onDoubleClick={(e) => { if (e.ctrlKey) removeMes() }}>
            <Loader loading={loadingRemove} />
            <p className={mes_block_text}>
                {isExpandMes && isExpand ?
                    <>
                        {message?.text?.slice(0, countCharForExpanded)}...
                            <br />
                        <button className={expend}
                            onClick={() => setIsExpandMes(false)}>
                            expend...
                            </button>
                    </> : message?.text}
            </p>
            <span className={mes_block_info}>
                <p className={mes_block_info_date}>{getHHMMSSPA(new Date(message?.date))}</p>
                {message?.isRead ? <FontAwesomeIcon icon={faCheck} /> : null}
                {message?.isRead ?
                    <FontAwesomeIcon icon={faCheck} style={{ marginLeft: '-0.5em', zIndex: 100 }} />
                    : null}
                {message?.isChange ? <p className={edit}>edited</p> : null}
            </span>
        </div>
    </div >
}

export default MessageBlock