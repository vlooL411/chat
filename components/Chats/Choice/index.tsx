import { ReactElement } from "react";
import Block from "./Block";
import BlockUser from "./BlockUser";
import { Chat, Creater, ID, Message } from "apolloclient/types";

type Props = {
    chat: Chat
    message: Message
    onSelectChat: (id: ID) => void
}

const { EMPTY_AVATAR_CHAT } = process.env
const Choice = ({ chat, onSelectChat, message }: Props): ReactElement => {
    const text = message?.text ?? chat?.lastMessage?.text

    switch (chat?.creater) {
        case Creater.User:
            return <BlockUser chat={chat} text={text} onSelectChat={onSelectChat} />
        case Creater.Chat:
            return <Block chat={chat}
                text={text}
                onSelectChat={onSelectChat}
                title={chat?.title}
                image={chat?.image ?? EMPTY_AVATAR_CHAT} />
        default:
            return null
    }
}

export default Choice