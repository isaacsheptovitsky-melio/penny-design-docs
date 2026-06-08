import { forwardRef, type Ref } from 'react';

import { Icon } from '@/components/foundations/Icon/Icon';

import { TableCell } from '../TableCell/TableCell';

export type TableExpandCellProps = {
  isExpanded: boolean;
  toggleExpanded: VoidFunction;
};

export const TableExpandCell = forwardRef<HTMLButtonElement, TableExpandCellProps>(
  ({ isExpanded, toggleExpanded, ...props }, ref) => (
    <TableCell
      data-component="TableExpandCell"
      ref={ref as Ref<HTMLDivElement>}
      onClick={toggleExpanded}
      as="button"
      type="button"
      tabIndex={-1}
      aria-hidden
      {...props}
      textAlign="center"
    >
      <Icon type={`${isExpanded ? 'chevron-down' : 'chevron-right'}`} />
    </TableCell>
  )
);

TableExpandCell.displayName = 'TableExpandCell';
