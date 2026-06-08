import { type TestIdProp } from '@melio/penny-utils';
import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

import { type ContextState } from './SegmentedControlContext';

export type SegmentedControlProps = Omit<ContextState, 'type'> & {
  /**
   * The segments to render within the segmented control.
   */
  children?: ReactNode;

  /**
   * Set if multi options or single options.
   * @default false
   */
  isMulti?: boolean;

  /**
   * Sets if width fill its container.
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * Sets the all segments as disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Sets the all segmented as read only.
   * @default false
   */
  isReadOnly?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  TestIdProp;

export type SegmentOption = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value'> & {
  /**
   * The value of the segment option.
   */
  value: string;

  /**
   * The label text for the segment.
   */
  label?: string;

  /**
   * An element to display on the left side of the segment.
   */
  leftElement?: ReactNode;

  /**
   * An element to display on the right side of the segment.
   */
  rightElement?: ReactNode;
} & TestIdProp;
