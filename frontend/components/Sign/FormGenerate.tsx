import { getCsrfToken } from 'next-auth/client'
import { ReactElement, useRef } from 'react'

export type FormGenerateProps = {
    provider: string
    src: string
}

const { NEXTAUTH_URL } = process.env

const FormGenerate = ({ provider, src }: FormGenerateProps): ReactElement => {
    const csrfRef = useRef<HTMLInputElement>(null!)
    const formRef = useRef<HTMLFormElement>(null!)

    const GetCsrfToken = async () => {
        const token: string = await getCsrfToken({})
        csrfRef.current.value = token
        formRef.current.submit()
    }

    return <form ref={formRef} method='POST' action={`${NEXTAUTH_URL}/api/auth/signin/${provider}`}>
        <input ref={csrfRef} type='hidden' name='csrfToken' />
        <input type='hidden' name='callbackUrl' value='#' />
        <button onClick={GetCsrfToken} style={{ backgroundImage: `url(${src})` }}></button>
    </form >
}

export default FormGenerate