import { type TooltipProps } from '@/components/dataDisplay/Tooltip/tooltip.types';
import { type BrandSymbolKey } from '@/theme/icons/brandSymbol.generated.types';
import { type IconKey } from '@/theme/icons/icon.types';

import { type MenuItemProps } from '../../Menu';

export type ActionItemWithoutIndexProps = Pick<
  MenuItemProps,
  'label' | 'disabled' | 'dataTestId' | 'onClick' | 'variant' | 'aria-label'
> & { icon?: IconKey | BrandSymbolKey; tooltipProps?: TooltipProps };

export type ActionItemProps = ActionItemWithoutIndexProps;
