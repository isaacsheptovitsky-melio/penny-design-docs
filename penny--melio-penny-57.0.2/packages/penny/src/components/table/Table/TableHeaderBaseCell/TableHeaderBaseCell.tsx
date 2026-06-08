import { Box } from '@chakra-ui/react';
import { type SortDirection } from '@tanstack/react-table';
import type { AriaAttributes, AriaRole } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { useCellSize as useCellSize } from '../hooks/useCellSize';
import { type TableBaseCellProps } from '../Table.types';

const ariaSortBySortDirection: Record<SortDirection, AriaAttributes['aria-sort']> = {
  asc: 'ascending',
  desc: 'descending',
};

export type TableHeaderBaseCellProps = TableBaseCellProps & {
  sortDirection?: SortDirection;
  variant?: 'light' | 'dark';
};

export const TableHeaderBaseCell = forwardRef<HTMLDivElement, TableHeaderBaseCellProps>(
  ({ size, textAlign = 'start', pinOptions, variant, sortDirection, omitRole, ...restProps }, propRef) => {
    const ref = useRef<HTMLDivElement>(null);
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(propRef, () => ref.current);

    const style = useStyleConfig('TableHeaderBaseCell', {
      size: useCellSize(size),
      textAlign,
      variant,
      pinOptions,
    });
    const ariaSort = sortDirection ? ariaSortBySortDirection[sortDirection] : undefined;

    // For a11y - table header can't be empty
    // The closest reference is table with two headers
    // https://www.w3.org/WAI/tutorials/tables/two-headers/

    const getRole = (): AriaRole | undefined => {
      if (omitRole) {
        return undefined;
      }

      if (restProps.children) {
        return 'columnheader';
      }

      return 'cell';
    };

    return (
      <Box
        role={getRole()}
        __css={style}
        data-component="TableHeaderBaseCell"
        aria-sort={ariaSort}
        {...restProps}
        ref={ref}
      />
    );
  }
);

TableHeaderBaseCell.displayName = 'TableHeaderBaseCell';
