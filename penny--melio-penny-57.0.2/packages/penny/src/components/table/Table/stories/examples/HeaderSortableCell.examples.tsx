/* eslint-disable max-lines */
import { noop } from '@melio/penny-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Card } from '@/components/containers/cards/Card/Card';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { type TableColumnDef } from '../../hooks/types';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';
import type { SortDirection, SortingState } from '../../Table.types';
import { TableCell } from '../../TableCell/TableCell';
import {
  TableHeaderSortableCell,
  type TableHeaderSortableCellProps,
} from '../../TableHeaderSortableCell/TableHeaderSortableCell';

export const MainExample = (
  props: Omit<TableHeaderSortableCellProps, 'sortDirection'> & { sortDirection: SortDirection | 'none' }
) => {
  const { sortDirection, ...args } = props;
  const defaultData: { id: string; name: string }[] = useMemo(
    () => [
      {
        id: '0',
        name: 'Bob',
      },
      {
        id: '1',
        name: 'Simone',
      },
      {
        id: '2',
        name: 'John',
      },
      {
        id: '3',
        name: 'Israel',
      },
    ],
    []
  );

  const initialSortingState: SortingState | undefined =
    sortDirection && sortDirection !== 'none' ? { id: 'Name', sortDirection } : undefined;

  const [sorting, setSorting] = useState<SortingState | undefined>(initialSortingState);
  const [data, setData] = useState(defaultData);

  const sortArray = <T extends { id: string; name: string }>(
    array: T[],
    property: keyof T,
    sortDirection: SortDirection
  ): T[] =>
    [...array].sort((a, b) => {
      const valueA = a[property]?.toString().toLowerCase() ?? '';
      const valueB = b[property]?.toString().toLowerCase() ?? '';

      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }

      return sortDirection === 'desc' ? comparison * -1 : comparison;
    });

  const onSort = useCallback(
    (sorting: SortingState | undefined) => {
      setSorting(sorting);
      if (!sorting) {
        setData(defaultData);
      } else {
        const sortedData = sortArray(defaultData, 'name', sorting.sortDirection);
        setData(sortedData);
      }
    },
    [defaultData]
  );

  useEffect(() => {
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSorting(sortDirection && sortDirection !== 'none' ? { id: 'Name', sortDirection } : undefined);
  }, [sortDirection]);

  const columns: TableColumnDef<{ name: string }>[] = useMemo(
    () => [
      {
        id: 'Name',
        header: (
          <TableHeaderSortableCell
            {...args}
            data-testid="header-sortable-cell"
            sortDirection={sorting?.id === 'Name' ? sorting.sortDirection : undefined}
            onClick={(sortDirection: SortDirection | undefined) =>
              onSort(sortDirection ? { id: 'Name', sortDirection } : undefined)
            }
          >
            Name
          </TableHeaderSortableCell>
        ),
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ],
    [args, onSort, sorting?.id, sorting?.sortDirection]
  );

  const tableProps = useTable({
    data,
    columns,
    headerVariant: 'dark',
    sortingState: sorting,
    setSortState: setSorting,
  });

  return (
    // `Card` can be replaced with any surface.
    <Card width="fit-content" paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};

export const InitialSortDirectionExample = (
  props: Omit<TableHeaderSortableCellProps, 'sortDirection'> & { sortDirection: SortDirection | 'none' }
) => {
  const { sortDirection, ...args } = props;
  const defaultData: { id: string; name: string }[] = useMemo(
    () => [
      {
        id: '0',
        name: 'Bob',
      },
      {
        id: '1',
        name: 'Simone',
      },
      {
        id: '2',
        name: 'John',
      },
      {
        id: '3',
        name: 'Israel',
      },
    ],
    []
  );

  const columns: TableColumnDef<{ name: string }>[] = useMemo(
    () => [
      {
        id: 'Name',
        header: (
          <TableHeaderSortableCell
            {...args}
            sortDirection={undefined}
            data-testid="header-sortable-asc-cell"
            initialSortDirection="asc"
            onClick={noop}
          >
            Name
          </TableHeaderSortableCell>
        ),
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ],
    [args]
  );

  const tableProps = useTable({ data: defaultData, columns, headerVariant: 'dark' });

  return (
    // `Card` can be replaced with any surface.
    <Card width="fit-content" paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};

export const StaticExample = (args: TableHeaderSortableCellProps) => {
  const data: { id: string; name: string }[] = [
    {
      id: '0',
      name: 'Bob',
    },
    {
      id: '1',
      name: 'Simone',
    },
    {
      id: '2',
      name: 'John',
    },
    {
      id: '3',
      name: 'Israel',
    },
  ];

  const columns: TableColumnDef<{ name: string }>[] = useMemo(
    () => [
      {
        id: 'Name',
        header: (
          <TableHeaderSortableCell {...args} data-testid="header-sortable-cell" sortDirection="asc">
            Name
          </TableHeaderSortableCell>
        ),
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ],
    [args]
  );

  const tableProps = useTable({ data, columns, headerVariant: 'dark' });

  return (
    // `Card` can be replaced with any surface.
    <Card width="fit-content" paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};

export const WithTooltipExample = (
  props: Omit<TableHeaderSortableCellProps, 'sortDirection'> & { sortDirection: SortDirection | 'none' }
) => {
  const { sortDirection, ...args } = props;
  const defaultData: { id: string; name: string }[] = useMemo(
    () => [
      {
        id: '0',
        name: 'Bob',
      },
      {
        id: '1',
        name: 'Simone',
      },
      {
        id: '2',
        name: 'John',
      },
      {
        id: '3',
        name: 'Israel',
      },
    ],
    []
  );

  const initialSortingState: SortingState | undefined =
    sortDirection && sortDirection !== 'none' ? { id: 'Name', sortDirection } : undefined;

  const [sorting, setSorting] = useState<SortingState | undefined>(initialSortingState);
  const [data, setData] = useState(defaultData);

  const sortArray = <T extends { id: string; name: string }>(
    array: T[],
    property: keyof T,
    sortDirection: SortDirection
  ): T[] =>
    [...array].sort((a, b) => {
      const valueA = a[property]?.toString().toLowerCase() ?? '';
      const valueB = b[property]?.toString().toLowerCase() ?? '';

      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }

      return sortDirection === 'desc' ? comparison * -1 : comparison;
    });

  const onSort = useCallback(
    (sorting: SortingState | undefined) => {
      setSorting(sorting);
      if (!sorting) {
        setData(defaultData);
      } else {
        const sortedData = sortArray(defaultData, 'name', sorting.sortDirection);
        setData(sortedData);
      }
    },
    [defaultData]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSorting(sortDirection && sortDirection !== 'none' ? { id: 'Name', sortDirection } : undefined);
  }, [sortDirection]);

  const columns: TableColumnDef<{ name: string }>[] = useMemo(
    () => [
      {
        id: 'Name',
        header: (
          <Tooltip content="To show a tooltip simply wrap the header cell with our Tooltip component!">
            <TableHeaderSortableCell
              {...args}
              data-testid="header-sortable-cell"
              sortDirection={sorting?.id === 'Name' ? sorting.sortDirection : undefined}
              onClick={(sortDirection: SortDirection | undefined) =>
                onSort(sortDirection ? { id: 'Name', sortDirection } : undefined)
              }
            >
              Name
            </TableHeaderSortableCell>
          </Tooltip>
        ),
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ],
    [args, onSort, sorting?.id, sorting?.sortDirection]
  );

  const tableProps = useTable({
    data,
    columns,
    headerVariant: 'dark',
    sortingState: sorting,
    setSortState: setSorting,
  });

  return (
    // `Card` can be replaced with any surface.
    <Card width="fit-content" paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};
