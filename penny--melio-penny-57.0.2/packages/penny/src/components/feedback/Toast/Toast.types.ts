import type { ToastId } from '@chakra-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import type { ReactNode } from 'react';

/**
 * @deprecated This component isn't accessible. Please use `SectionBannerVariant`.
 */
export type ToastType = 'success' | 'error' | 'informative';

/**
 * @deprecated This component isn't accessible. Please use `SectionBannerProps`.
 */
export type ToastProps = {
  id?: ToastId;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  type: ToastType;
  title?: string | ReactNode;
  closeButtonAriaLabel?: string;
  onClose?: () => void;
} & TestIdProp &
  (
    | {
        actionType?: 'button' | 'link';
        actionText: string;
        onAction: (close: () => void) => void;
      }
    | {
        actionType?: never;
        actionText?: never;
        onAction?: never;
      }
  );
