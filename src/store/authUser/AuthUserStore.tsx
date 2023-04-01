'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { DEFAULT_STATE } from './AuthUserStore.consts';
import { AuthUserProviderProps } from './AuthUserStore.types';

const AuthUserContext = createContext(DEFAULT_STATE);
const SetAuthUserContext = createContext<Dispatch<SetStateAction<string | null>>>(() => {
	/* */
});

export const AuthUserProvider = ({ children }: AuthUserProviderProps): JSX.Element => {
	const [authUser, setAuthUser] = useState(DEFAULT_STATE);

	return (
		<AuthUserContext.Provider value={authUser}>
			<SetAuthUserContext.Provider value={setAuthUser}>{children}</SetAuthUserContext.Provider>
		</AuthUserContext.Provider>
	);
};

export const useAuthUser = (): string | null => useContext(AuthUserContext);
export const useSetAuthUser = (): Dispatch<SetStateAction<string | null>> => useContext(SetAuthUserContext);
