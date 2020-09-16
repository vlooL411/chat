import { ReactElement, MutableRefObject, forwardRef, CSSProperties, KeyboardEvent, useEffect } from 'react'

type Props = {
    className?: string
    style?: CSSProperties
    defaultValue?: string
    onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void
}

const TextAreaMessage = forwardRef((
    { className, style, defaultValue, onKeyDown = () => { } }: Props,
    ref: MutableRefObject<HTMLTextAreaElement>): ReactElement => {

    useEffect(() => textAreaChange(), [ref])

    const textAreaScroll = () => {
        const { current } = ref
        const { scrollHeight, clientHeight, clientWidth } = current
        if (scrollHeight < clientHeight)
            current.style.height = `${current.scrollHeight}px`
    }

    const textAreaChange = () => {
        const { current } = ref
        const { scrollHeight, clientHeight } = current

        if (scrollHeight > clientHeight)
            current.style.height = `${current.scrollHeight}px`
    }

    return <textarea ref={ref} defaultValue={defaultValue} wrap='hard'
        onKeyDown={(e) => onKeyDown(e)}
        className={className} style={style}
        onChange={textAreaChange} onScroll={textAreaScroll} />
})

export default TextAreaMessage
