import { Chat, ID, User } from "apolloclient/types";
import { gql, useLazyQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";
import Block from "./Block";

const GetUser = gql`
    query user($id: ID!) {
        User(id: $id) {
            _id
            name
            image
        }
    }
`

type Props<T> = {
    chat: Chat
    text: string
    onSelectChat: (id: ID) => void
}

const { EMPTY_AVATAR_USER } = process.env
function BlockUser<T>({ chat, text, onSelectChat }: Props<T>): ReactElement {
    const [getUser, { data: dataUser }] = useLazyQuery(GetUser)
    const [titleImg, setTitleImg] = useState<{ name: string, image: string }>(null!)

    useEffect(() =>
        getUser({ variables: { id: chat?.creater_id } }),
        [chat?._id, chat?.creater_id])

    const user = dataUser?.User as User
    useEffect(() =>
        setTitleImg({ name: user?.name, image: user?.image }),
        [dataUser])

    return <Block chat={chat}
        title={titleImg?.name}
        image={titleImg?.image ?? EMPTY_AVATAR_USER}
        text={text}
        onSelectChat={onSelectChat} />
}

export default BlockUser