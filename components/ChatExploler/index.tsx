import Bar from './Bar'
import { GQL } from '@GQL'
import { GQLT } from '@GQLT'
import Loader from '../Loader'
import MessageAction, { MessageActionMode } from './MessageAction'
import MessageBlock from './MessageBlock'
import { first, last } from 'utils/array'
import { Chat, ID, Message } from '@types'
import LocalStorage from 'utils/LocalSrorage'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import ScrollLoadMore from '../Scroll/ScrollLoadMore'
import style from './styles/chatExploler.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'

type Props = {
  chatid: ID
}

const limit: number = 100
const limitQT: number = Math.round(limit / 4)
const scrollLoad: number = 100

const ChatExploler = ({ chatid }: Props): ReactElement => {
  const { chatExploler, messages, scrollcontainer } = style
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
  const mess = dataMess?.Messages?.Chat?.messages

  const ScrollElem = (mes: Message) =>
    <MessageBlock chatid={chatid} message={mes} key={mes?._id as string}
      switchMessageAction={(mes) => setMesActionMode({ mes, mode: 'change' })} />

  //#region scroll
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

  const loadMore = (message: Message, isUp: boolean) => {
    if (!infoMore || loadMess) return
    Refetch(limitQT * (isUp ? -1 : 1), message?._id)
  }

  const cmdEnd = (end: ID, el: Message) => end == el?._id

  const scroll = useMemo<ReactElement>(() => <ScrollLoadMore
    className={messages}
    array={mess}
    cmpEnd={cmdEnd}
    elemInit={ScrollElem}
    isEnd={{ up: infoMore?.isEndUp, down: infoMore?.isEndDown }}
    scrollUp={scrollLoad} scrollDown={scrollLoad}
    onScrollZero={scrollZero}
    onScrollUp={(mes) => loadMore(mes, true)}
    onScrollDown={(mes) => loadMore(mes, false)} />,
    [infoMore, mess, mess?.length])
  //#endregion

  const bar = useMemo<ReactElement>(() => <Bar chat={chat} />, [chat])
  const messageAction = useMemo<ReactElement>(() =>
    <MessageAction chatid={chatid} action={mesActionMode} />,
    [chatid, mesActionMode])

  return <div className={chatExploler}>
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

export default ChatExploler