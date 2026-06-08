import { forwardRef } from 'react';

import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { Icon } from '@/components/foundations/Icon';
import { isBrandSymbol } from '@/theme/icons/utils';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { MenuItem } from '../../Menu';
import { type ActionItemProps } from './ActionItem.types';

export const ActionItem = forwardRef<HTMLDivElement, ActionItemProps>(
  ({ variant = 'default', disabled, icon, ...props }, ref) => {
    const { isExtraSmallScreen: isMobile } = useBreakpoint();

    const leftElement = icon ? (
      isBrandSymbol(icon) ? (
        <BrandSymbol type={icon} size={isMobile ? 'medium' : 'small'} isDisabled={disabled} />
      ) : (
        <Icon type={icon} size={isMobile ? 'large' : 'small'} color="inherit" isDisabled={disabled} />
      )
    ) : undefined;

    return (
      <MenuItem
        data-component="Menu.ActionItem"
        variant={variant}
        {...props}
        textStyle="body3Semi"
        leftElement={leftElement}
        disabled={disabled}
        ref={ref}
      />
    );
  }
);

ActionItem.displayName = 'Menu.ActionItem';
