import type { TestIdProp } from '@melio/penny-utils';
import type { ReactNode } from 'react';

export type ChipProps = {
  /**
   * The content inside the Chip, display on hover.
   */
  label: ReactNode;

  /**
   * Determines if the chip is selected.
   * @default false
   */
  selected?: boolean;
} & TestIdProp;
