import { createContext, useContext } from 'react';

import { type SegmentedControlItemProps } from './components/SegmentedControlItem.types';

export type ContextState = Pick<
  SegmentedControlItemProps,
  'size' | 'disabled' | 'readOnly' | 'name' | 'type' | 'onChange'
>;

export const SegmentedControlContext = createContext<ContextState>({});

export const useSegmentedControlContext = () => useContext(SegmentedControlContext);
