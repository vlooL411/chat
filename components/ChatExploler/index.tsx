import Bar from './Bar'
import { GQL } from '@GQL'
import { GQLT } from '@GQLT'
import Loader from '../Loader'
import MessageSend from './MessageSend'
import MessageBlock from './MessageBlock'
import { Chat, ID, Message } from '@types'
import { NetworkStatus } from '@apollo/client'
import { UIEvent, useEffect, useRef, useState } from 'react'
import style from './styles/chatExploler.module.sass'

type Props = {
  chatid: ID
}

const limit: number = 3
const scrollLoad: number = 120
const scrollByTop: number = 100

const ChatExploler = ({ chatid }: Props) => {
  const { chatExploler, messages } = style

  const messagesRef = useRef<HTMLDivElement>(null!)

  const [isEnd, setIsEnd] = useState<boolean>(false)
  const [isScrollPosition, setIsScrollPosition] =
    useState<{ scrollTop: number, scrollHeight: number }>(null!)
  const { loading, data } = GQLT.Query.useChat({ variables: { chatid } })
  const { data: dataMess, loading: loadMess, networkStatus, refetch, subscribeToMore } =
    GQLT.Query.useMessages({ variables: { chatid, limit: limit * 3, lastMessageID: null } })


  const isReadyLoadMore = networkStatus == NetworkStatus.ready
  const infoMore = dataMess?.Messages?.InfoMore

  //#region Subscribtion
  GQLT.Subscription.useChangeMessage();

  useEffect(() => {
    if (infoMore?.isEnd)
      setIsEnd(true)
  }, [infoMore?.isEnd])

  const addMore = () => subscribeToMore({
    document: GQL.Subscription.AddMessage,
    updateQuery: (prev, { subscriptionData }) => {
      console.log(prev, subscriptionData)

      const { AddMessage } = subscriptionData?.data as any as { AddMessage: Message }
      if (!AddMessage) return prev

      const obj = Object.assign({}, prev, {
        Messages: { Chat: { lastMessage: AddMessage, messages: [AddMessage] } }
      })

      console.log('Obj out prev', obj);

      return obj
    }
  })

  const remMore = () => subscribeToMore({
    document: GQL.Subscription.RemoveMessage,
    updateQuery: (prev, { subscriptionData }) => {
      const data = subscriptionData.data as any as { RemoveMessage: Message }
      const messages = Object.assign([], prev?.Messages?.Chat?.messages)
      const indexRemMes = messages?.findIndex(mes => mes._id == data?.RemoveMessage._id)
      messages.splice(indexRemMes, 1)

      const lastMessage = messages.slice(-1)
      return Object.assign({}, prev, { Messages: { Chat: { lastMessage, messages } } })
    }
  })

  useEffect(() => {
    if (!subscribeToMore) return
    addMore()
    remMore()
  }, [])
  //#endregion

  const chat = dataMess?.Messages?.Chat as Chat

  const loadMore = () => {
    if (isEnd || !isReadyLoadMore || loadMess || isScrollPosition) return
    const lastMessageID = chat?.messages?.length > 0 ? chat.messages[0]?._id : null
    const { scrollTop, scrollHeight } = messagesRef?.current
    setIsScrollPosition({ scrollHeight, scrollTop })
    refetch({ chatid, limit, lastMessageID })
  }

  useEffect(() => loadMore(), [])
  useEffect(() => {
    if (isScrollPosition) {
      const { scrollHeight, scrollTop } = isScrollPosition
      console.log(messagesRef?.current?.scrollHeight, scrollHeight, scrollTop, messagesRef?.current?.scrollHeight - scrollTop)
      messagesRef?.current?.scrollBy(
        { top: messagesRef?.current?.scrollHeight - scrollHeight })
      setIsScrollPosition(null)
    }
  }, [chat?.messages?.length])

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e?.currentTarget
    if (scrollTop < scrollLoad || scrollTop == 0) loadMore()
  }

  const chatInfo = data?.Chat
  return <div className={chatExploler}>
    <span style={{ color: 'white' }}>{`Count messages: ${chat?.messages?.length}`}</span>
    <Bar chat={chatInfo} />
    <div className={messages} ref={messagesRef} onScroll={(e) => onScroll(e)}>
      {chat?.messages?.map((mes, key) =>
        <MessageBlock chatid={chatid} message={mes} key={key} />)}
      <Loader loading={loading} />
    </div>
    <MessageSend chatid={chatid} />
  </div >
}

export default ChatExploler