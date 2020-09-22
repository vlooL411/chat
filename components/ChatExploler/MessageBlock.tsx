import { GQLT } from '@GQLT'
import Loader from '../Loader'
import { Message, User, ID } from '@types'
import { gql, useQuery } from '@apollo/client'
import TextAreaMessage from './TextAreaMessage'
import { useEffect, useRef, useState } from 'react'
import { getHHMMPA } from 'components/common/WhatDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faSave, faBan, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import style from './styles/messageBlock.module.sass'
import LocalStorage from 'utils/LocalSrorage'

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
}

const MessageBlock = ({ chatid, message, countExpand = 300 }: Props) => {
    const { mes, mes_block, edit, send_off } = style
    const { mes_block_text, mes_block_textbox, expend, mes_block_info, mes_block_info_date } = style
    const textBlockRef = useRef<HTMLTextAreaElement>(null!)
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true)
    const [isExpandMes, setIsExpandMes] = useState<boolean>(false)

    const isExpand = message?.text?.length > countExpand

    useEffect(() => {
        if (isExpand)
            setIsExpandMes(true)
    }, [message?.text?.length])

    const [changeMessage, { loading: loadingChange, error: errorChange, data: dataChange }]
        = GQLT.Mutation.useChangeMessage()
    const [removeMessage, { loading: loadingRemove, error: errorRemove, data: dataRemove }]
        = GQLT.Mutation.useRemoveMessage()
    const { data } = useQuery(GetUserAvatar, { variables: { id: message?.userid } })

    //#region Action with message
    const editMes = () => setIsReadOnly(!isReadOnly)

    const saveMes = async () => {
        const { value: text } = textBlockRef.current
        if (!text || text == message?.text) return
        changeMessage({ variables: { chatid, messageid: message?._id, text } })
        setIsReadOnly(!isReadOnly)
    }

    const cancelMes = () => setIsReadOnly(!isReadOnly)

    const removeMes = () => removeMessage({ variables: { chatid, messageid: message?._id } })
    //#endregion

    const onMouseEnter = () => {
        if (chatid)
            LocalStorage.setString('ChatLastMes', chatid.toString(), message?._id.toString())
    }

    const user = data?.User as User
    const { EMPTY_AVATAR_USER } = process.env
    return <div className={mes} onMouseEnter={onMouseEnter}>
        <img src={user?.image ?? EMPTY_AVATAR_USER} />
        <div className={mes_block} onDoubleClick={() => removeMes()}>
            <Loader loading={loadingRemove} />
            {isReadOnly ?
                <p className={mes_block_text}>
                    {!isExpandMes ? message?.text : isExpand ?
                        <>
                            {message?.text?.slice(0, countExpand)}...
                            <br />
                            <button className={expend}
                                onClick={() => setIsExpandMes(false)}>
                                expend...
                            </button>
                        </> : null}
                </p> :
                <TextAreaMessage className={`${mes_block_text} ${mes_block_textbox}`}
                    ref={textBlockRef} defaultValue={message?.text}
                    onKeyDown={(e) => {
                        if (e.ctrlKey && e.key == 'Enter')
                            saveMes()
                    }} />}
            <span className={mes_block_info}>
                <p className={mes_block_info_date}>{getHHMMPA(new Date(message?.date))}</p>
                {message?.isRead ?
                    <FontAwesomeIcon icon={faCheck} /> : null}
                {message?.isRead ?
                    <FontAwesomeIcon icon={faCheck}
                        style={{ marginLeft: '-0.5em', zIndex: 100 }} />
                    : null}
                {isReadOnly ?
                    <FontAwesomeIcon icon={faEdit} onClick={editMes} /> :
                    <>
                        < FontAwesomeIcon icon={faSave} onClick={saveMes} />
                        < FontAwesomeIcon icon={faBan} onClick={cancelMes} />
                    </>}
                {errorChange ? <FontAwesomeIcon icon={faExclamationCircle} className={send_off} /> : null}
                {message?.isChange ? <p className={edit}>edited</p> : null}
            </span>
        </div>
    </div>
}

export default MessageBlock