import { type FloatingFocusManagerProps, type Placement } from '@floating-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type PropsWithChildren, type ReactElement } from 'react';

import type { UseFloatingElementOptions } from './hooks';

export type FloatingProps = PropsWithChildren<{
  /** The trigger that opens the floating element. */
  trigger: ReactElement<PropsWithChildren<unknown>>;
}> &
  Omit<UseFloatingElementOptions, 'placement' | 'triggerDropdownGap'> &
  Pick<FloatingFocusManagerProps, 'returnFocus' | 'initialFocus' | 'closeOnFocusOut'> & {
    /** The vertical and horizontal offsets of the mark from the edge of the children. @default 'bottom-start' */
    placement?: Placement;
    /** Determines the gap between the trigger element to the floating element (in pixels). @default 8 */
    triggerDropdownGap?: number;
  } & AriaAttributes &
  TestIdProp;
