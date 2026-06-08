export type { Placement } from '@floating-ui/react';

/**
 * The event that triggered the popover open state change.
 * - 'close': User clicked the close button
 * - 'outside': User clicked outside the popover
 * - 'cta': Triggered by a call-to-action button
 * - 'children': Triggered by child components
 */
export type BasePopoverOpenChangeTriggerEvent = 'close' | 'outside' | 'cta' | 'children';
