import {
  type FloatingFocusManagerProps,
  type Placement,
  type UseFloatingReturn,
  type useInteractions,
} from '@floating-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import {
  type AriaAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type MutableRefObject,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';

export type OpenChangeTriggerEvent = 'outside' | 'trigger' | 'content';

export type TriggerPropsGetter = () => HTMLAttributes<HTMLElement> & { role: 'button' };
export type TriggerRenderProp = (getTriggerProps: TriggerPropsGetter) => ReactElement;

export type MenuContextProps = PropsWithChildren<{
  /** @private Internal typing reference for menu state */
  isTypingRef?: MutableRefObject<boolean>;
  /** Determines if the menu is open. */
  isOpen: boolean;
  /** A function that toggles the menu's `isOpen` state. */
  onOpenChange: (isOpen: boolean, triggerEvent?: OpenChangeTriggerEvent) => void;
  /** The trigger element or render prop that opens and closes the menu. */
  trigger: ReactElement<PropsWithChildren<unknown>> | TriggerRenderProp;
  /** The header of the menu. This is an optional section. You can use `FloatingMenuHeader` component to get the conventional paddings for the header. */
  header?: ReactNode;
  /** The content of the menu. */
  content?: ReactNode;
  /** The footer of the menu. This is an optional section. You can use `FloatingMenuFooter` component to get the conventional paddings for the footer. */
  footer?: ReactNode;
  /** The title of the menu. */
  title?: string;
  /** The semantic role of the menu. @default 'menu' */
  role?: 'menu' | 'listbox' | 'dialog';
  /** The width of the menu. If `'match-trigger'` is passed, the width will be the trigger's width. @default '240px' */
  // TODO: Refactor to avoid type redundancy - 'match-trigger' is included in the string union of CSSProperties['width']
  // Keeping explicit 'match-trigger' for better developer auto-completion experience
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  width?: CSSProperties['width'] | 'match-trigger';
  /** The max-width of the menu. If the width of the menu takes the trigger's width then you shouldn't define a max-width. */
  maxWidth?: CSSProperties['maxWidth'];
  /** The height of the menu. */
  height?: CSSProperties['height'];
  /** The maximum height of the **menu content**. @default '256px' */
  maxHeight?: CSSProperties['maxHeight'];
  /** The size of the menu. */
  size?: 'small' | 'large' | 'fit-content';
  /** Determines if the menu is disabled. Will also disable the trigger. */
  isDisabled?: boolean;
  /** Determines if the trigger is read-only. */
  isReadOnly?: boolean;
  /** Disables the menu shift feature. */
  disableMenuShift?: boolean;
  /** Disables the menu transform feature. */
  disableMenuTransform?: boolean;
  /** Disables typeahead functionality. */
  disableTypeahead?: boolean;
  /** Disables dismissing the menu when pressing outside. */
  disablePressOutsideDissmis?: boolean;
  /** Disables opening the menu by clicking the trigger. */
  disableOpenByTriggerClick?: boolean;
  /** Enables virtual scrolling for large lists. */
  isVirtualList?: boolean;
  /** Whether to focus an item when the menu opens. */
  focusItemOnOpen?: boolean;
  /** Whether to focus items on hover. */
  focusItemOnHover?: boolean;
  /** Whether the menu has items. @default true */
  hasItems?: boolean;
  /** Whether to trap focus within the menu. */
  shouldTrapFocus?: boolean;
  /** The gap between the trigger and dropdown in pixels. */
  triggerDropdownGap?: number;
  /** The placement of the menu relative to the trigger. @default 'bottom-start' */
  placement?: Placement;
  /** @private Internal component identifier */
  'data-component'?: string;
  /** Whether the menu should fit available height. */
  shouldFitAvailableHeight?: boolean;
  /** Children content for the menu. */
  children?: ReactNode;
}> &
  Pick<FloatingFocusManagerProps, 'initialFocus' | 'getInsideElements'> &
  AriaAttributes &
  TestIdProp;

export type UseMenuOptions = MenuContextProps;

export type UseMenuReturn = {
  isOpen: boolean;
  setIsOpen: MenuContextProps['onOpenChange'];
  activeIndex: number | null;
  setActiveIndex: (activeIndex: number | null) => void;
  elementsRef: MutableRefObject<(HTMLElement | null)[]>;
  labelsRef: MutableRefObject<(string | null)[]>;
  isTypingRef?: MutableRefObject<boolean>;
} & ReturnType<typeof useInteractions> &
  UseFloatingReturn & {
    triggerProps: Pick<MenuContextProps, 'trigger' | 'isReadOnly' | 'isDisabled' | 'data-testid'>;
    dropdownProps: Omit<MenuContextProps, 'isOpen' | 'onOpenChange' | 'trigger'>;
  };

export type ContextType = UseMenuReturn;
