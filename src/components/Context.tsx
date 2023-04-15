import React, { useContext } from 'react';
import { AppState } from './Container';


// @ts-ignore
const AppContext = React.createContext<AppState>({});

type Props = {
  value: AppState;
  children: React.ReactNode;
};

export const Provider = ({ value, children }: Props) => (
  <AppContext.Provider value={value}>{children}</AppContext.Provider>
);

export const useAppContainer = () => {
  return useContext(AppContext);
};
