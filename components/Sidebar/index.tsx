import Link from 'next/link'
import { GQLT } from '@GQLT'
import { User } from '@types'
import { UrlObject } from 'url'
import ChangeThemes from '../ChangeThemes'
import { signOut } from 'next-auth/client'
import { ReactElement, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faAlignJustify, faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import style from './sidebar.module.sass'

type faText = {
    fa: IconDefinition
    text: string
    href?: UrlObject | string
    onClick?: () => void
}

type Props = {
    faBlocks: faText[]
    extendBlocks?: any[]
    extWidth?: string
}

const { EMPTY_AVATAR_USER } = process.env

const Sidebar = ({ faBlocks, extendBlocks }: Props): ReactElement => {
    const { sidebar, sidebar_default, sidebar_block } = style
    const { extend, extend_on, extend_off, extend_block, total, none } = style
    const [isExtend, setIsExtend] = useState<boolean>(false)
    const { data, loading, error } = GQLT.Query.useUserCurrent()

    const Block = ({ fa, text, href, onClick }: faText, key) =>
        <Link key={key} href={href ?? ''}>
            <a className={sidebar_block} onClick={onClick}>
                <FontAwesomeIcon icon={fa} />
                <p>{text}</p>
            </a>
        </Link>

    const BlockUser = useMemo<ReactElement>(() => {
        const user = data?.UserCurrent as User
        const { blockuser, login, email } = style

        return <div className={blockuser}>
            <img src={user?.image ?? EMPTY_AVATAR_USER} />
            <p className={login}>{user?.name}</p>
            <p className={email}>{user?.email}</p>
        </div>
    }, [data])

    const BlockExtend = ({ fa, text, href, onClick }: faText, key): ReactElement => {
        return <Link key={key} href={href ?? ''}>
            <a className={extend_block} onClick={onClick}>
                <FontAwesomeIcon icon={fa} />
                <p>{text}</p>
            </a>
        </Link>
    }

    const blocks = useMemo<ReactElement[]>(() =>
        faBlocks?.map((faTextEl, key) => Block(faTextEl, key)),
        [faBlocks])

    const blocksExtend = useMemo<ReactElement[]>(() =>
        extendBlocks?.map((faTextEl, key) => BlockExtend(faTextEl, key)),
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
                <Block fa={faAlignJustify} text='' onClick={() => setIsExtend(true)} key={-2} />
                {blocks}
                <Block fa={faDoorOpen} text='Exit' onClick={() => signOut({})} key={-1} />
            </div>
        </div>
    </>
}

export default Sidebar
