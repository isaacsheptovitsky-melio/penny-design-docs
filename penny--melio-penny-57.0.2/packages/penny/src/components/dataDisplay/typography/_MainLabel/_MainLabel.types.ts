import type { IconProps } from '@/components/foundations/Icon';
import type { _IconIndicatorProps } from '@/components/internal/_IconIndicator';

import type { PillProps } from '../../Pill';
import type { TooltipProps } from '../../Tooltip';

/**
 * @private
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _MainLabelProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  secondaryLabel?: string;
  pillProps?: PillProps | PillProps[];
  isDisabled?: boolean;
  isReadOnly?: boolean;
  variant?: 'default' | 'bold';
  'data-testid'?: string;
  size?: 'small' | 'large';
  tooltipProps?: TooltipProps & {
    triggerStatus?: _IconIndicatorProps['variant'];
  };
  iconProps?: Omit<IconProps, 'size' | 'isReadOnly' | 'isDisabled'>;
  shouldSupportEllipsis?: boolean;
};
