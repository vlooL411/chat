import { ReactElement, MutableRefObject, forwardRef, CSSProperties } from 'react'

type Props = {
    className?: string
    style?: CSSProperties
    defaultValue?: string
}

const TextAreaMessage = forwardRef(({ className, style, defaultValue }: Props,
    ref: MutableRefObject<HTMLTextAreaElement>): ReactElement => {

    const textAreaScroll = () => {
        const { current } = ref
        current.style.height = `${current.scrollHeight}px`
    }

    const textAreaChange = () => {
        const { current } = ref
        const { scrollHeight, clientHeight, scrollWidth, clientWidth } = current
        const { maxHeight, maxWidth } = current.style

        if (scrollHeight <= clientHeight)
            current.style.height = 'auto'
        if (scrollWidth >= clientWidth &&
            scrollHeight < Number.parseInt(maxHeight) &&
            scrollWidth < Number.parseInt(maxWidth))
            current.style.width = `calc(${scrollWidth}px + 5ch)`
    }

    return <textarea ref={ref} defaultValue={defaultValue}
        className={className} style={style}
        onChange={textAreaChange} onScroll={textAreaScroll} />
})

export default TextAreaMessage
