import { type BoxProps } from '@chakra-ui/react';
import { type FloatingFocusManagerProps } from '@floating-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type ReactNode } from 'react';

import type { ThemeBreakpointsKey } from '@/theme/foundations/breakpoints';

import { type DrawerContentProps } from './components/DrawerContent.type';

export type PresetDrawerSizes = 's' | 'm' | 'l';
export type CustomDrawerSize = number | ResponsiveValueType<string>;
export type DrawerSize = PresetDrawerSizes | CustomDrawerSize;

export type ResponsiveValueType<T> = RequireAtLeastOne<Partial<Record<ThemeBreakpointsKey, T>>>;

type DrawerBreakpointSizesMappingType = Record<PresetDrawerSizes, ResponsiveValueType<string>>;

// Define predefined drawer sizes based on screen breakpoints
export const DrawerBreakpointSizesMap: DrawerBreakpointSizesMappingType = {
  s: { xs: '100vw', s: '320px', m: '480px' },
  m: { xs: '100vw', s: '708px' },
  l: { xs: '100vw', s: '812px', m: '1000px', l: '1216px' },
};

export type DrawerProps = {
  /** Determines whether the drawer is open. */
  isOpen: boolean;
  /** A callback that is fired when clicking the drawer's backdrop or the close button. */
  onClose: VoidFunction;
  /** Fires when the drawer has completed animating out. */
  onCloseComplete?: VoidFunction;
  /** Determines whether the drawer is in a loading state. */
  isLoading?: boolean;
  /** The content of the drawer's header. */
  header?: ReactNode;
  /** The header override props (useful for setting additional props to the drawer's header). */
  headerProps?: BoxProps;
  /** The content of the drawer's body. */
  body?: ReactNode;
  /** The content of the drawer's footer. */
  footer?: ReactNode;
  /** The footer override props (useful for setting additional props to the drawer's footer). */
  footerProps?: BoxProps;
  /** The `aria-label` of the drawer's close button. */
  closeButtonAriaLabel?: string;
  /**
   *  A space-separated list of element IDs whose associated labels should be read when the button is focused.
   * This is used to provide a descriptive label while also indicating the loading state.
   */
  closeButtonAriaLabelledBy?: string;
  /** Determines if focus should be returned to the reference element (or if that is not available, the previously focused element). @default true */
  shouldReturnFocus?: FloatingFocusManagerProps['returnFocus'];
  /** Determines if focus should be restored to the nearest tabbable element if the currently focused element inside the floating element was removed from the DOM. [more info...](https://floating-ui.com/docs/FloatingFocusManager#restorefocus) */
  shouldRestoreFocus?: FloatingFocusManagerProps['restoreFocus'];
  /** Determines the drawer's width @default 'm' */
  size?: DrawerSize;
  /** Callback to call when the drawer is close by typing Esc. Note: onEsc is called first and onClose after */
  onEsc?: DrawerContentProps['onEsc'];
  /** Callback to call when the drawer is close by clicking on overlay. Note: onOverlayClick is called first and onClose after */
  onOverlayClick?: DrawerContentProps['onOverlayClick'];
} & TestIdProp &
  AriaAttributes;
