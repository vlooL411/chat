import ScrollLoadMore from 'components/Scroll/ScrollLoadMore'
import { ReactElement } from 'react'
import { first, last } from '@common/utils'
import { Chat, InfoMore, Message } from '@generated/frontend'
import { ID } from '@chat/apollocommon'

import MessageBlock from '../Message/MessageBlock'
import style from './scroll.module.sass'
import { MessageActionMode } from '../Message/MessageAction'

type Props = {
    chat: Chat
    infoMore: InfoMore
    loadMess: boolean
    limit: number
    scrollLoad: number
    refetch: (limit: number, id: ID) => void
    changeModeMessage: (action: MessageActionMode) => void
}

const Scroll = ({ chat, infoMore, loadMess, limit = 100, scrollLoad = 100,
    refetch, changeModeMessage }: Props): ReactElement => {
    const { scroll } = style
    const limitQT = Math.round(limit / 4)

    const ScrollElem = (mes: Message) =>
        <MessageBlock chatid={chat?._id} message={mes} key={mes?._id as string}
            switchMessageAction={(mes) => changeModeMessage({ mes, mode: 'change' })} />

    const mess = chat?.messages

    const scrollZero = () => {
        if (!infoMore && !mess && infoMore?.size == mess?.length) return

        const firstMessageID = first(mess)?._id
        const lastMessageID = last(mess)?._id

        let messageid = firstMessageID
        let Limit = -limitQT

        if (infoMore?.isEndDown != lastMessageID)
            [messageid, Limit] = [lastMessageID, Limit * -1]
        refetch(Limit, messageid)
    }

    const loadMore = (message: Message, isUp: boolean) => {
        if (!infoMore || loadMess) return
        refetch(limitQT * (isUp ? -1 : 1), message?._id)
    }

    const cmdEnd = (end: ID, el: Message) => end == el?._id

    return <ScrollLoadMore
        className={scroll}
        array={mess}
        cmpEnd={cmdEnd}
        elemInit={ScrollElem}
        isEnd={{ up: infoMore?.isEndUp, down: infoMore?.isEndDown }}
        scrollUp={scrollLoad} scrollDown={scrollLoad}
        onScrollZero={scrollZero}
        onScrollUp={(mes) => loadMore(mes, true)}
        onScrollDown={(mes) => loadMore(mes, false)} />
}

export default Scroll
