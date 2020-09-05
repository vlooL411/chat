import style from './chats.module.sass'
import { gql, useQuery } from '@apollo/client'
import { ReactElement } from 'react'
import { Chat, ID } from '../../apolloclient/types'
import { WhatDate, GetYesterdey } from '../common/WhatDate'
import Loader from '../common/Loader'

const GetChatsExploler = gql`
    query chats($start: Int!, $end: Int!) {
        Chats(start: $start, end: $end) {
            _id
            image
            title
            date
        }
    }
`

type Props = {
    onSelectChat: (id: ID) => void
}

const Chats = ({ onSelectChat }: Props): ReactElement => {
    const { chats, chat, chat_title, chat_date, chat_lastmessage } = style
    const { loading, error, data } = useQuery(GetChatsExploler, { variables: { start: 0, end: 10 } })

    if (error) return <p style={{ color: 'red' }}>Error {error.message}</p>

    const today: Date = new Date()
    const yesterday: Date = GetYesterdey(today)

    const { EMPTY_AVATAR_CHAT } = process.env
    const ChatBlock = ({ _id, image, title, date, lastMessage }: Chat, key): ReactElement =>
        <div key={key} className={chat} onClick={() => onSelectChat(_id)}>
            <img src={image ?? EMPTY_AVATAR_CHAT} />
            <p className={chat_title}>{title}</p>
            <p className={chat_date}>{WhatDate(new Date(date), today, yesterday)}</p>
            <p className={chat_lastmessage}>{lastMessage?.text}</p>
        </div>

    const dataChats: Chat[] = data?.Chats
    return <div className={chats}>
        <Loader loading={loading} />
        {dataChats?.map((el, key) => ChatBlock(el, key))}
    </div>
}

export default Chats
