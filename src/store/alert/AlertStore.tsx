'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { AlertProviderProps } from './AlertStore.types';

const AlertContext = createContext('');
const SetAlertContext = createContext<Dispatch<SetStateAction<string>>>(() => {
	/* */
});

export const AlertProvider = ({ children }: AlertProviderProps): JSX.Element => {
	const [alert, setAlert] = useState('');

	return (
		<AlertContext.Provider value={alert}>
			<SetAlertContext.Provider value={setAlert}>{children}</SetAlertContext.Provider>
		</AlertContext.Provider>
	);
};

export const useAlert = (): string => useContext(AlertContext);
export const useSetAlert = (): Dispatch<SetStateAction<string>> => useContext(SetAlertContext);
