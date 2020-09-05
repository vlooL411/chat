import Bar from './Bar'
import MessageSend from './MessageSend'
import MessageBlock from './MessageBlock'
import { gql, useQuery } from '@apollo/client'
import { Chat, ID } from '../../apolloclient/types'
import style from './styles/chatExploler.module.sass'
import Loader from '../common/Loader'

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

type Props = {
  id: ID
}

const ChatExploler = ({ id }: Props) => {
  const { chatExploler, messages } = style
  const { loading, error, data } = useQuery(GetChat, { variables: { id } })

  const chat: Chat = data?.Chat
  return <div className={chatExploler}>
    <Bar chat={chat} />
    {error && process.env.NODE_ENV == 'development' ?
      <p style={{ color: 'red' }}>Error {error.message}</p> :
      null}
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
