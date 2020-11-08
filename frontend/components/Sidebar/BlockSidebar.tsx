import Link from 'next/link'
import { faThermometerEmpty, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactElement } from 'react'

export type SidebarBlock = {
    fa: IconDefinition
    text: string
    href?: string
    onClick?: () => void
}

type Props = {
    className: string
    sideblock: SidebarBlock
}

const BlockSidebar = ({ className, sideblock, }: Props, key): ReactElement => {
    const { fa, text, href, onClick } = sideblock

    return <Link key={key} href={href ?? ''} prefetch={false}>
        <a className={className} onClick={onClick}>
            <FontAwesomeIcon icon={fa ?? faThermometerEmpty} />
            <p>{text}</p>
        </a>
    </Link>
}

export default BlockSidebar