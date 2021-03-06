import { ReactElement, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faPalette } from '@fortawesome/free-solid-svg-icons'
import { User } from '@frontend'

import BarBlock from './BarBlock'
import style from './styles/bar.module.sass'
import BarDrop, { DropElem } from './BarDrop'

export type BarProps = {
    title: string
    image: string
    children?: ReactElement
    dropList: (user: User) => DropElem[]
}

const BarExploler = ({ title, image, children, dropList }: BarProps): ReactElement => {
    const { bar, bar_tools } = style

    const [isBarDrop, setIsBarDrop] = useState<boolean>(false)

    const onBarDrop = () => setIsBarDrop(true)
    const onBarUnDrop = () => setIsBarDrop(false)

    const barDrop = useMemo(() =>
        <BarDrop visible={isBarDrop} dropList={dropList} />,
        [isBarDrop])

    return <div className={bar} style={{ position: 'relative' }} onMouseLeave={onBarUnDrop}>
        <BarBlock title={title} image={image} children={children} />
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

export default BarExploler
