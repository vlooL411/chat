import Bar from './Bar'
import Loader from '../common/Loader'
import MessageSend from './MessageSend'
import MessageBlock from './MessageBlock'
import { gql, useQuery, useSubscription } from '@apollo/client'
import { Chat, ID, Message } from '../../apolloclient/types'
import style from './styles/chatExploler.module.sass'
import { useState, useMemo, useEffect } from 'react'

const GetChat = gql`
  query chat($id: ID!) {
    Chat(id: $id) {
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
  id: ID
}

const ChatExploler = ({ id }: Props) => {
  const { chatExploler, messages } = style
  const { loading, data } = useQuery<{ Chat: Chat }>(GetChat, { variables: { id } })

  useSubscription(ChangeMesSub);
  const { data: AddMes, loading: loadAddMes } = useSubscription(AddMesSub);
  const { data: RemMes, loading: loadRemMes } = useSubscription(RemMesSub);

  const chat = data?.Chat

  /*if (AddMes?.AddMessage) {
      console.log('AddDataMessage', AddMes)
      const { AddMessage: addMes } = AddMes
      chat.messages.push(addMes)
      AddMes.AddMessage = null
    }
  
    if (RemMes?.RemoveMessage) {
      console.log('RemoveDataMessage', RemMes)
      const { RemoveMessage: removeMessage } = RemMes
      chat.messages.findIndex(el => el._id == removeMessage?._id)
      RemMes.RemoveMessage = null
    } */

  return <div className={chatExploler}>
    <Bar chat={chat} />
    <div className={messages}>
      <Loader loading={loading} />
      {chat?.messages?.map((mes, key) =>
        <MessageBlock key={key} chatid={chat?._id} message={mes}
          maxTextHeight={'250px'} maxTextWidth={'250px'} />)}
    </div>
    <MessageSend chatid={chat?._id} />
  </div>
}

export default ChatExploler