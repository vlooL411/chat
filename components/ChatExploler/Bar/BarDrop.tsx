import { GQLT } from "@GQLT";
import { Chat, User } from "@types"
import { gql } from "@apollo/client";
import { ReactElement, useEffect, useMemo } from "react"
import style from './styles/bardrop.module.sass'

const GetUserCurr = gql`
    query {
        UserCurrent {
            _id
            chats_id
        }
    }
`;

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

    const [getUserCurr, { data, refetch }] = GQLT.Query.useUserCurrentLazy(null, GetUserCurr)
    const [inviteChat, { data: dataInvite }] = GQLT.Mutation.useInviteChat()
    const [removeChat, { data: dataRemove }] = GQLT.Mutation.useRemoveChat()
    const [leaveChat, { data: dataLeave }] = GQLT.Mutation.useLeaveChat()

    //TODO remake
    useEffect(() => getUserCurr(), [])

    const user = data?.UserCurrent as User

    const list = useMemo<Elem[]>(() => {
        if (!user) return null

        const dropList: Elem[] = []

        const pushElem = (text: string, onClick: () => void) => {
            const Refetch = () => {
                onClick()
                refetch()
            }
            dropList.push({ text, onClick: Refetch } as Elem)
        }

        const chatid = { variables: { chatid: chat?._id } }
        const isCreater = user?._id == chat?.creater_id
        const isInvite = user?.chats_id?.includes(chat?._id)

        if (isCreater) pushElem('Delete chat', () => removeChat(chatid))
        if (isInvite) pushElem('Leave chat', () => leaveChat(chatid))
        else pushElem('Invite chat', () => inviteChat(chatid))

        return dropList
    }, [user, chat?._id])

    return <div className={`${bardrop} ${visible ? bardrop_hidden : ''}`}>
        {list?.map(({ text, onClick }, key) =>
            <span className={block} onClick={onClick} key={key}>{text}</span>)}
    </div>
}

export default BarDrop
