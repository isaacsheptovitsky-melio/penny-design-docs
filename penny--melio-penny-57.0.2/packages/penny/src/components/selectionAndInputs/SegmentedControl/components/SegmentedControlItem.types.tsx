import { type TestIdProp } from '@melio/penny-utils';
import { type InputHTMLAttributes } from 'react';

export type SegmentSize = 'small' | 'medium' | 'large';
export const DEFAULT_SEGMENT_SIZE: SegmentSize = 'large';

export type BaseSegmentProps = {
  selected?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  size?: SegmentSize;
} & TestIdProp;

export type SegmentedControlItemProps = BaseSegmentProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
