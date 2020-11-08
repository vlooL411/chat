import { ReactElement, useMemo, useRef, useState } from 'react'
import { useSession } from 'next-auth/client'

import Password from './Password'
import style from './sign.module.sass'
import FormGenerate, { FormGenerateProps } from './FormGenerate'

const { ICON_GOOGLE } = process.env

const Signin = (): ReactElement => {
    const { sign, sign_title, signin, sign_notife, signin_forms } = style

    const [session, loading] = useSession()
    const [notifeText, setNotifeText] = useState<string>(null!)
    const refLogin = useRef<HTMLInputElement>(null!)
    const refPassword = useRef<HTMLInputElement>(null!)

    const forms = useMemo<ReactElement[]>(() => {
        const formsGenerate: FormGenerateProps[] =
            [{ provider: 'google', src: ICON_GOOGLE }]
        return formsGenerate.map((form, key) => <FormGenerate {...form} key={key} />)
    }, [])

    return session ? null :
        <div className='total total_area' >
            <div className={sign}>
                <p className={sign_title}>Sign in</p>
                <div className={signin}>
                    <input ref={refLogin} maxLength={20} placeholder='Login' /><br />
                    <Password ref={refPassword} /><br />
                    <p className={sign_notife}>{notifeText}</p><br />
                    <button>Sign in</button>
                    <div className={signin_forms}>
                        {forms}
                    </div>
                </div>
            </div>
        </div >
}

export default Signin