import { type ModalProps as ChakraModalProps } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes, type AriaRole, type PropsWithChildren, type ReactNode } from 'react';

export type BaseModalProps = Pick<ChakraModalProps, 'isOpen' | 'onClose' | 'onEsc' | 'onOverlayClick'> &
  PropsWithChildren<{
    /** The size of the modal. @default 'small' */
    size?: 'small' | 'medium' | 'large';
    /** Determines if focus should be returned to the trigger element when the modal closes. @default 'true' */
    shouldReturnFocus?: boolean;
    /** Determines if the modal is loading. */
    isLoading?: boolean;
    /** The aria-label for the close button. */
    closeButtonAriaLabel?: string;
    /** The semantic role of the modal. @default 'dialog' */
    role?: Extract<AriaRole, 'dialog' | 'menu' | 'grid' | 'alertdialog' | 'listbox' | 'tooltip' | 'tree'>;
    /** If true, the modal will be open. */
    isOpen: boolean;
    /** Callback to call when the modal is closed. */
    onClose: () => void;
    /** Callback to call when the modal is closed by typing Esc. Note: onEsc is called first and onClose after. */
    onEsc?: () => void;
    /** Callback to call when the overlay/backdrop is clicked. */
    onOverlayClick?: () => void;
    /** The content of the modal. */
    children?: ReactNode;
  }> &
  TestIdProp &
  AriaAttributes;
