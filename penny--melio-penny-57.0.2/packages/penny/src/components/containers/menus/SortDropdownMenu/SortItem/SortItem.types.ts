import type { MenuItemProps } from '../../Menu';

export type SortItemProps = Pick<MenuItemProps, 'label' | 'disabled' | 'onClick' | 'dataTestId'> & {
  sortDirection?: 'none' | 'desc' | 'asc';
};
