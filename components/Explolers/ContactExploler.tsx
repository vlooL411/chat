import Strategy from 'utils/Strategy'
import { GQLT } from '@GQLT'
import { ReactElement } from 'react'
import { Chat, Contact, User } from '@types'

import Exploler from './Exploler'
import { DropElem } from './Bar/BarDrop'

type Props = {
    contact: Contact
}

const { EMPTY_AVATAR_USER } = process.env
const ContactExploler = ({ contact }: Props): ReactElement => {
    const [inviteChat] = GQLT.Mutation.useInviteChat()
    const [removeChat] = GQLT.Mutation.useRemoveChat()
    const [leaveChat] = GQLT.Mutation.useLeaveChat()

    const dropList = (chat: Chat, user: User): DropElem[] => {
        if (!chat) return

        const chatid = { variables: { chatid: chat?._id } }
        const strategy = new Strategy<DropElem>()

        const isCreater = user?._id && chat?.creaters_id?.includes(user?._id)
        const isInvite = chat?._id && user?.contacts?.findIndex(el => el._id == chat?._id) != -1

        const onIsCreater = (): DropElem =>
            isCreater ? { text: 'Delete chat', onClick: () => removeChat(chatid) } : null

        const onIsInvite = (): DropElem =>
            !isInvite ? { text: 'Invite chat', onClick: () => inviteChat(chatid) } : null

        strategy.pushAction(onIsCreater)
        strategy.pushAction(onIsInvite)

        return strategy.execute()
    }

    return <Exploler chatid={contact?._id}
        BarProps={(chat) => ({
            title: contact?.whoIsContact ? contact?.whoIsContact : contact?.name,
            image: contact?.image ?? EMPTY_AVATAR_USER,
            dropList: (user) => dropList(chat, user)
        })} />
}

export default ContactExploler