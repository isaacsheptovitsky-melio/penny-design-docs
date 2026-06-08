import { createContext, type FC, type ReactNode } from 'react';

import { type ThemeLoader } from '../foundations/loader';
import { type ThemeOptions } from '../types';

export type LoaderProviderProps = {
  loader: ThemeOptions['loader'];
  children: ReactNode;
};

export const LoaderContext = createContext<ThemeLoader>({} as ThemeLoader);

export const LoaderProvider: FC<LoaderProviderProps> = ({ children, loader }) => (
  <LoaderContext.Provider value={loader as ThemeLoader}>{children}</LoaderContext.Provider>
);
