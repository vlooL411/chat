import { GQL } from '@GQL'
import Choice from './Choice'
import Loader from '../Loader'
import Search from 'components/Search'
import { Chat, ID, Message, User } from '@types'
import { Fragment } from 'apolloclient/fragment'
import BlockInfo from 'components/Search/BlockInfo'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { ReactElement, useEffect, useState } from 'react'
import style from './styles/chats.module.sass'

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
    query findMessage($text: String!) {
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

//TODO static Date: Date ??????
class StoreDate {
    static Date: Date
}

const Chats = ({ onSelectChat }: Props): ReactElement => {
    const { chats } = style

    const [isSearch, setIsSearch] = useState<boolean>(false)

    const { loading, data, subscribeToMore } =
        useQuery<{ Chats: Chat[], UserCurrent: User }>(GetChatsExploler)
    const [findChatMes, { loading: loadFind, data: findData }] = useLazyQuery(FindQuery)

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

    const findMessage = (text: string) => {
        if (!text) {
            StoreDate.Date = null
            stopFind()
            return
        }

        const date = new Date()
        StoreDate.Date = date
        setTimeout(() => {
            if (StoreDate.Date == date) {
                findChatMes({ variables: { text } })
                runFind()
            }
        }, 400)
    }

    const choiceMes = (chat: Chat, mes: Message, key): ReactElement =>
        <Choice key={key} chat={chat} message={mes} onSelectChat={onSelectChat} />
    const choice = (chat: Chat, key): ReactElement => choiceMes(chat, null, key)

    const dataChats: Chat[] = data?.Chats
    const dataFindChats: Chat[] = findData?.FindChat
    const dataFindMess: Chat[] = findData?.FindMessage

    const isChatsEmpty = dataChats?.length == 0
    const countFindChats = dataFindChats?.length
    const countFindMess = dataFindMess?.
        reduce((sum, curr) => sum + (curr?.messages ? curr?.messages.length : 0), 0)

    return <div className={chats}>
        <Search loading={loadFind}
            onClick={() => { }}
            onClear={() => stopFind()}
            onChange={(e) => findMessage(e?.target?.value)} />
        <Loader loading={loading} />
        {!isSearch ?
            !isChatsEmpty ?
                dataChats?.map(choice) :
                <BlockInfo what={`Chats empty`} /> :
            <>
                <BlockInfo what={`Found chats ${countFindChats ?? 0}`} />
                {dataFindChats?.map(choice)}
                <BlockInfo what={`Found messages ${countFindMess ?? 0}`} />
                {dataFindMess?.map(chat =>
                    chat?.messages?.map((mes, key) =>
                        choiceMes(chat, mes, key)))}
            </>}
    </div>
}

export default Chats
