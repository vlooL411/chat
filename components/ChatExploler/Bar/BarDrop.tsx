import { GQLT } from "@GQLT";
import { Chat, User } from "@types"
import { ReactElement, useMemo } from "react"
import style from './styles/bardrop.module.sass'

type Elem = {
    text: string
    onClick?: () => void
}

type Props = {
    chat: Chat
    visible: boolean
}

const BarDrop = ({ chat, visible }: Props): ReactElement => {
    const { bardrop, bardrop_hidden, block } = style

    const { data, refetch } = GQLT.Query.useUserCurrent()
    const [inviteChat, { data: dataInvite }] = GQLT.Mutation.useInviteChat()
    const [removeChat, { data: dataRemove }] = GQLT.Mutation.useRemoveChat()
    const [leaveChat, { data: dataLeave }] = GQLT.Mutation.useLeaveChat()

    const user = data?.UserCurrent as User

    const list = useMemo<Elem[]>(() => {
        if (!chat) return

        const dropList: Elem[] = []

        const pushElem = (text: string, onClick: () => void) => {
            const Refetch = () => {
                onClick()
                refetch()
            }
            dropList.push({ text, onClick: Refetch })
        }

        const chatid = { variables: { chatid: chat?._id } }
        const isCreater = user?._id == chat?.creater_id
        const isInvite = user?.chats_id?.includes(chat?._id)

        if (isCreater) pushElem('Delete chat', () => removeChat(chatid))
        if (isInvite) pushElem('Leave chat', () => leaveChat(chatid))
        else pushElem('Invite chat', () => inviteChat(chatid))

        return dropList
    }, [user?.chats_id, chat?._id])

    return <div className={`${bardrop} ${visible ? bardrop_hidden : ''}`}>
        {list?.map(({ text, onClick }, key) =>
            <span className={block} onClick={onClick} key={key}>{text}</span>)}
    </div>
}

export default BarDrop
