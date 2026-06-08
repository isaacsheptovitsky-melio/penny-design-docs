import type { ElementType } from 'react';

import type { NakedButtonProps } from '@/components/action/NakedButton';
import type { LinkProps } from '@/components/navigation/Link';

/**
 * @private
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _DescriptionProps = {
  label: string;
  as?: ElementType;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  id?: string;
} & OneOrNone<{
  // Those props are not relevant for this pattern:
  // variant - always `inline` in Description
  // size - always `large` when `inline`
  // isBold - ignored when `inline`
  // shouldSupportEllipsis - doesn't work with description - the link wrap to next line
  // children - prop set as never
  link: Omit<LinkProps, 'size' | 'variant' | 'isBold' | 'shouldSupportEllipsis' | 'children'>;
  // size - should be medium same as the description label
  // variant - always `secondary` in Description
  // shouldSupportEllipsis - doesn't work with description - the link wrap to next line
  // children - prop is deprecated
  action: Omit<NakedButtonProps, 'size' | 'variant' | 'shouldSupportEllipsis' | 'children'>;
}>;
