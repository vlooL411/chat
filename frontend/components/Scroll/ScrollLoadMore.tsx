import Scroll from '.'
import { first, last } from '@common/utils'
import { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'

type Props<T, C> = {
    className?: string
    array: T[]
    isEnd: { up: C, down: C }
    scrollUp?: number
    scrollDown?: number
    elemInit: (el: T, key) => ReactElement
    cmpEnd: (end: C, elem: T) => boolean
    onScrollZero: (ref: MutableRefObject<HTMLDivElement>) => void
    onScrollUp: (elem: T, e: EventTarget & HTMLDivElement) => void
    onScrollDown: (elem: T, e: EventTarget & HTMLDivElement) => void
}

//TODO slow scrolling (worth rewriting to slice scroll)
const ScrollLoadMore = function <T, C>({
    className, array,
    elemInit = () => <></>,
    isEnd = null,
    scrollUp = 100, scrollDown = 100,
    cmpEnd = () => true,
    onScrollUp = () => null, onScrollDown = () => null,
    onScrollZero = () => { } }: Props<T, C>): ReactElement {

    const scrollRef = useRef<HTMLDivElement>(null!)
    const [isEndUp, setIsEndUp] = useState<C>(null!)
    const [isEndDown, setIsEndDown] = useState<C>(null!)
    const [scrollTo, setScrollTo] = useState<number>(0)
    const [isLoadScroll, setIsLoadScroll] = useState<false | -1 | true>(true)

    useEffect(() => {
        if (array)
            setIsLoadScroll(true)
    }, [array])

    useEffect(() => {
        if (!isLoadScroll || !array) return
        const { scrollHeight, clientHeight } = scrollRef?.current
        if (scrollHeight == clientHeight) {
            onScrollZero(scrollRef)
            setIsLoadScroll(isLoadScroll ? -1 : false)
            return
        }
        scrollRef?.current?.scrollTo({ top: scrollUp + 1 })
        setIsLoadScroll(false)
    }, [isLoadScroll, array])

    useEffect(() => {
        if (isEnd?.up) {
            if (scrollTo && scrollTo > 0) {
                const { scrollHeight, scrollTop } = scrollRef?.current
                //TODO wrong scrollTo({ top })??? possible Loader extend scrollHeight, after unextend, changing height
                let top = (scrollHeight + scrollTop - scrollTo) * 1 / 3
                top = top < scrollUp ? scrollDown + 1 : top
                scrollRef?.current?.scrollTo({ top })
                setScrollTo(0)
            }
            setIsEndUp(isEnd?.up)
        }
        if (isEnd?.down)
            setIsEndDown(isEnd?.down)
    }, [isEnd])

    const lodeUp = (e: EventTarget & HTMLDivElement) => {
        if (!array) return
        const firstMessageID = first(array)
        if (cmpEnd(isEndUp, firstMessageID)) return

        const { scrollHeight, scrollTop } = e
        setScrollTo(scrollHeight + scrollTop)
        onScrollUp(firstMessageID, e)
    }

    const lodeDown = (e: EventTarget & HTMLDivElement) => {
        if (!array) return
        const lastMessageID = last(array)
        if (cmpEnd(isEndDown, lastMessageID)) return
        onScrollDown(lastMessageID, e)
    }

    return <Scroll className={className} ref={scrollRef}
        scrollUp={scrollUp} scrollDown={scrollDown}
        onScrollUp={lodeUp}
        onScrollDown={lodeDown}>
        {array?.map(elemInit)}
    </Scroll>
}

export default ScrollLoadMore
