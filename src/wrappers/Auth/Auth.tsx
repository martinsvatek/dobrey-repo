'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'global/config';
import { ALERT } from 'global/consts';
import { isAdmin, isAuth, setLocalStorage } from 'global/utils';
import { useEffect } from 'react';
import { useAuthUser, useSetAuthUser } from 'store';
import { AuthProps } from './Auth.types';

const { NO_ACCESS } = ALERT;

export const Auth = ({ children, role = 'user' }: AuthProps): JSX.Element => {
	const authUser = useAuthUser();
	const setAuthUser = useSetAuthUser();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user?.email) {
				setAuthUser(user.email);
				setLocalStorage('authUser', user.email);
			} else {
				setAuthUser('');
				setLocalStorage('authUser', '');
			}
		});
	}, [setAuthUser]);

	if (role === 'admin' && !isAdmin(authUser)) {
		return <p>{NO_ACCESS}</p>;
	}

	return !isAuth(authUser) ? <p>{NO_ACCESS}</p> : <>{children}</>;
};
