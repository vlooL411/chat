import { Chat, ID } from "@types";
import { ReactElement } from "react";
import { GetYesterdey, WhatDate } from "components/common/WhatDate";
import style from './block.module.sass'

type Props = {
    chat: Chat
    title: string
    image: string
    text: string
    onSelectChat: (id: ID) => void
}

const { EMPTY_AVATAR_CHAT } = process.env
const Block = ({ chat, title, image, text, onSelectChat }: Props): ReactElement => {
    const { block, block_title, block_date, block_lastmessage } = style

    const today: Date = new Date()
    const yesterday: Date = GetYesterdey(today)

    return <button className={block} onClick={() => onSelectChat(chat?._id)}>
        <img src={image ?? EMPTY_AVATAR_CHAT} />
        <p className={block_title}>{title}</p>
        <p className={block_date}>{WhatDate(new Date(chat?.lastMessage?.date), today, yesterday)}</p>
        <p className={block_lastmessage}>{text}</p>
    </button>
}

export default Block