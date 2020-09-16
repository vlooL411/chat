import Choice from "./Choice"
import BarDrop from "./BarDrop"
import { Chat } from "apolloclient/types"
import { ReactElement, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faPalette } from "@fortawesome/free-solid-svg-icons"
import style from './styles/bar.module.sass'

type Props = {
    chat?: Chat
}

const Bar = ({ chat }: Props): ReactElement => {
    const { bar, bar_tools } = style

    const [isBarDrop, setIsBarDrop] = useState<boolean>(false)

    const barDrop = () => setIsBarDrop(true)
    const barUnDrop = () => setIsBarDrop(false)

    return <div className={bar} style={{ position: 'relative' }}
        onMouseLeave={barUnDrop}>
        <Choice chat={chat} />
        <div className={bar_tools}>
            <button>
                <FontAwesomeIcon icon={faPalette} />
            </button>
            <button onClick={barDrop} >
                <FontAwesomeIcon icon={faEllipsisV} />
                <BarDrop chat={chat} visible={isBarDrop} />
            </button>
        </div>
    </div>
}

export default Bar
