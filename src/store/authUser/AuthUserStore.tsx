'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { AuthUserProviderProps } from './AuthUserStore.types';

const AuthUserContext = createContext('');
const SetAuthUserContext = createContext<Dispatch<SetStateAction<string>>>(() => {
	/* */
});

export const AuthUserProvider = ({ children }: AuthUserProviderProps): JSX.Element => {
	const [authUser, setAuthUser] = useState('');

	return (
		<AuthUserContext.Provider value={authUser}>
			<SetAuthUserContext.Provider value={setAuthUser}>{children}</SetAuthUserContext.Provider>
		</AuthUserContext.Provider>
	);
};

export const useAuthUser = (): string => useContext(AuthUserContext);
export const useSetAuthUser = (): Dispatch<SetStateAction<string>> => useContext(SetAuthUserContext);
