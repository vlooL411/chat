import Loader from '../common/Loader'
import { useRef, useState } from 'react'
import style from './styles/messageBlock.module.sass'
import { gql, useMutation, useQuery } from '@apollo/client'
import { Message, User, ID } from '../../apolloclient/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faSave, faBan, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import TextAreaMessage from './TextAreaMessage'

const GetUserAvatar = gql`
    query user($id: ID!) {
        User(id: $id) {
            image
        }
    }
`
const ChangeMessage = gql`
    mutation changeMessage($chatid: ID!, $messageid: ID!, $text: String!) {
        ChangeMessage(chatid: $chatid, messageid: $messageid, text: $text)
    }
`
const RemoveMessage = gql`
    mutation removeMessage($chatid: ID!, $messageid: ID!) {
        RemoveMessage(chatid: $chatid, messageid: $messageid)
    }
`

type Props = {
    chatid: ID
    message: Message
    maxTextHeight: string
    maxTextWidth: string
}

const MessageBlock = ({ chatid, message, maxTextHeight = '250px', maxTextWidth = '250px' }: Props) => {
    const { mes, mes_block, edit, send_off } = style
    const { mes_block_text, mes_block_info, mes_block_info_date } = style
    const textBlockRef = useRef<HTMLTextAreaElement>(null!)
    const [isReadOnly, setIsReadOnly] = useState(true)

    const [changeMessageMut, { loading: loadingChange, error: errorChange, data: dataChange }]
        = useMutation(ChangeMessage)
    const [removeMessageMut, { loading: loadingRemove, error: errorRemove, data: dataRemove }]
        = useMutation(RemoveMessage)
    const { data }
        = useQuery(GetUserAvatar, { variables: { id: message?.userid } })

    const getHHMMPA = (date: Date): string => {
        const minute = date.getMinutes()
        const localeDate = date.toLocaleTimeString()
        return `${date.getHours()}:${minute < 10 ? '0' : ''}${minute} ${localeDate.slice(localeDate.length - 2, localeDate.length)}`
    }

    //#region Action with message
    const editMes = () => {
        setIsReadOnly(!isReadOnly)
    }

    const saveMes = async () => {
        const { value: text } = textBlockRef.current
        if (!text) return
        changeMessageMut({ variables: { chatid, messageid: message?._id, text } })
        setIsReadOnly(!isReadOnly)
    }

    const cancelMes = () => {
        setIsReadOnly(!isReadOnly)
    }

    const removeMes = () => removeMessageMut({ variables: { chatid, messageid: message?._id } })
    //#endregion

    const user = data?.User as User
    const { EMPTY_AVATAR_USER } = process.env
    return <div className={mes}>
        <img src={user?.image ?? EMPTY_AVATAR_USER} />
        <div className={mes_block} onDoubleClick={() => removeMes()}>
            <Loader loading={loadingRemove} />
            {isReadOnly ? <p className={mes_block_text}>{message?.text}</p> :
                <TextAreaMessage ref={textBlockRef} defaultValue={message?.text}
                    className={mes_block_text}
                    style={{ maxWidth: maxTextWidth, maxHeight: maxTextHeight }} />}
            <span className={mes_block_info}>
                <p className={mes_block_info_date}>{getHHMMPA(new Date(message?.date))}</p>
                {message?.isRead ?
                    <FontAwesomeIcon icon={faCheck} /> : null}
                {message?.isRead ?
                    <FontAwesomeIcon icon={faCheck} style={{ marginLeft: '-0.5em', zIndex: 100 }} />
                    : null}
                {isReadOnly ?
                    <FontAwesomeIcon icon={faEdit} onClick={editMes} /> :
                    <>
                        < FontAwesomeIcon icon={faSave} onClick={saveMes} />
                        < FontAwesomeIcon icon={faBan} onClick={cancelMes} />
                    </>}
                {errorChange ? <FontAwesomeIcon icon={faExclamationCircle} className={send_off} /> : null}
                {message?.isChange ? <p className={edit}>edit</p> : null}
            </span>
        </div>
    </div>
}

export default MessageBlock