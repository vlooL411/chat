import Block from "./Block";
import BlockUser from "./BlockUser";
import { ReactElement } from "react";
import { Chat, Creater } from "apolloclient/types";

type Props = {
    chat: Chat
}

const { EMPTY_AVATAR_CHAT } = process.env
const Choice = ({ chat }: Props): ReactElement => {
    switch (chat?.creater) {
        case Creater.User:
            return <BlockUser chat={chat} />
        case Creater.Chat:
            return <Block title={chat?.title} image={chat?.image ?? EMPTY_AVATAR_CHAT} />
        default:
            return null
    }
}

export default Choice