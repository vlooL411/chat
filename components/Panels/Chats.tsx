import Loader from 'components/Loader'
import Search from 'components/Search'
import BlockInfo from 'components/Search/BlockInfo'
import { GQL } from '@GQL'
import { gql, useQuery } from '@apollo/client'
import { Chat, ID, Message, User } from '@types'
import { Fragment } from 'apolloclient/fragment'
import { ReactElement, useEffect, useState } from 'react'
import { WhatDate } from 'components/common/WhatDate'

import BlockPanel from './BlockPanel'
import style from './styles/panel.module.sass'

const GetChatsExploler = gql`
    query chats($chatid: ID, $limit: Int, $isIncoming: Boolean) {
        Chats(chatid: $chatid, limit: $limit, isIncoming: $isIncoming) {
            ...ChatInfo
            ...LastMessage
        }
        UserCurrent {
            _id
            chats_id
        }
    }
    ${Fragment.ChatInfo}
    ${Fragment.LastMessage}
`

const FindQuery = gql`
    query findQuery($text: String!) {
        FindMessage(text: $text) {
            ...chatFragment
        }
        FindChat(title: $text) {
            ...chatFragment
        }
    }

    fragment chatFragment on Chat {
        ...ChatInfo
        messages {
            _id
            text
            date
        }
        ...LastMessage
    }
    ${Fragment.ChatInfo}
    ${Fragment.LastMessage}
`

type Props = {
    onSelectChat: (id: ID) => void
}

const { EMPTY_AVATAR_CHAT } = process.env
const Chats = ({ onSelectChat }: Props): ReactElement => {
    const { panel } = style

    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [storageDate, _] = useState<{ Date?: Date }>({})

    const { loading, data, subscribeToMore } =
        useQuery<{ Chats: Chat[], UserCurrent: User }>(GetChatsExploler)
    const { loading: loadFind, data: dataFind, refetch } = useQuery(FindQuery, { fetchPolicy: 'no-cache' })

    //#region Subscription
    const addMore = () => subscribeToMore({
        document: GQL.Subscription.AddChat,
        updateQuery: (_, { subscriptionData, variables }) => {
            const AddChat = (subscriptionData?.data as any)?.AddChat as Chat
            if (!AddChat) return null

            variables.isIncoming = true
            return {
                Chats: [AddChat],
                UserCurrent: { chats_id: [AddChat?._id] }
            } as any
        }
    })

    const remMore = () => subscribeToMore({
        document: GQL.Subscription.RemoveChat,
        updateQuery: (prev, { subscriptionData, variables }) => {
            const RemoveChat = (subscriptionData?.data as any)?.RemoveChat as Chat
            if (!RemoveChat) return null
            const chats = prev?.Chats?.filter(chat => chat._id != RemoveChat._id)
            const chats_id = (prev as any)?.UserCurrent?.chats_id.filter(id => id != RemoveChat._id) as ID[]

            variables.isIncoming = true
            return { Chats: chats, UserCurrent: { chats_id: chats_id } } as any
        }
    })

    useEffect(() => {
        if (!subscribeToMore) return
        addMore()
        remMore()
    }, [])
    //#endregion

    const runFind = () => setIsSearch(true)
    const stopFind = () => setIsSearch(false)

    const onFindChatsMess = (text: string) => {
        if (!text) {
            storageDate.Date = null
            stopFind()
            return
        }

        const date = new Date()
        storageDate.Date = date
        setTimeout(() => {
            if (storageDate.Date == date) {
                refetch({ text })
                runFind()
            }
        }, 400)
    }

    const blockMes = (chat: Chat, mes: Message, key): ReactElement =>
        <BlockPanel title={chat?.title} text={mes?.text}
            image={chat?.image ?? EMPTY_AVATAR_CHAT}
            date={WhatDate(new Date(mes?.date))}
            onClick={() => onSelectChat(chat?._id)}
            key={key} />

    const block = (chat: Chat, key): ReactElement => blockMes(chat, chat?.lastMessage, key)

    const dataChats: Chat[] = data?.Chats
    const dataFindChats: Chat[] = dataFind?.FindChat
    const dataFindMess: Chat[] = dataFind?.FindMessage

    const isChatsEmpty = dataChats?.length == 0
    const countFindChats = dataFindChats?.length
    const countFindMess = dataFindMess?.
        reduce((sum, curr) => sum + (curr?.messages ? curr?.messages.length : 0), 0)

    return <div className={panel}>
        <Search loading={loadFind}
            onClick={() => { }}
            onClear={stopFind}
            onChange={(e) => onFindChatsMess(e?.target?.value)} />
        <Loader loading={loading} />
        {!isSearch ?
            !isChatsEmpty ?
                dataChats?.map(block) :
                <BlockInfo what={`Chats empty`} /> :
            <>
                <BlockInfo what={`Found chats ${countFindChats ?? 0}`} />
                {dataFindChats?.map(block)}
                <BlockInfo what={`Found messages ${countFindMess ?? 0}`} />
                {dataFindMess?.map(chat =>
                    chat?.messages?.map((mes, key) =>
                        blockMes(chat, mes, key)))}
            </>}
    </div>
}

export default Chats
