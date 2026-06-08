import { createStylesContext } from '@chakra-ui/react';
import { createContext, useContext } from 'react';

export type LinearProgressContextValue = {
  value: number;
  max: number;
  percentage: number;
};

type ContextType = LinearProgressContextValue | null;

export const LinearProgressContext = createContext<ContextType>(null);

export const useLinearProgressContext = () => {
  const context = useContext(LinearProgressContext);

  if (context === null) {
    throw new Error('LinearProgress components must be wrapped in <LinearProgressRoot />');
  }

  return context;
};

export const [StylesProvider, useStyles] = createStylesContext('LinearProgress');
