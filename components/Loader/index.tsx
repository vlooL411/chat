import { CSSProperties, ReactElement } from 'react'

import styleLoader from './loader.module.sass'

type Props = {
    loading: boolean
    className?: string
    style?: CSSProperties
}

const Loader = ({ loading, style = null, className = '' }: Props): ReactElement => {
    const { circle } = styleLoader
    return loading ?
        <div className={`${circle} ${className}`} style={style}>

        </div > : null
}

export default Loader
