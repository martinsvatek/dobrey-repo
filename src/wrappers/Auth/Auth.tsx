'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'global/config';
import { ADMINS_LIST, ALERT } from 'global/consts';
import { useEffect } from 'react';
import { useAuthUser, useIsLoading, useSetAuthUser, useSetIsLoading } from 'store';
import { AuthProps } from './Auth.types';

const { NO_ACCESS } = ALERT;

export const Auth = ({ children, role = 'user' }: AuthProps): JSX.Element => {
	const authUser = useAuthUser();
	const isLoading = useIsLoading();
	const setAuthUser = useSetAuthUser();
	const setIsLoading = useSetIsLoading();

	useEffect(() => {
		setIsLoading(true);

		onAuthStateChanged(auth, user => {
			if (user?.email) {
				setAuthUser(user.email);
			} else {
				setAuthUser(null);
			}
		});

		setIsLoading(false);
	}, [setAuthUser, setIsLoading]);

	if (!isLoading && role === 'admin' && ADMINS_LIST.includes(authUser || '')) {
		return <p>{NO_ACCESS}</p>;
	}

	return !authUser && !isLoading ? <p>{NO_ACCESS}</p> : <>{children}</>;
};
