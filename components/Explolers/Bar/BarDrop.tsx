import { GQLT } from "@GQLT"
import { User } from "@types"
import { ReactElement, useMemo } from "react"
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

    const { data } = GQLT.Query.useUserCurrent({ fetchPolicy: 'cache-only' })
    const user = data?.UserCurrent as User

    const list = useMemo<DropElem[]>(() => dropList(user), [user, visible])

    return <div className={`${bardrop} ${visible ? bardrop_hidden : ''}`}>
        {list?.map(({ text, onClick }, key) =>
            <span className={block} onClick={onClick} key={key}>{text}</span>)}
    </div>
}

export default BarDrop
