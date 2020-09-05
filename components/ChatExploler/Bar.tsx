import { ReactElement, useState, useEffect, useMemo } from "react"
import style from './styles/bar.module.sass'
import { User, Chat, ChatCreater } from "../../apolloclient/types"
import { WhatDateToday } from "../common/WhatDate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlug, faEllipsisV, faMobileAlt, faPalette } from "@fortawesome/free-solid-svg-icons"
import { gql, useLazyQuery } from "@apollo/client"

const GetUser = gql`
    query user($id: ID!) {
        User(id: $id) {
            name
            image
            isOnline
            isOnlineMobile
            dateLastOnline
        }
    }
`

type Props = {
    chat?: Chat
}

const Bar = ({ chat }: Props): ReactElement => {
    const { bar, bar_block, bar_block_title, bar_block_online, bar_tools } = style

    const creater = chat?.creater == undefined ? null : chat.creater

    const [titleImg, setTitleName] = useState<{ title: string, img: string }>(null!)
    const [getUser, { loading, data }] =
        useLazyQuery(GetUser, { variables: { id: chat?.creater_id } })

    const isUser = chat?.creater == null || chat?.creater == ChatCreater.User /* || chat.creater == ChatCreater.User */
    let user: User

    useEffect(() => {
        switch (creater) {
            case null:
            case ChatCreater.User:
                getUser()
            case ChatCreater.Chat:
                setTitleName({ title: chat?.title, img: chat?.image })
        }
    }, [chat])

    useMemo(() => {
        if (loading && isUser) {
            const user = data?.user as User
            setTitleName({ title: user?.name, img: user?.image })
        }
    }, [loading])

    const UserBlock = (): ReactElement =>
        <div className={bar_block_online}>{user?.isOnline ?
            <FontAwesomeIcon icon={user?.isOnlineMobile ? faMobileAlt : faPlug} /> :
            user?.dateLastOnline ?
                <>last seen {WhatDateToday(new Date(user?.dateLastOnline))}</> :
                <>never</>}
        </div>

    const { EMPTY_AVATAR_USER } = process.env
    const { EMPTY_AVATAR_CHAT } = process.env

    return <div className={bar}>
        <div className={bar_block}>
            <img src={titleImg?.img ?? isUser ? EMPTY_AVATAR_USER : EMPTY_AVATAR_CHAT} />
            <p className={bar_block_title}>{titleImg?.title ?? 'No name'}</p>
            {isUser ? <UserBlock /> : null}
        </div>
        <div className={bar_tools}>
            <button>
                <FontAwesomeIcon icon={faPalette} />
            </button>
            <button>
                <FontAwesomeIcon icon={faEllipsisV} />
            </button>
        </div>
    </div>
}

export default Bar
