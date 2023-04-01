'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IsLoadingProviderProps } from './IsLoadingStore.types';

const IsLoadingContext = createContext(false);
const SetIsLoadingContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {
	/* */
});

export const IsLoadingProvider = ({ children }: IsLoadingProviderProps): JSX.Element => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<IsLoadingContext.Provider value={isLoading}>
			<SetIsLoadingContext.Provider value={setIsLoading}>{children}</SetIsLoadingContext.Provider>
		</IsLoadingContext.Provider>
	);
};

export const useIsLoading = (): boolean => useContext(IsLoadingContext);
export const useSetIsLoading = (): Dispatch<SetStateAction<boolean>> => useContext(SetIsLoadingContext);
