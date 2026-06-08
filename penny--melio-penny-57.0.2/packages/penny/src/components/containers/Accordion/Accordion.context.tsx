import { createStylesContext } from '@chakra-ui/react';
import { createContext, type MutableRefObject, useContext } from 'react';

export type AccordionContextValue = {
  value: string[];
  setValue: (value: string[]) => void;
  accordionItemsRef: MutableRefObject<Record<string, HTMLButtonElement | null>>;
  isMultiple: boolean;
  keepMounted: boolean;
};

type AccordionContextType = AccordionContextValue | null;

export const AccordionContext = createContext<AccordionContextType>(null);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (context === null) {
    throw new Error('Accordion components must be wrapped in <AccordionRoot />');
  }

  return context;
};

export const [StylesProvider, useStyles] = createStylesContext('Accordion');

export type AccordionItemContextValue = {
  isExpanded: boolean;
  value: string;
  panelId: string;
  triggerId: string;
};

type AccordionItemContextType = AccordionItemContextValue | null;

export const AccordionItemContext = createContext<AccordionItemContextType>(null);

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);

  if (context === null) {
    throw new Error('Accordion components must be wrapped in <AccordionItem />');
  }

  return context;
};
