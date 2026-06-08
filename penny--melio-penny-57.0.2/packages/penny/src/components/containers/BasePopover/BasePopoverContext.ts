import { createContext, useContext } from 'react';

import { type UsePopoverReturn } from './useBasePopover';

type ContextType = UsePopoverReturn | null;
export const BasePopoverContext = createContext<ContextType>(null);

export const useBasePopoverContext = () => {
  const context = useContext(BasePopoverContext);

  if (context === null) {
    throw new Error('BasePopover components must be wrapped in <BasePopover />');
  }

  return context;
};
