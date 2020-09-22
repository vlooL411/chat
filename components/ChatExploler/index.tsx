import Bar from './Bar'
import { GQL } from '@GQL'
import { GQLT } from '@GQLT'
import Loader from '../Loader'
import MessageSend from './MessageSend'
import MessageBlock from './MessageBlock'
import { first, last } from 'utils/array'
import { Chat, ID, Message } from '@types'
import LocalStorage from 'utils/LocalSrorage'
import { ReactElement, useEffect, useMemo } from 'react'
import ScrollLoadMore from '../Scroll/ScrollLoadMore'
import style from './styles/chatExploler.module.sass'

type Props = {
  chatid: ID
}

const limit: number = 100
const limitQT: number = Math.round(limit / 4)
const scrollLoad: number = 100

const ChatExploler = ({ chatid }: Props): ReactElement => {
  const { chatExploler, messages } = style

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
      const AddMessage = (subscriptionData?.data as any)?.AddMessage as Chat
      if (!AddMessage) return null;

      const lastMessage = AddMessage
      const mess = prev?.Messages?.Chat?.messages
      const lastElemID = last(mess)?._id

      if (lastElemID == prev?.Messages?.InfoMore?.isEndDown)
        return { Messages: { Chat: { lastMessage }, InfoMore: { isEndDown: lastMessage?._id } } } as any

      variables.isIncoming = true
      const messages = mess ? [...mess, AddMessage] : [AddMessage]
      return { Messages: { Chat: { lastMessage, messages } } } as any
    }
  })

  const remMore = () => subscribeToMore({
    document: GQL.Subscription.RemoveMessage,
    updateQuery: (prev, { subscriptionData, variables }) => {
      const RemoveMessage = (subscriptionData?.data as any)?.RemoveMessage as Message
      if (!RemoveMessage) return null;

      variables.isIncoming = true
      const messages = prev?.Messages?.Chat?.messages?.filter((el) => el._id == RemoveMessage._id)
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
  const mess = dataMess?.Messages?.Chat?.messages

  const scrollZero = () => {
    if (!infoMore && !mess && infoMore?.size == mess?.length) return

    const firstMessageID = first(mess)?._id
    const lastMessageID = last(mess)?._id

    let messageid = firstMessageID
    let Limit = -limitQT

    if (infoMore?.isEndDown != lastMessageID)
      [messageid, Limit] = [lastMessageID, Limit * -1]
    Refetch(Limit, messageid)
  }


  const loadMoreUp = (firstMessage: Message) => {
    if (!infoMore || loadMess) return
    // console.log('loadMoreUp', isEndUp, firstMessageID, loadMess, isEndUp == firstMessageID, mess)
    Refetch(-limitQT, firstMessage?._id)
  }

  const loadMoreDown = (lastMessage: Message) => {
    if (!infoMore || loadMess) return
    // console.log('loadMoreDown', isEndDown, lastMessageID, isEndDown == lastMessageID, mess)
    Refetch(limitQT, lastMessage?._id)
  }

  const cmdEnd = (end: ID, el: Message) => end == el?._id

  const ScrollElem = (mes: Message, key) =>
    <MessageBlock chatid={chatid} message={mes} key={key} />

  const scroll = useMemo<ReactElement>(() => <ScrollLoadMore
    className={messages}
    array={mess}
    cmpEnd={cmdEnd}
    elemInit={ScrollElem}
    isEnd={{ up: infoMore?.isEndUp, down: infoMore?.isEndDown }}
    scrollUp={scrollLoad} scrollDown={scrollLoad}
    onScrollZero={scrollZero}
    onScrollUp={loadMoreUp}
    onScrollDown={loadMoreDown} />,
    [infoMore, mess, mess?.length])

  const bar = useMemo<ReactElement>(() => <Bar chat={chat} />, [chat])
  const messageSend = useMemo<ReactElement>(() => <MessageSend chatid={chatid} />, [chatid])

  return <div className={chatExploler}>
    {bar}
    <p style={{ color: 'white', margin: 0 }}>Count messages: {mess?.length}</p>
    <Loader loading={loadMess} />
    {scroll}
    <Loader loading={loadMess || loading} />
    {messageSend}
  </div >
}

export default ChatExploler