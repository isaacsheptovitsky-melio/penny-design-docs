import { createContext, type Dispatch, type SetStateAction, useContext } from 'react';

import { type ContainerProps } from '@/components/containers/Container';

import { type BaseSheetProps } from './BaseSheet.types';

export type BaseSheetContextData = Pick<ContainerProps, 'paddingX' | 'paddingY'> &
  Pick<BaseSheetProps, 'onClose' | 'closeButtonAriaLabel'> & {
    showFooterBorder?: boolean;
    isOverflow?: boolean;
    headerId?: string;
    setHeaderId: Dispatch<SetStateAction<string | undefined>>;
  };

export const BaseSheetContext = createContext<BaseSheetContextData>({
  paddingX: 's',
  paddingY: 's',
  onClose: () => {},
  isOverflow: undefined,
  showFooterBorder: undefined,
  closeButtonAriaLabel: undefined,
  setHeaderId: () => {},
});
export const useBaseSheetContext = () => useContext(BaseSheetContext);
