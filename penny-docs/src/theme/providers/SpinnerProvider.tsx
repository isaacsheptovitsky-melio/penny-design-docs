import { createContext, type FC, type ReactNode } from 'react';

import { type ThemeSpinner } from '../foundations/spinner';
import { type ThemeOptions } from '../types';

export type SpinnerProviderProps = {
  spinner: ThemeOptions['spinner'];
  children: ReactNode;
};

export const SpinnerContext = createContext<ThemeSpinner>({} as ThemeSpinner);

export const SpinnerProvider: FC<SpinnerProviderProps> = ({ children, spinner }) => (
  <SpinnerContext.Provider value={spinner as ThemeSpinner}>{children}</SpinnerContext.Provider>
);
