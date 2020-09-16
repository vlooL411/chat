import Block from "./Block"
import { Chat, User } from "apolloclient/types"
import { gql, useLazyQuery } from "@apollo/client"
import { ReactElement, useEffect, useState } from "react"
import { WhatDateToday } from "components/common/WhatDate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMobileAlt, faPlug } from "@fortawesome/free-solid-svg-icons"
import style from './block.module.sass'

const GetUser = gql`
    query user($id: ID!) {
        User(id: $id) {
            _id
            name
            image
        }
    }
`

type Props = {
    chat: Chat
}

const { EMPTY_AVATAR_USER } = process.env
const BlockUser = ({ chat }: Props): ReactElement => {
    const { block_online } = style

    const [getUser, { data: dataUser }] = useLazyQuery(GetUser)
    const [titleImg, setTitleImg] = useState<{ name: string, image: string }>(null!)

    useEffect(() =>
        getUser({ variables: { id: chat?.creater_id } }),
        [chat?._id, chat?.creater_id])

    const user = dataUser?.User as User

    useEffect(() =>
        setTitleImg({ name: user?.name, image: user?.image }),
        [user, chat?._id, chat?.creater_id])

    const children = <div className={block_online}>
        {user?.isOnline ?
            <FontAwesomeIcon icon={user?.isOnlineMobile ? faMobileAlt : faPlug} /> :
            user?.dateLastOnline ?
                <>last seen {WhatDateToday(new Date(user?.dateLastOnline))}</> :
                <>never</>}
    </div>

    return <Block title={titleImg?.name}
        image={titleImg?.image ?? EMPTY_AVATAR_USER}
        children={children} />
}

export default BlockUser