import { forwardRef } from 'react';

import { Icon } from '@/components/foundations/Icon';

import { MenuItem } from '../../Menu';
import { type SortItemProps } from './SortItem.types';

export const SortItem = forwardRef<HTMLDivElement, SortItemProps>(
  ({ label, disabled, onClick, sortDirection = 'none', ...rest }, ref) => {
    const arrowTypeIcon = sortDirection === 'asc' ? 'arrow-up' : sortDirection === 'desc' ? 'arrow-down' : undefined;
    const arrowSortDirection = arrowTypeIcon ? (sortDirection === 'asc' ? 'ascending' : 'descending') : '';
    const rightElement = arrowTypeIcon && <Icon size="small" type={arrowTypeIcon} color="inherit" />;

    return (
      <MenuItem
        data-component="Menu.SortItem"
        rightElement={rightElement}
        {...rest}
        textStyle="body3Semi"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        label={label}
        aria-label={`${label} ${arrowSortDirection}`}
        aria-disabled={disabled}
        ref={ref}
      />
    );
  }
);

SortItem.displayName = 'Menu.SortItem';
