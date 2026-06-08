import type { TestIdProp } from '@melio/penny-utils';
import type { AriaAttributes, PropsWithChildren } from 'react';

export const DEFAULT_TRACKER_VARIANT = 'horizontal';
export const DEFAULT_TRACKER_STATUS = 'success';
export const DEFAULT_TRACKER_WIDTH = 'full';

// Creating a type for data attributes, to allow for dynamic data attributes to be passed to children.
export type DataAttributes = { [key: `data-${string}`]: string };

/**
 * Status options for tracker styling
 */
export type TrackerStatus = 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';

/**
 * Tracker layout variants
 */
export type TrackerVariant = 'horizontal' | 'vertical';

/**
 * Tracker width options
 */
export type TrackerWidth = 'full' | 'fit-content';

type BaseTrackerProps = {
  /**
   * The variant of tracker.
   * @default 'horizontal'
   */
  variant?: TrackerVariant;

  /**
   * The width of the tracker.
   * @default 'full'
   */
  width?: TrackerWidth;

  /**
   * The status color of the tracker.
   */
  status?: TrackerStatus;
} & AriaAttributes;

export type TrackerProps = PropsWithChildren<BaseTrackerProps & TestIdProp>;
