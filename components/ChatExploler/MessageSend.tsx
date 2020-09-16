import { ID } from '@types'
import { GQLT } from '@GQLT'
import Loader from '../Loader'
import { useRef, KeyboardEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import style from './styles/messageSend.module.sass'

type Props = {
    chatid: ID
}

let amount = 1

const MessageSend = ({ chatid }: Props) => {
    const { message } = style
    const textBlockRef = useRef<HTMLTextAreaElement>(null!)
    const [sendMessageMut, { loading }] =
        GQLT.Mutation.useSendMessage()

    /* if (amount < 50 && !loading)
        sendMessageMut({
            variables: {
                chatid,
                text:
                    `${amount++} ipsum dolor sit amet consectetur adipisicing elit.`
            }
        }) */

    const sendMessage = () => {
        const { value: text } = textBlockRef?.current
        if (text && chatid) {
            sendMessageMut({ variables: { chatid, text } })
            textBlockRef.current.value = ''
        }
    }

    const sendMessageKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key == 'Enter') {
            sendMessage()
            textAreaChange()
        }
    }

    const textAreaScroll = () => {
        const { current } = textBlockRef
        current.style.height = `${current.scrollHeight}px`
    }

    const textAreaChange = () => {
        const { current } = textBlockRef
        if (current.scrollHeight <= current.clientHeight)
            current.style.height = 'auto'
        if (current?.value == '') {
            const { minHeight } = current.style
            current.style.height = minHeight
        }
    }

    return <div className={message}>
        <FontAwesomeIcon icon={faPaperclip} />
        <Loader loading={loading} />
        <textarea ref={textBlockRef}
            onChange={textAreaChange} onScroll={textAreaScroll}
            onKeyDown={e => sendMessageKey(e)}
            placeholder='Write a message...' />
        <button onClick={() => sendMessage()}>
            <FontAwesomeIcon icon={faArrowRight} />
        </button>
    </div >
}

export default MessageSend