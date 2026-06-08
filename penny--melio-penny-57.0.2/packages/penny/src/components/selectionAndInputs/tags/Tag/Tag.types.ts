import type { TestIdProp } from '@melio/penny-utils';
import type { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode, RefObject } from 'react';

import type { IconButtonProps } from '@/components/action/IconButton';

// Utility type to conditionally switch between button and div attributes
type ConditionalAttributes<T> = T extends { onClick: MouseEventHandler<HTMLButtonElement> }
  ? ButtonHTMLAttributes<HTMLButtonElement>
  : HTMLAttributes<HTMLDivElement>;

export type TagProps = TestIdProp & {
  /**
   * The content of the tag.
   */
  children: ReactNode;

  /**
   * Handles the click event of the tag.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Configuring the remove button (e.g., onClick to handle removal).
   */
  removeButtonProps?: Omit<IconButtonProps, 'icon' | 'variant' | 'size'> & { ref?: RefObject<HTMLButtonElement> };

  /**
   * Determines if the tag is disabled.
   * @default false
   */
  disabled?: boolean;
} & ConditionalAttributes<{
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }>;
