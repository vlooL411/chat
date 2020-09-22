import { forwardRef, MutableRefObject, ReactElement, UIEvent } from 'react'

type Props = {
    className?: string
    children: ReactElement[]
    scrollUp?: number
    scrollDown?: number
    onScrollUp?: (e: EventTarget & HTMLDivElement) => void
    onScrollDown?: (e: EventTarget & HTMLDivElement) => void
}

const Scroll = forwardRef(({ className, children,
    scrollUp = 100, scrollDown = 100,
    onScrollUp = () => { }, onScrollDown = () => { } }: Props,
    ref: MutableRefObject<HTMLDivElement>): ReactElement => {

    const OnScroll = (e: UIEvent<HTMLDivElement>) => {
        const { scrollTop, offsetHeight, scrollHeight } = e?.currentTarget

        if (scrollTop < scrollUp)
            onScrollUp(e?.currentTarget)
        if (scrollTop + offsetHeight > scrollHeight - scrollDown)
            onScrollDown(e?.currentTarget)
    }

    return <div className={className} ref={ref} onScroll={OnScroll}>
        {children}
    </div>
})

export default Scroll
