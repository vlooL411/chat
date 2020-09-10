import { ReactElement, useRef, useState, useMemo } from "react"
import { useSession, getCsrfToken } from 'next-auth/client'
import style from "./sign.module.sass";
import Password from "./Password";

const Signin = (): ReactElement => {
    const { sign, sign_title, signin, sign_notife, signin_forms } = style

    const [session, loading] = useSession()
    const [csrfToken, setCsrfToken] = useState<string>(null!)
    const [notifeText, setNotifeText] = useState(null!)
    const refLogin = useRef<HTMLInputElement>(null!)
    const refPassword = useRef<HTMLInputElement>(null!)


    useMemo(async () => {
        const token = await getCsrfToken({})
        setCsrfToken(token)
    }, [])


    const FormGenerate = (provider: string, imgSrc: string): ReactElement => {
        return <form method='POST' action={`/api/auth/signin/${provider}`}>
            <input type='hidden' name='csrfToken' value={csrfToken ?? ' '} />
            <input type='hidden' name='callbackUrl' value='#' />
            <button type='submit' style={{ backgroundImage: `url(${imgSrc})` }}>
            </button>
        </form >
    }

    const forms =
        useMemo(() => FormGenerate('google', `iconGoogle.png`),
            [csrfToken])

    return !session && !loading ?
        <div className='total_area'>
            <div className={sign}>
                <p className={sign_title}>Sign in</p>
                <div className={signin}>
                    <input ref={refLogin} type="text" maxLength={20} placeholder='Login' /><br />
                    <Password ref={refPassword} /><br />
                    <p className={sign_notife}>{notifeText}</p><br />
                    <button>Sign in</button>
                    <div className={signin_forms}>
                        {forms}
                    </div>
                </div>
            </div>
        </div> : null
}

export default Signin