'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'global/config';
import { isAdmin, isAuth } from 'global/utils';
import { useEffect } from 'react';
import { useAuthUser, useSetAuthUser } from 'store';
import { Role } from './Auth.types';

export const useAuth = (role: Role): boolean => {
	const authUser = useAuthUser();
	const setAuthUser = useSetAuthUser();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user?.email) {
				setAuthUser(user.email);
			} else {
				setAuthUser('');
			}
		});
	}, [setAuthUser]);

	if (role === 'admin') {
		return isAdmin(authUser);
	}

	return isAuth(authUser);
};
