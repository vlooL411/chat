import { signOut } from 'next-auth/client'
import { ReactElement, useMemo, useState } from 'react'
import { faAlignJustify, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { User, useUserCurrentQuery } from '@frontend'

import ChangeThemes from '../ChangeThemes'
import style from './sidebar.module.sass'
import Block, { SidebarBlock } from './Block'

type Props = {
    faBlocks: SidebarBlock[]
    extendBlocks?: any[]
    extWidth?: string
}

const { EMPTY_AVATAR_USER } = process.env
const Sidebar = ({ faBlocks, extendBlocks }: Props): ReactElement => {
    const { sidebar, sidebar_default, sidebar_block } = style
    const { extend, extend_on, extend_off, extend_block, total } = style
    const [isExtend, setIsExtend] = useState<boolean>(false)
    const { data } = useUserCurrentQuery()

    const BlockUser = useMemo<ReactElement>(() => {
        const user = data?.UserCurrent as User
        const { blockuser, login, email } = style

        return <div className={blockuser}>
            <img src={user?.image ?? EMPTY_AVATAR_USER} />
            <p className={login}>{user?.name}</p>
            <p className={email}>{user?.email}</p>
        </div>
    }, [data])

    const blocks = useMemo<ReactElement[]>(() =>
        faBlocks?.map((sideblock, key) =>
            Block({ className: sidebar_block, sideblock }, key)),
        [faBlocks])

    const blocksExtend = useMemo<ReactElement[]>(() =>
        extendBlocks?.map((sideblock, key) =>
            Block({ className: extend_block, sideblock }, key)),
        [extendBlocks])

    return <>
        <div className={isExtend ? `total ${total}` : ''}>
            <div className={`${extend} ${isExtend ? extend_on : extend_off}`}>
                {BlockUser}
                {blocksExtend}
                <ChangeThemes className={sidebar_block} />
            </div>
            <div className={isExtend ? 'total' : ''} onMouseDown={() => setIsExtend(false)}></div>
        </div>
        <div className={sidebar}>
            <div className={sidebar_default}>
                <Block className={sidebar_block}
                    sideblock={{ fa: faAlignJustify, text: '', onClick: () => setIsExtend(true) }}
                    key={-2} />
                {blocks}
                <Block className={sidebar_block}
                    sideblock={{ fa: faDoorOpen, text: 'Exit', onClick: signOut }}
                    key={-1} />
            </div>
        </div>
    </>
}

export default Sidebar
