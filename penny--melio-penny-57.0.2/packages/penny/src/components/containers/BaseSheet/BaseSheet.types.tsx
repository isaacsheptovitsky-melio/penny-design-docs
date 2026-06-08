import type { FloatingFocusManagerProps } from '@floating-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import type { HTMLAttributes, PropsWithChildren } from 'react';

import type { SlideProps } from '@/components/foundations/transitions/Slide';

import type { ContainerProps } from '../Container';

/**
 * @private For internal use only.
 */
export const CLOSE_BUTTON_DATA_TEST_ID = 'sheet-close-button';

/**
 * Determines from which direction the sheet would open.
 */
export type BaseSheetPlacement = Extract<SlideProps['direction'], 'left' | 'bottom'>;

export type BaseSheetProps = PropsWithChildren<{
  /** Determines whether the sheet is open. */
  isOpen: boolean;
  /** Callback to call when the modal is closed */
  onClose: VoidFunction;
  /** Fires when the sheet has completed animating out. */
  onCloseComplete?: VoidFunction;
  /** Determines from which direction the sheet would open. @default 'left' */
  placement?: BaseSheetPlacement;
  /** Determines if the sheet is loading. */
  isLoading?: boolean;
  /** The aria label for the close button. @default 'Close dialog' */
  closeButtonAriaLabel?: string;
  /** If true, this keeps the portal mounted even when the sheet is closed. */
  isModal?: boolean;
  /** Callback to call when the modal is close by clicking on overlay. Note: onOverlayClick is called first and onClose after */
  onOverlayClick?: VoidFunction;
  /** Callback to call when the modal is close by typing Esc. Note: onEsc is called first and onClose after */
  onEsc?: VoidFunction;
}> &
  Pick<ContainerProps, 'paddingX' | 'paddingY'> &
  Pick<FloatingFocusManagerProps, 'initialFocus' | 'returnFocus'> &
  HTMLAttributes<HTMLDivElement> &
  TestIdProp;
