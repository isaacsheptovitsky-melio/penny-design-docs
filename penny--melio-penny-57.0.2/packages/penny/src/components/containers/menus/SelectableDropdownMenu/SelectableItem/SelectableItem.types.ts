import type { TooltipProps } from '@/components/dataDisplay/Tooltip/tooltip.types';
import { type BrandSymbolKey, type IconKey } from '@/theme/icons';

import { type MenuItemProps } from '../../Menu';

type ImageIconProps = {
  src: string;
  alt: string;
};

export type SelectableItemProps = Pick<
  MenuItemProps,
  'label' | 'disabled' | 'isSelected' | 'dataTestId' | 'onClick'
> & { value: string; tooltipProps?: TooltipProps } & OneOrNone<{
    icon?: IconKey | BrandSymbolKey;
    image?: ImageIconProps;
  }>;
