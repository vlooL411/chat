import { GQLT } from '@GQLT'
import Loader from '../Loader'
import { Message, User, ID } from '@types'
import { useEffect, useState } from 'react'
import LocalStorage from 'utils/LocalSrorage'
import { gql, useQuery } from '@apollo/client'
import { getHHMMPA } from 'components/common/WhatDate'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './styles/messageBlock.module.sass'

const GetUserAvatar = gql`
    query user($id: ID!) {
        User(id: $id) {
            _id
            image
        }
    }
`

type Props = {
    chatid: ID
    message: Message
    countExpand?: number
    switchMessageAction?: (mes: Message) => void
}

const MessageBlock = ({ chatid, message, countExpand = 300, switchMessageAction = () => { } }: Props) => {
    const { mes, mes_block, edit, send_off } = style
    const { mes_block_text, expend, mes_block_info, mes_block_info_date } = style
    const [isExpandMes, setIsExpandMes] = useState<boolean>(false)

    const isExpand = message?.text?.length > countExpand

    useEffect(() => {
        if (isExpand)
            setIsExpandMes(true)
    }, [message?.text?.length])

    const [removeMessage, { loading: loadingRemove }] = GQLT.Mutation.useRemoveMessage()
    const { data } = useQuery(GetUserAvatar, { variables: { id: message?.userid } })

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
                        {message?.text?.slice(0, countExpand)}...
                            <br />
                        <button className={expend}
                            onClick={() => setIsExpandMes(false)}>
                            expend...
                            </button>
                    </> : message?.text}
            </p>
            <span className={mes_block_info}>
                <p className={mes_block_info_date}>{getHHMMPA(new Date(message?.date))}</p>
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