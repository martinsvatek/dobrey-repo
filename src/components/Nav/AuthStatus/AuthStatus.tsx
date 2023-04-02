'use client';

import { isAuth } from 'global/utils';
import { useAuthUser } from 'store';

export const AuthStatus = (): JSX.Element => {
	const authUser = useAuthUser();

	return <p>{isAuth(authUser) ? `Authenticated: ${authUser}` : 'Unauthenticated'}</p>;
};
