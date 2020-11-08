import Loader from 'components/Loader'
import ModalWindow from 'components/ModalWindow'
import { ReactElement, useRef, useState } from 'react'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCreateChatMutation } from '@generated/frontend'

import style from './createchat.module.sass'

type Props = {
    onOpen?: () => boolean
    onClose: () => void
}

const CreateContactModal = ({ onOpen = () => true, onClose }: Props): ReactElement => {
    const { createmodalwindow, create, create_title, create_upload, label_focus } = style
    const { create_chat, loader, warning } = style

    const [getCrtChat, { loading, data }] = useCreateChatMutation()
    const titleRef = useRef<HTMLInputElement>(null!)
    const [titleFocus, setTitleFocus] = useState<boolean>(false)

    const createChat = () => {
        const { value: title } = titleRef.current

        if (!title) return
        getCrtChat({ variables: { title } })
    }

    const CreateChat = data?.CreateChat

    const onCloseModal = () => {
        if (data)
            data.CreateChat = null
        setTitleFocus(false)
        onClose()
    }

    return <ModalWindow className={createmodalwindow} onOpen={onOpen} onClose={onCloseModal} >
        <div className={create}>
            <button className={create_upload}>
                <FontAwesomeIcon icon={faCamera} />
            </button>
            <div className={create_title}>
                <input ref={titleRef} maxLength={50}
                    onFocus={() => setTitleFocus(true)}
                    onBlur={() => setTitleFocus(titleRef?.current?.value != '')} />
                <label className={titleFocus ? label_focus : null}>Who is contact</label>
            </div>
            <div>
                <p className={warning}>{CreateChat}</p>
                <Loader loading={loading} className={loader} />
            </div>
            <div className={create_chat}>
                <button onClick={onCloseModal}>Cancel</button>
                <button onClick={createChat}>
                    Add contact
                </button>
            </div>
        </div>
    </ModalWindow >
}

export default CreateContactModal