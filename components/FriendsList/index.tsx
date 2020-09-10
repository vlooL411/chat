import style from './friendsList.module.sass'
import { gql, useQuery } from '@apollo/client'
import { ReactElement } from 'react'
import { Friend } from '../../apolloclient/types'
import { faPlug, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { WhatDateToday } from '../common/WhatDate'

const GetFriendsExploler = gql`
    query friends($id: ID!) {
        Friends(id: $id) {
            user {
                name
                image
                status
                isOnline
                isOnlineMobile
                dateLastOnline
            }
            friends {
                user {
                    name
                    image
                    status
                    isOnline
                    isOnlineMobile
                    dateLastOnline
                }
            }
        }
    }
`

const FriendsList = (): ReactElement => {
    const { friends, friend_block } = style
    const { friend_block_login, friend_block_online, friend_block_status } = style
    const { loading, error, data } = useQuery(GetFriendsExploler, { variables: { id: 5 } })

    if (loading) return <p style={{ color: 'white' }}>Loading...</p>
    if (error) return <p style={{ color: 'red' }}>Error {error.message}</p>

    const { EMPTY_AVATAR_USER } = process.env
    const FriendBlock = (friend: Friend, key): ReactElement => {
        const { user } = friend as any
        const { image, name, status, isOnline, isOnlineMobile, dateLastOnline } = user
        return <div key={key} className={friend_block}>
            <img src={image ?? EMPTY_AVATAR_USER} />
            <p className={friend_block_login}>{name}</p>
            <p className={friend_block_online}>
                {isOnline ? <FontAwesomeIcon icon={isOnlineMobile ? faMobileAlt : faPlug} /> :
                    <span>
                        {dateLastOnline ?
                            <>last seen {WhatDateToday(new Date(dateLastOnline))}</> :
                            'never'}
                    </span>}
            </p>
            <p className={friend_block_status}>{status}</p>
        </div>
    }

    const dataFriends: Friend[] = data?.Friends
    return <div className={friends}>
        <div className={'user'}></div>
        {dataFriends?.map((el, key) => FriendBlock(el, key))}
    </div>
}

export default FriendsList
