import { forwardRef, KeyboardEvent, MutableRefObject } from 'react'

type Props = {
    onKeyDownToAreaChange?: (e: KeyboardEvent<HTMLTextAreaElement>) => boolean
    placeholder?: string
}

const TextAreaMessage = ({ onKeyDownToAreaChange = () => false, placeholder }: Props,
    ref: MutableRefObject<HTMLTextAreaElement>) => {
    const textAreaScroll = () => {
        const { style, scrollHeight } = ref?.current
        style.height = `${scrollHeight}px`
    }

    const textAreaChange = () => {
        const { scrollHeight, clientHeight, style, value } = ref?.current
        if (scrollHeight <= clientHeight)
            style.height = 'auto'
        if (value == '')
            style.height = style?.minHeight
    }

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (onKeyDownToAreaChange(e))
            textAreaChange()
    }

    return <textarea ref={ref}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={textAreaChange}
        onScroll={textAreaScroll} />
}

export default forwardRef(TextAreaMessage)