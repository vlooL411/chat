import Strategy from 'utils/Strategy'
import { ReactElement } from 'react'
import { Chat, Contact, User } from '@types'

import Exploler from './Exploler'
import { DropElem } from './Bar/BarDrop'
import { useInviteChatMutation, useLeaveChatMutation, useRemoveChatMutation } from '@frontend'

type Props = {
    contact: Contact
}

const { EMPTY_AVATAR_USER } = process.env
const ContactExploler = ({ contact }: Props): ReactElement => {
    const [inviteChat] = useInviteChatMutation()
    const [removeChat] = useRemoveChatMutation()
    const [leaveChat] = useLeaveChatMutation()

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

    const user = contact?.User
    return <Exploler chatid={contact?._id}
        BarProps={(chat) => ({
            title: contact?.whoIsContact ? contact?.whoIsContact : user?.name,
            image: user?.image ?? EMPTY_AVATAR_USER,
            dropList: (user) => dropList(chat, user)
        })} />
}

export default ContactExploler