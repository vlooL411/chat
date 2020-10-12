import { User, useUserCurrentQuery } from '@frontend'
import { ReactElement, useMemo } from 'react'

import style from './styles/bardrop.module.sass'

export type DropElem = {
    text: string
    onClick?: () => void
}

type Props = {
    visible: boolean
    dropList: (user: User) => DropElem[]
}

const BarDrop = ({ visible, dropList = () => null }: Props): ReactElement => {
    const { bardrop, bardrop_hidden, block } = style

    const { data } = useUserCurrentQuery({ fetchPolicy: 'cache-only' })
    const user = data?.UserCurrent

    const list = useMemo<DropElem[]>(() => dropList(user as User), [user, visible])

    return <div className={`${bardrop} ${visible ? bardrop_hidden : ''}`}>
        {list?.map(({ text, onClick }, key) =>
            <span className={block} onClick={onClick} key={key}>{text}</span>)}
    </div>
}

export default BarDrop
