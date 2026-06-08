import { type BaseSheetProps } from '@/components/containers/BaseSheet';

import type { MenuContextProps } from '../Context';

export type BottomSheetMenuProps = Pick<
  MenuContextProps,
  | 'isOpen'
  | 'onOpenChange'
  | 'trigger'
  | 'isDisabled'
  | 'isReadOnly'
  | 'data-component'
  | 'focusItemOnOpen'
  | 'shouldFitAvailableHeight'
  | 'data-testid'
  | 'content'
  | 'footer'
  | 'title'
  | 'size'
  | 'hasItems'
  | 'header'
> &
  Pick<BaseSheetProps, 'closeButtonAriaLabel'>;
