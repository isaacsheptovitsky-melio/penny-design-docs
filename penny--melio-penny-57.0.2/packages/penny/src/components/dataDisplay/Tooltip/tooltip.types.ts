import {
  type Placement,
  type UseFloatingOptions,
  type UseFloatingReturn,
  type useInteractions,
} from '@floating-ui/react';
import type { ReactNode } from 'react';

export type TooltipProps = {
  /**
   * The tooltip content.
   */
  content: ReactNode;

  /**
   * The DOM node that will trigger the tooltip on hover.
   */
  children?: ReactNode;

  /**
   * Use this wrapper to add a focusable container to the trigger of the tooltip.
   * Use this for disabled components, such as a disabled button (which doesn't trigger hover events when disabled).
   * @default false
   */
  shouldAddTriggerFocus?: boolean;

  /**
   * Add aria-label to the trigger of the tooltip.
   */
  triggerAriaLabel?: string;

  /**
   * Determine if the tooltip stops the act of an accessible description.
   * It wont pass an aria-describedby attribute to the trigger.
   * In cases like the Pagination component, where we dont want the tooltip to be announced with the icon button, we should avoid using aria-describedby.
   * @default false
   */
  dontDescribeChild?: boolean;
} & UseTooltipOptions;

export type UseTooltipOptions = {
  /**
   * Placement of the tooltip relative to its trigger element.
   * @default 'top'
   */
  placement?: Placement;

  /**
   * Determine the tooltip is enabled or not on hover / focus.
   * @default true
   */
  isEnabled?: boolean;

  /**
   * Determines if the tooltip is open (controlled mode only).
   * By setting this prop the tooltip will be controlled, meaning the parent component will manage the tooltip's state.
   * By default is uncontrolled, meaning it will manage its own state.
   */
  isOpen?: boolean;

  /**
   * The callback event is invoked when the tooltip is opened or closed (controlled mode only).
   * This prop is used to control the tooltip's state when the tooltip is controlled.
   */
  onOpenChange?: UseFloatingOptions['onOpenChange'];
};

export type UseTooltipReturn = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMounted: boolean;
} & ReturnType<typeof useInteractions> &
  UseFloatingReturn;

export type ContextType = UseTooltipReturn | null;
