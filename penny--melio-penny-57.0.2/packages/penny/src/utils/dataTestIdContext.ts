import { useTestId } from '@melio/penny-utils';
import { createContext, useContext } from 'react';

export type DataTestIdContextValue = {
  rootDataTestId: string;
};

type ContextType = DataTestIdContextValue | null;

export const DataTestIdContext = createContext<ContextType>(null);

export const useDataTestIdContext = () => {
  const context = useContext(DataTestIdContext);

  if (context === null) {
    throw new Error('useDataTestIdContext must be used within a DataTestIdContext provider.');
  }

  return useTestId(context.rootDataTestId);
};
