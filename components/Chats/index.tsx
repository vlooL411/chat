import { GQL } from '@GQL'
import Choice from './Choice'
import Loader from '../Loader'
import Search from 'components/Search'
import SearchInfo from 'components/Search/SearchInfo'
import { Chat, ID, Message } from 'apolloclient/types'
import { ReactElement, useEffect, useState } from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import style from './styles/chats.module.sass'

const GetChatsExploler = gql`
    query chats($start: Int!, $end: Int!) {
        Chats(start: $start, end: $end) {
            _id
            title
            image
            date
            creater
            creater_id
            access
            lastMessage {
                _id
                text
            }
        }
        UserCurrent {
            _id
            chats_id
        }
    }
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
        _id
        title
        image
        date
        creater
        creater_id
        messages {
            _id
            text
        }
    }
`

type Props = {
    onSelectChat: (id: ID) => void
}

class StoreDate {
    static Date: Date
}

const Chats = ({ onSelectChat }: Props): ReactElement => {
    const { chats } = style

    const [isSearch, setIsSearch] = useState<boolean>(false)

    //#region Query
    const { loading, data, subscribeToMore, refetch } =
        useQuery(GetChatsExploler, { variables: { start: 0, end: 10 } })
    const [findChatMes, { loading: loadFind, data: findData }] = useLazyQuery(FindQuery)
    //#endregion

    //#region Subscription
    const addMore = () => subscribeToMore({
        document: GQL.Subscription.AddChat,
        updateQuery: (prev, { subscriptionData }) => {
            refetch()
            const data = subscriptionData?.data as any as { AddChat: Chat }
            return Object.assign({}, prev, {
                Chats: [data?.AddChat]
            })
        }
    })

    const remMore = () => subscribeToMore({
        document: GQL.Subscription.RemoveChat,
        updateQuery: (prev, { subscriptionData }) => {
            refetch()
            const data = subscriptionData?.data as any as { RemoveChat: Chat }

            const { RemoveChat } = data
            const chats = Object.assign([], prev?.Chat)
            const indexRemChat = chats?.findIndex(mes => mes._id == RemoveChat._id)
            chats.splice(indexRemChat, 1)

            return Object.assign({}, { Chat: chats })
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

    const countFindMess = dataFindMess?.
        reduce((sum, curr) => sum + (curr?.messages ? curr?.messages.length : 0), 0)

    return <div className={chats}>
        <Search loading={loadFind}
            onClick={() => { }}
            onClear={() => stopFind()}
            onChange={(e) => findMessage(e?.target?.value)} />
        <Loader loading={loading} />
        {!isSearch ? dataChats?.map(choice) :
            <>
                {dataFindChats?.map(choice)}
                <SearchInfo what='messages' count={countFindMess} />
                {dataFindMess?.map(chat =>
                    chat?.messages?.map((mes, key) =>
                        choiceMes(chat, mes, key)))}
            </>}
    </div>
}

export default Chats
