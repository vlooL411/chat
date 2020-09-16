import { ReactElement } from "react"
import style from './styles/searchinfo.module.sass'

type Props = {
    count: number
    what: string
}

const SearchInfo = ({ count, what }: Props): ReactElement => {
    const { info } = style

    return <p className={info}>
        Found {count} {what}
    </p>
}

export default SearchInfo
