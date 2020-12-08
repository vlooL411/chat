import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Provider, TokenType, useLoginLazyQuery } from '@frontend/types';

import Password from './Password';
import style from './sign.module.sass';
import FormGenerate, { FormGenerateProps } from './FormGenerate';

const { ICON_GOOGLE } = process.env;

const Signin = (): ReactElement => {
	const { sign, sign_title, signin, sign_notife, signin_forms } = style;
	const [loginQuery, { data }] = useLoginLazyQuery();

	const [isAuth, setIsAuth] = useState<boolean>();
	const [notifeText] = useState<string>(null!);
	const loginRef = useRef<HTMLInputElement>(null!);
	const passwordRef = useRef<HTMLInputElement>(null!);

	useEffect(() => {
		const isAuth = localStorage.getItem(TokenType.Authentication);
		setIsAuth(isAuth != null && isAuth != '');
	});

	useEffect(() => {
		if (!data?.Login) return;
		console.log(data);
		localStorage.setItem(
			TokenType.Authentication,
			JSON.stringify(data?.Login),
		);

		setIsAuth(true);
	}, [data?.Login]);

	const onLogin = (): void => {
		const { value: login } = loginRef.current;
		const { value: password } = passwordRef.current;

		if (login && password)
			loginQuery({ variables: { name: login, password } });
	};

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
					<button onClick={onLogin}>Sign in</button>
					<div className={signin_forms}>{forms}</div>
				</div>
			</div>
		</div>
	);
};

export default Signin;
