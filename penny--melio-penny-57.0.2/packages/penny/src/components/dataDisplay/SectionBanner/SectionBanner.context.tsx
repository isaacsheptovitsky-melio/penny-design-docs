import { createStylesContext } from '@chakra-ui/react';
import { createContext, useContext } from 'react';

import type { SectionBannerVariant } from './SectionBanner.types';

export type SectionBannerContextValue = {
  variant: SectionBannerVariant;
  isCompact: boolean;
};

type ContextType = SectionBannerContextValue | null;

export const SectionBannerContext = createContext<ContextType>(null);

export const useSectionBannerContext = () => {
  const context = useContext(SectionBannerContext);

  if (context === null) {
    throw new Error('SectionBanner components must be wrapped in <SectionBannerRoot />');
  }

  return context;
};

export const [StylesProvider, useStyles] = createStylesContext('SectionBanner');
