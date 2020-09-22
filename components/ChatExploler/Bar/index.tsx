import Choice from "./Choice"
import BarDrop from "./BarDrop"
import { Chat } from "apolloclient/types"
import { ReactElement, useMemo, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faPalette } from "@fortawesome/free-solid-svg-icons"
import style from './styles/bar.module.sass'

type Props = {
    chat?: Chat
}

const Bar = ({ chat }: Props): ReactElement => {
    const { bar, bar_tools } = style

    const [isBarDrop, setIsBarDrop] = useState<boolean>(false)

    const onBarDrop = () => setIsBarDrop(true)
    const onBarUnDrop = () => setIsBarDrop(false)

    const choice = useMemo(() => <Choice chat={chat} />, [chat])
    const barDrop = useMemo(() =>
        <BarDrop chat={chat} visible={isBarDrop} />,
        [chat, isBarDrop])

    return <div className={bar} style={{ position: 'relative' }}
        onMouseLeave={onBarUnDrop}>
        {choice}
        <div className={bar_tools}>
            <button>
                <FontAwesomeIcon icon={faPalette} />
            </button>
            <button onClick={onBarDrop} >
                <FontAwesomeIcon icon={faEllipsisV} />
                {barDrop}
            </button>
        </div>
    </div>
}

export default Bar
