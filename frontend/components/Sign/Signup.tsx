import { ReactElement, useState, useRef } from 'react';
import style from './sign.module.sass';
import { trustPass } from './common';
import Password from './Password';

type Props = {
	onSignUp: (name: string, email: string, password: string) => void;
	onSignIn: () => void;
};

const Signup = ({ onSignUp, onSignIn }: Props): ReactElement => {
	const { sign, sign_title, sign_switch, signin, sign_notife } = style;

	const [notifeText, setNotifeText] = useState(null!);
	const refLogin = useRef<HTMLInputElement>(null!);
	const refEmail = useRef<HTMLInputElement>(null!);
	const refPassword = useRef<HTMLInputElement>(null!);

	const signUp = () => {
		const { value: name } = refLogin.current;
		const { value: email } = refEmail.current;
		const { value: pass } = refPassword.current;

		if (name && email && pass && trustPass(pass)) {
			onSignUp(name, email, pass);
			setNotifeText('');
		} else {
			setNotifeText(
				name
					? email
						? !pass
							? 'Enter your login, password and email'
							: 'Enter a password from 8 characters, only with numbers, Latin and Cyrillic'
						: 'Enter a email'
					: 'Enter a login',
			);
		}
	};

	return (
		<div className={sign}>
			<p className={sign_title}>Sign up</p>
			<div className={signin}>
				<input
					ref={refLogin}
					type='text'
					maxLength={20}
					placeholder='Login'
				/>
				<br />
				<input ref={refEmail} type='email' placeholder='Email' />
				<br />
				<Password ref={refPassword} />
				<br />
				<p className={sign_notife}>{notifeText}</p>
				<br />
				<button onClick={signUp}>Sign up</button>
			</div>
			<div className={sign_switch}>
				or <a onClick={onSignIn}>Sign in</a>
			</div>
		</div>
	);
};

export default Signup;
