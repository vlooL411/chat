import { ReactElement, useMemo, useState } from 'react'
import style from './sidebar.module.sass'
import { IconDefinition, faAlignJustify, faEject, faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UrlObject } from 'url'
import Link from 'next/link'
import ChangeThemes from '../ChangeThemes/ChangeThemes'
import { signOut } from 'next-auth/client'

type faText = {
    fa: IconDefinition
    text: string
    href?: UrlObject | string
    onClick?: () => void
}

type Props = {
    faBlocks: faText[]
    extWidth?: string
}

const Sidebar = ({ faBlocks }: Props): ReactElement => {
    const { sidebar, sidebar_default, sidebar_block, sidebar_extend, sidebar_extend_on } = style
    const [extend, setExtend] = useState<boolean>(false)

    const Block = ({ fa, text, href, onClick }: faText, key) =>
        <Link key={key} href={href ?? ''}>
            <a className={sidebar_block} onClick={onClick}>
                <FontAwesomeIcon icon={fa} />
                <p>{text}</p>
            </a>
        </Link >

    const blocks = useMemo<ReactElement[]>(() =>
        faBlocks?.map((faTextEl, key) => Block(faTextEl, key)),
        [])

    return <div className={sidebar}>
        <div className={sidebar_default}>
            <ChangeThemes className={sidebar_block} />
            <Block fa={faAlignJustify} text='' onClick={() => setExtend(!extend)} key={-2} />
            {blocks}
            <Block fa={faDoorOpen} text='Exit' onClick={() => signOut({})} key={-1} />
        </div>
        <div className={`${sidebar_extend} ${extend ? sidebar_extend_on : ''}`}>
        </div>
    </div>
}

export default Sidebar
