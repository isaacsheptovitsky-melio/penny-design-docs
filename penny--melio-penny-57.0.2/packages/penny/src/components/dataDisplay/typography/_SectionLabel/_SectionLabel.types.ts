import type { ReactNode } from 'react';

import type { _IconIndicatorProps } from '@/components/internal/_IconIndicator';

export const asOptions = ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'section'] as const;

export type AsType = (typeof asOptions)[number];

/**
 * @private
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _SectionLabelProps = {
  label: string;
  as?: AsType;
  children?: ReactNode;
} & OneOrNone<{
  tooltipProps: _IconIndicatorProps['tooltip'];
  isVerified: boolean;
}>;
