import Loader from 'components/Loader'
import LocalStorage from 'utils/LocalSrorage'
import { GQL } from '@GQL'
import { GQLT } from '@GQLT'
import { last } from 'utils/array'
import { Chat, ID, Message } from '@types'
import { ReactElement, useEffect, useMemo, useState } from 'react'

import Scroll from '../Scroll'
import style from './exploler.module.sass'
import BarExploler, { BarProps } from '../Bar/BarExploler'
import MessageAction, { MessageActionMode } from '../Message/MessageAction'

type Props = {
    chatid: ID
    BarProps: (chat: Chat) => BarProps
}

const limit: number = 100
const scrollLoad: number = 100

const Exploler = ({ chatid, BarProps }: Props): ReactElement => {
    const { exploler, scrollcontainer } = style
    const { down, loader, loader_up, loader_down } = style

    const [mesActionMode, setMesActionMode] =
        useState<MessageActionMode>({ mes: null, mode: 'send' })

    const { loading, data } = GQLT.Query.useChat({ variables: { chatid } })
    const { data: dataMess, loading: loadMess, refetch, subscribeToMore } =
        GQLT.Query.useMessages()

    const Refetch = (limit: number, messageid: ID, isIncoming: boolean = false) =>
        refetch({ chatid, limit, messageid, isIncoming })

    useEffect(() => {
        if (!chatid) return
        const lastMessageID = LocalStorage.getString('ChatLastMes', chatid?.toString())
        Refetch(limit, lastMessageID, true)
    }, [chatid])

    //#region Subscribtion
    GQLT.Subscription.useChangeMessage();

    const addMore = () => subscribeToMore({
        document: GQL.Subscription.AddMessage,
        updateQuery: (prev, { subscriptionData, variables }) => {
            console.log(prev, subscriptionData)
            const AddMessage = (subscriptionData?.data as any)?.AddMessage as Chat
            if (!AddMessage) return null;

            const lastMessage = AddMessage
            const mess = prev?.Messages?.Chat?.messages
            const lastElemID = last(mess)?._id

            if (lastElemID == prev?.Messages?.InfoMore?.isEndDown)
                return { Messages: { Chat: { lastMessage }, InfoMore: { isEndDown: lastMessage?._id } } } as any

            variables.isIncoming = true
            const messages = mess ? [...mess, AddMessage] : [AddMessage]
            return { Messages: { Chat: { lastMessage, messages }, InfoMore: { isEndDown: lastMessage?._id } } } as any
        }
    })

    const remMore = () => subscribeToMore({
        document: GQL.Subscription.RemoveMessage,
        updateQuery: (prev, { subscriptionData, variables }) => {
            const RemoveMessage = (subscriptionData?.data as any)?.RemoveMessage as Message
            if (!RemoveMessage) return null;

            variables.isIncoming = true
            const messages = prev?.Messages?.Chat?.messages?.filter((el) => el._id != RemoveMessage._id)
            return { Messages: { Chat: { messages } } } as any
        }
    })

    useEffect(() => {
        if (!subscribeToMore) return
        addMore()
        remMore()
    }, [])
    //#endregion

    const chat = data?.Chat
    const infoMore = dataMess?.Messages?.InfoMore
    const chatMess = dataMess?.Messages?.Chat

    const scroll = useMemo(() =>
        <Scroll chat={chatMess}
            infoMore={infoMore}
            loadMess={loadMess}
            limit={limit}
            scrollLoad={scrollLoad}
            changeModeMessage={setMesActionMode}
            refetch={Refetch} />,
        [infoMore, chatMess])

    const bar = useMemo<ReactElement>(() =>
        <BarExploler {...BarProps(chat)} />,
        [chatid, chat])
    const messageAction = useMemo<ReactElement>(() =>
        <MessageAction chatid={chatid} action={mesActionMode} />,
        [chatid, mesActionMode])

    return <div className={exploler}>
        {bar}
        <div className={scrollcontainer}>
            <Loader loading={loadMess} className={`${loader} ${loader_up}`} />
            {scroll}
            {/* {loadMess || loading ? */}
            <Loader loading={loadMess || loading} className={`${loader} ${loader_down}`} /> {/* : */}
            {/* <FontAwesomeIcon icon={faChevronCircleDown} className={`${down} ${loader} ${loader_down}`} />} */}
        </div>
        {messageAction}
    </div >
}

export default Exploler