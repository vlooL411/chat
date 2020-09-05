import React, { MutableRefObject, useState, forwardRef } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./sign.module.sass";

type Props = {
    ref: MutableRefObject<HTMLInputElement>
}

const Password = forwardRef((_, ref: MutableRefObject<HTMLInputElement>) => {
    const { sign_password } = style
    const [visPass, setVisPass] = useState<boolean>(false)

    return <div className={sign_password}>
        <input ref={ref} type="password" pattern='[\wа-яА-Я]{8,32}'
            maxLength={32} placeholder='Password' />
        <FontAwesomeIcon icon={visPass ? faEye : faEyeSlash} onClick={() => {
            ref.current.type = !visPass ? 'text' : 'password'
            setVisPass(!visPass)
        }} />
    </div>
})

export default Password
