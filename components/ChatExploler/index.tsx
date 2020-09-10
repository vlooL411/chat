import Bar from './Bar'
import Loader from '../Loader'
import MessageSend from './MessageSend'
import MessageBlock from './MessageBlock'
import { Chat, ID, Message } from '../../apolloclient/types'
import { gql, useQuery, useSubscription } from '@apollo/client'
import { useEffect } from 'react'
import style from './styles/chatExploler.module.sass'

const GetChat = gql`
  query chat($chatid: ID!) {
    Chat(chatid: $chatid) {
      _id
      creater_id
      creater
      date
      title
      users_id
      messages {
        _id
        userid
        text
        date
        isChange
      }
    }
  }
`

const AddMesSub = gql`
  subscription {
    AddMessage {
      _id
      text
      userid
      date
      isChange
    }
  }
`

const ChangeMesSub = gql`
  subscription {
    ChangeMessage {
      _id
      text
      isChange
    }
  }
`

const RemMesSub = gql`
  subscription {
    RemoveMessage {
      _id
    }
  }
`

type Props = {
  chatid: ID
}

const ChatExploler = ({ chatid }: Props) => {
  const { chatExploler, messages } = style
  const { loading, data, subscribeToMore, refetch } = useQuery(GetChat, { variables: { chatid } })

  useSubscription(ChangeMesSub);

  const addMore = () => subscribeToMore({
    document: AddMesSub,
    updateQuery: (prev, { subscriptionData }) => {
      refetch()
      const data = subscriptionData?.data as any as { AddMessage: Message }
      return Object.assign({}, prev, {
        Chat: {
          messages: [data?.AddMessage, prev?.Chat?.messages]
        }
      })
    }
  })

  const remMore = () => subscribeToMore({
    document: RemMesSub,
    updateQuery: (prev: { Chat: Chat }, { subscriptionData }) => {
      refetch()
      const data = subscriptionData.data as any as { RemoveMessage: Message }

      const { RemoveMessage } = data
      const messages = Object.assign([], prev?.Chat?.messages)
      const indexRemMes = messages?.findIndex(mes => mes._id == RemoveMessage._id)
      messages.splice(indexRemMes, 1)

      return Object.assign({}, prev, {
        Chat: { messages }
      })
    }
  })

  useEffect(() => {
    if (loading) {
      addMore()
      remMore()
    }
  }, [])

  const chat = data?.Chat
  return <div className={chatExploler}>
    <Bar chat={chat} />
    <div className={messages}>
      {chat?.messages?.map((mes, key) =>
        <MessageBlock key={key} chatid={chat?._id} message={mes}
          maxTextHeight={'250px'} maxTextWidth={'250px'} />)}
      <Loader loading={loading} />
    </div>
    <MessageSend chatid={chat?._id} />
  </div>
}

export default ChatExploler