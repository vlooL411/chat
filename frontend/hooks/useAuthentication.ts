import { Authentication, TokenType } from '@frontend/types';
import { useEffect, useState } from 'react';
import { Router } from 'next/router';

const useAuthentication = (router: Router, urlAuth: string): boolean => {
	const [auth, setAuth] = useState<Authentication>(null!);

	useEffect(() => {
		const authentication =
			localStorage.getItem(TokenType.Authentication) ?? null;

		if (authentication) {
			try {
				setAuth(JSON.parse(authentication));
			} catch (e) {
				console.error('Error parse authentication', e);
			}
			return;
		}

		const asPath = router?.asPath;
		const provider = localStorage.getItem('provider');

		if (provider && asPath)
			(async () => {
				try {
					const req = await fetch(
						`${urlAuth}/${provider}/callback${asPath}`,
					);

					if (!req.ok) return;

					const answer = await req.text();
					localStorage.setItem(TokenType.Authentication, answer);

					setAuth(JSON.parse(answer));
				} catch (e) {
					console.error('Error authentication', e);
				}
			})();
	}, []);

	return Boolean(auth);
};

export default useAuthentication;
