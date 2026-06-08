import { createContext, type FC, type ReactNode, useContext } from 'react';

import { type ThemeBlanket } from '../foundations/blanket';
import { type ThemeOptions } from '../types';

export type BlanketProviderProps = {
  blanket: ThemeOptions['blanket'];
  children: ReactNode;
};

export const BlanketContext = createContext<ThemeBlanket | undefined>(undefined);

export const BlanketProvider: FC<BlanketProviderProps> = ({ children, blanket }) => (
  <BlanketContext.Provider value={blanket as ThemeBlanket}>{children}</BlanketContext.Provider>
);

export const useBlanket = () => useContext<ThemeBlanket | undefined>(BlanketContext);
