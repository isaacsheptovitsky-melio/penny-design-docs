import type { TestIdProp } from '@melio/penny-utils';

import type { TourPopoverProps } from './components/TourPopover';

type NonEmptyArray<T> = [T, ...T[]];

/**
 * Action types for tour step interactions
 */
export type Action = 'ready' | 'start' | 'next' | 'prev';

/**
 * Configuration for individual tour step
 */
export type TourtipStep = Pick<TourPopoverProps, 'placement' | 'title' | 'icon' | 'description'> & {
  /**
   * Target element selector or HTMLElement for the tour step
   */
  target: string | HTMLElement;
  /**
   * Aria label for the beacon when tour is minimized
   */
  beaconAriaLabel?: string;
  /**
   * Custom label for the next button in this step
   */
  nextButtonLabel?: string;
  /**
   * Custom label for the previous button in this step
   */
  prevButtonLabel?: string;
  /**
   * The offset between the beacon and its target in pixels.
   * Format: `[skidding, distance]` where skidding is the cross-axis offset and distance is the main axis offset.
   * Reference: https://popper.js.org/docs/v2/modifiers/offset/
   */
  beaconOffset?: [number, number];
};
/**
 * Array of tour steps (must contain at least one step)
 */
export type TourtipSteps = NonEmptyArray<TourtipStep>;
/**
 * Callback data provided to tour event handlers
 */
export type CallbackStepData = { currentIndex: number; newIndex?: number; action?: Action };

type BaseTourtipProps = {
  /**
   * An array of the steps to the tour.
   */
  steps: TourtipSteps;
  /**
   * Set the default labels for the Tourtip's text areas
   */
  defaultLabels: {
    nextButtonLabel: string;
    prevButtonLabel: string;
    progressLabel?: string;
    progressSeparator?: string;
  };
  /**
   * Determines if tour is running.
   * @default true
   */
  run?: boolean;
  /**
   * Set a default step index to start the tour from.
   * @default 0
   */
  defaultStepIndex?: number;
  /**
   * Set the current step index. **controlled mode**
   */
  stepIndex?: number;
  /**
   * Determines if tour can be minimized.
   * @default false
   */
  enableMinimize?: boolean;
  /**
   * Set a default value for the tour minimize state.
   * Either this or `enableMinimize` are required.
   * @default false
   */
  defaultIsMinimize?: boolean;
  /**
   * Disables page scrolling during the tour
   */
  disableScrolling?: boolean;
  /**
   * Called when the tour starts and show the first step on mount.
   * Triggers when `enableMinimize` and `defaultIsMinimize` is falsy
   */
  onTourStart?: (callbackStepData: CallbackStepData) => void;
  /**
   * Called when the user clicked on the beacon.
   * Triggers when `hideTourtipOnMount` is truthy
   */
  onBeaconClick?: (callbackStepData: CallbackStepData) => void;
  /**
   * Called when the target element is not found.
   * Required on controlled mode
   */
  onTargetNotFound?: (callbackStepData: CallbackStepData) => void;
  /**
   * Called when the step changes.
   * Triggers only on uncontrolled mode
   */
  onStepChange?: (callbackStepData: CallbackStepData) => void;
  /**
   * Called when next button clicked.
   * Required on controlled mode
   */
  onNextClick?: (callbackStepData: CallbackStepData) => void;
  /**
   * Called when prev button clicked.
   * Required on controlled mode
   */
  onPrevClick?: (callbackStepData: CallbackStepData) => void;
  /**
   * Called when the tour is completed.
   */
  onTourComplete?: (callbackStepData: CallbackStepData) => void;
  /**
   * Called when the tour is dismissed. (when the user clicks the close button)
   */
  onTourDismiss?: (callbackStepData: CallbackStepData) => void;
  /**
   * Called when the tour is minimized. (when the user clicks outside the tourtip)
   * Triggers only when `enableMinimize` is true
   */
  onTourMinimize?: (callbackStepData: CallbackStepData) => void;
} & Pick<TourPopoverProps, 'shouldTrapFocus'>;

type EnabledMinimizeTourtip = {
  enableMinimize: boolean;
  defaultIsMinimize?: boolean;
};

type DisabledMinimizeTourtip = {
  enableMinimize?: boolean;
  defaultIsMinimize?: never;
};

type ControlledTourtipProps = {
  stepIndex: number;
  onNextClick: (callbackStepData: CallbackStepData) => void;
  onPrevClick: (callbackStepData: CallbackStepData) => void;
  onTargetNotFound: (callbackStepData: CallbackStepData) => void;
  onStepChange?: never;
};

type UnControlledTourtipProps = {
  stepIndex?: never;
};

export type TourtipProps = BaseTourtipProps &
  (ControlledTourtipProps | UnControlledTourtipProps) &
  (EnabledMinimizeTourtip | DisabledMinimizeTourtip) &
  TestIdProp;
