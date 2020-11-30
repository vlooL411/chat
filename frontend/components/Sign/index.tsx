import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Provider, TokenType } from '@frontend/types';

import Password from './Password';
import style from './sign.module.sass';
import FormGenerate, { FormGenerateProps } from './FormGenerate';

const { ICON_GOOGLE } = process.env;

const Signin = (): ReactElement => {
	const { sign, sign_title, signin, sign_notife, signin_forms } = style;

	const [isAuth, setIsAuth] = useState<boolean>();
	const [notifeText] = useState<string>(null!);
	const loginRef = useRef<HTMLInputElement>(null!);
	const passwordRef = useRef<HTMLInputElement>(null!);

	useEffect(() => {
		const isAuth = localStorage.getItem(TokenType.Authentication);
		setIsAuth(isAuth != null && isAuth != '');
	});

	const forms = useMemo<ReactElement[]>(() => {
		const formsGenerate: FormGenerateProps[] = [
			{ provider: Provider.Google, src: ICON_GOOGLE },
		];
		return formsGenerate.map((form, key) => (
			<FormGenerate {...form} key={key} />
		));
	}, []);

	return isAuth ? null : (
		<div className='total total_area'>
			<div className={sign}>
				<p className={sign_title}>Sign in</p>
				<div className={signin}>
					<input ref={loginRef} maxLength={20} placeholder='Login' />
					<br />
					<Password ref={passwordRef} />
					<br />
					<p className={sign_notife}>{notifeText}</p>
					<br />
					<button>Sign in</button>
					<div className={signin_forms}>{forms}</div>
				</div>
			</div>
		</div>
	);
};

export default Signin;
