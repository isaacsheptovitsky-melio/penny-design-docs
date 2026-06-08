import { forwardRef } from 'react';

import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { Icon } from '@/components/foundations/Icon';
import { Image } from '@/components/media/Image';
import { isBrandSymbol } from '@/theme/icons/utils';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { MenuItem } from '../../Menu';
import { type SelectableItemProps } from './SelectableItem.types';

export const SelectableItem = forwardRef<HTMLDivElement, SelectableItemProps>(
  ({ disabled, icon, image, isSelected, ...props }, ref) => {
    const { isExtraSmallScreen: isMobile } = useBreakpoint();

    const leftElement = icon ? (
      isBrandSymbol(icon) ? (
        <BrandSymbol type={icon} size={isMobile ? 'medium' : 'small'} isDisabled={disabled} />
      ) : (
        <Icon type={icon} size={isMobile ? 'large' : 'small'} color="inherit" isDisabled={disabled} />
      )
    ) : (
      image && <Image aspectRatio="1 / 1" width={isMobile ? '20px' : '16px'} src={image.src} alt={image.alt} />
    );

    return (
      <MenuItem
        data-component="Menu.SelectableItem"
        {...props}
        textStyle="body3Semi"
        leftElement={leftElement}
        disabled={disabled}
        isSelected={isSelected}
        ref={ref}
      />
    );
  }
);

SelectableItem.displayName = 'Menu.SelectableItem';
