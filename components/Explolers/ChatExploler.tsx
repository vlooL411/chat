import Strategy from 'utils/Strategy'
import { GQLT } from '@GQLT'
import { Chat, ID, User } from '@types'
import { ReactElement } from 'react'

import Exploler from './Exploler'
import { DropElem } from './Bar/BarDrop'

type Props = {
  chatid: ID
}

const { EMPTY_AVATAR_CHAT } = process.env

const ChatExploler = ({ chatid }: Props): ReactElement => {
  const [inviteChat] = GQLT.Mutation.useInviteChat()
  const [removeChat] = GQLT.Mutation.useRemoveChat()
  const [leaveChat] = GQLT.Mutation.useLeaveChat()

  const dropList = (chat: Chat, user: User): DropElem[] => {
    if (!chat) return

    const chatid = { variables: { chatid: chat?._id } }
    const strategy = new Strategy<DropElem>()

    const isCreater = user?._id && chat?.creaters_id?.includes(user?._id)
    const isInvite = chat?._id && user?.chats_id?.includes(chat?._id)

    const onIsCreater = (): DropElem =>
      isCreater ? { text: 'Delete chat', onClick: () => removeChat(chatid) } : null

    const onIsInvite = (): DropElem =>
      isInvite ?
        { text: 'Leave chat', onClick: () => leaveChat(chatid) } :
        { text: 'Invite chat', onClick: () => inviteChat(chatid) }

    strategy.pushAction(onIsCreater)
    strategy.pushAction(onIsInvite)

    return strategy.execute()
  }

  return <Exploler chatid={chatid}
    BarProps={(chat) => ({
      title: chat?.title,
      image: chat?.image ?? EMPTY_AVATAR_CHAT,
      dropList: (user) => dropList(chat, user)
    })} />
}

export default ChatExploler