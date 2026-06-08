import { createContext, type FC, type ReactNode } from 'react';

import { type ThemeLogos } from '../foundations/logos';
import { type ThemeOptions } from '../types';

export type LogosProviderProps = {
  logos: ThemeOptions['logos'];
  children: ReactNode;
};

export const LogosContext = createContext<ThemeLogos>({} as ThemeLogos);

export const LogosProvider: FC<LogosProviderProps> = ({ children, logos }) => (
  <LogosContext.Provider value={logos}>{children}</LogosContext.Provider>
);
