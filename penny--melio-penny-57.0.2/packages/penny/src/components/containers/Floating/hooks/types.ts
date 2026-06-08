import {
  type FloatingFocusManagerProps,
  type Placement,
  type UseFloatingOptions,
  type UseFloatingReturn,
  type UseInteractionsReturn,
  type UseRoleProps,
} from '@floating-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type RefCallback } from 'react';

type OpenChangeTriggerEvent = 'outside' | 'trigger' | 'content';

export type UseFloatingElementOptions = {
  /** The id of the floating element. */
  id?: string;
  /** Determines if the floating element is open. */
  isOpen: boolean;
  /** The callback event is invoked when the floating element is opened or closed */
  onOpenChange: (isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => void;
  /** The vertical and horizontal offsets of the mark from the edge of the children. @default 'bottom-start' */
  placement: Placement;
  /** Determines the gap between the trigger element to the floating element (in pixels). @default 8 */
  triggerDropdownGap: number;
  /** If set, the floating element will get the maximum available height. @default true */
  shouldFitAvailableHeight?: boolean;
  /** If set, the focus will be trapped within the floating element. @default true */
  shouldTrapFocus?: boolean;
  /** Determines if the floating element is disabled. */
  isDisabled?: boolean;
} & Pick<FloatingFocusManagerProps, 'returnFocus' | 'initialFocus' | 'closeOnFocusOut'> &
  Pick<UseRoleProps, 'role'> &
  AriaAttributes &
  Omit<UseFloatingOptions, 'onOpenChange'> &
  TestIdProp;

export type UseFloatingElementReturn = {
  triggerProps: Pick<UseInteractionsReturn, 'getReferenceProps'> & {
    setTriggerRef: RefCallback<HTMLDivElement>;
    isDisabled?: boolean;
  };
  floatingProps: {
    isOpen: boolean;
    setFloatingRef: RefCallback<HTMLDivElement>;
    styles: UseFloatingReturn['floatingStyles'];
    shouldTrapFocus?: boolean;
  } & Pick<FloatingFocusManagerProps, 'returnFocus' | 'initialFocus' | 'closeOnFocusOut' | 'context'> &
    Pick<UseRoleProps, 'role'> &
    AriaAttributes &
    TestIdProp;
};
