import { ReactElement } from "react";
import style from './styles/blockpanel.module.sass'

type Props = {
    title: string
    text: string
    date: string
    image: string
    onClick: () => void
}

const BlockPanel = ({ title, text, date, image, onClick = () => { } }: Props): ReactElement => {
    const { block, block_title, block_date, block_text } = style

    return <button className={block} onClick={onClick}>
        <img src={image} />
        <p className={block_title}>{title}</p>
        <p className={block_date}>{date}</p>
        <p className={block_text}>{text}</p>
    </button>
}

export default BlockPanel