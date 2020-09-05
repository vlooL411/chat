import { useRef } from 'react'
import { ID } from '../../apolloclient/types'
import { gql, useMutation } from '@apollo/client'
import style from './styles/messageSend.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Loader from '../common/Loader'

const SendMessage = gql`
    mutation sendMessage($chatid: ID!, $text: String!) {
        SendMessage(chatid: $chatid, text: $text)
    }
`

type Props = {
    chatid: ID
}

const MessageSend = ({ chatid }: Props) => {
    const { message } = style
    const textBlockRef = useRef<HTMLTextAreaElement>(null!)
    const [sendMessageMut, { loading, error }] = useMutation(SendMessage)

    const sendMessage = () => {
        const { value: text } = textBlockRef?.current
        if (text && chatid) {
            sendMessageMut({
                variables: {
                    chatid,
                    text
                }
            })
            textBlockRef.current.value = ''
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
    }

    return <div className={message}>
        <FontAwesomeIcon icon={faPaperclip} />
        <Loader loading={loading} />
        <textarea ref={textBlockRef}
            onChange={textAreaChange} onScroll={textAreaScroll}
            placeholder='Write a message...' />
        <button onClick={() => sendMessage()}>
            <FontAwesomeIcon icon={faArrowRight} />
        </button>
    </div >
}

export default MessageSend