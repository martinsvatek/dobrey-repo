import { Context, createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { AlertProviderProps } from './AlertStore.types';

const AlertContext: Context<string> = createContext<string>('');
const SetAlertContext: Context<Dispatch<SetStateAction<string>>> = createContext<Dispatch<SetStateAction<string>>>(
  () => {},
);

export const AlertProvider = ({ children }: AlertProviderProps): JSX.Element => {
  const [alert, setAlert] = useState<string>('');

  return (
    <AlertContext.Provider value={alert}>
      <SetAlertContext.Provider value={setAlert}>{children}</SetAlertContext.Provider>
    </AlertContext.Provider>
  );
};

export const useAlertContext = (): string => useContext<string>(AlertContext);
export const useSetAlertContext = (): Dispatch<SetStateAction<string>> =>
  useContext<Dispatch<SetStateAction<string>>>(SetAlertContext);
