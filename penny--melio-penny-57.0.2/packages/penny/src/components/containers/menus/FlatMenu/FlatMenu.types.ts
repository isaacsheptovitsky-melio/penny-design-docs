import { type MenuContextProps } from '../Context';

export type FlatMenuProps = Pick<
  MenuContextProps,
  | 'trigger'
  | 'content'
  | 'isOpen'
  | 'onOpenChange'
  | 'header'
  | 'footer'
  | 'disableTypeahead'
  | 'disableOpenByTriggerClick'
  | 'shouldTrapFocus'
  | 'triggerDropdownGap'
  | 'isVirtualList'
  | 'initialFocus'
  | 'getInsideElements'
  | 'role'
  | 'isDisabled'
  | 'isReadOnly'
  | 'data-component'
  | 'hasItems'
>;
