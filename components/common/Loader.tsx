import { ReactElement, CSSProperties } from "react"
import styleLoader from './loader.module.sass'

enum LoaderT {
    default = 'default'
}

type Props = {
    loading: boolean
    className?: string
    style?: CSSProperties
    type?: LoaderT
}

const Loader = ({ loading, style = null, className = '', type = LoaderT.default }: Props): ReactElement => {
    const { circle } = styleLoader
    return loading ?
        <div className={`${circle} ${className}`} style={style}>

        </div > : null
}

export default Loader
