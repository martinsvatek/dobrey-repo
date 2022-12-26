import { Context, createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IsLoadingProviderProps } from './IsLoadingStore.types';

const IsLoadingContext: Context<boolean> = createContext<boolean>(false);
const SetIsLoadingContext: Context<Dispatch<SetStateAction<boolean>>> = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

export const IsLoadingProvider = ({ children }: IsLoadingProviderProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <IsLoadingContext.Provider value={isLoading}>
      <SetIsLoadingContext.Provider value={setIsLoading}>{children}</SetIsLoadingContext.Provider>
    </IsLoadingContext.Provider>
  );
};

export const useIsLoadingContext = (): boolean => useContext<boolean>(IsLoadingContext);
export const useSetIsLoadingContext = (): Dispatch<SetStateAction<boolean>> =>
  useContext<Dispatch<SetStateAction<boolean>>>(SetIsLoadingContext);
