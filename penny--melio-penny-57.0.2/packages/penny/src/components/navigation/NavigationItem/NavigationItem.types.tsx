import type { TestIdProp } from '@melio/penny-utils';
import type { AriaAttributes, AriaRole, ElementType, MouseEventHandler, ReactNode } from 'react';

import type { ButtonLinkProps } from '@/components/action/action.types';

export type NavigationItemProps = {
  /** The content of the navigation item. */
  children: ReactNode;
  /** Determines if the item should take the full width of its container. */
  isFullWidth?: boolean;
  /** Handles the click event on the component. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Determines if the item is selected. */
  isSelected?: boolean;
  /** The semantic meaning of the element. */
  role?: AriaRole;
  /** The unique identifier for the element. */
  id?: string;
  /**
   * Change the renders tag element.
   * A classic use-case is when you are rendering a custom button as content, and you need the nav item to render as div.
   * @default 'button'
   */
  as?: ElementType;
} & ButtonLinkProps &
  AriaAttributes &
  TestIdProp;
