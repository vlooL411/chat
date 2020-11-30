import { TokenType } from '@frontend/types';
import { useEffect, useState } from 'react';

const useSignOut = (): (() => void) => {
	const [signOut, setSignOut] = useState<boolean>(false);

	useEffect(() => {
		if (signOut) localStorage.removeItem(TokenType.Authentication);
		setSignOut(false);
	}, [signOut]);

	return () => setSignOut(true);
};

export default useSignOut;
