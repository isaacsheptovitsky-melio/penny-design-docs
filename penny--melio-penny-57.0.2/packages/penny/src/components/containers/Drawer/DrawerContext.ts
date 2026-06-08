import { createContext, useContext } from 'react';

import { type UseDrawerResult } from './hooks';

type ContextType = UseDrawerResult | null;

export const DrawerContext = createContext<ContextType>(null);

export const useDrawerContext = (): UseDrawerResult => {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error('Drawer components must be wrapped in <Drawer />');
  }

  return context;
};
