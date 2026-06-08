import { createDate, noop } from '@melio/penny-utils';
import { useMemo, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Card } from '@/components/containers/cards/Card/Card';

import {
  actionsOptions,
  deliveryMethodOptions,
  fundingSourceOptions,
  mediumData,
  type PaymentIntent,
  smallData,
} from '../../__fixtures__/storybook-mock-data';
import { type TableColumnDef, type TableRowSelectionState } from '../../hooks/types';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';
import { TableActionsCell } from '../../TableActionsCell/TableActionsCell';
import { TableAmountCell } from '../../TableAmountCell/TableAmountCell';
import { TableCell } from '../../TableCell/TableCell';
import { TableDateCell } from '../../TableDateCell/TableDateCell';
import { TableHeaderSelectCell } from '../../TableHeaderSelectCell/TableHeaderSelectCell';
import { TableSelectCell } from '../../TableSelectCell/TableSelectCell';

export const ColumnSizesExample = () => {
  // Note that `columns` must be memoized!
  const columns: TableColumnDef<PaymentIntent>[] = useMemo(
    () => [
      {
        id: 'billDetails',
        header: <TableCell>Column size is xs</TableCell>,
        cell: ({ row }) => <TableCell>{row.billDetails}</TableCell>,
        size: 'xs',
      },
      {
        id: 'fundingSource',
        header: <TableCell>Column size is s</TableCell>,
        cell: ({ row }) => <TableCell>{row.fundingSource}</TableCell>,
        size: 's',
      },
      {
        id: 'deliveryMethod',
        header: <TableCell>Column size is m (default)</TableCell>,
        cell: ({ row }) => <TableCell>{row.deliveryMethod}</TableCell>,
      },
      {
        id: 'scheduledDate',
        header: <TableCell>Column size is l</TableCell>,
        cell: ({ row }) => <TableCell>{row.scheduledDate}</TableCell>,
        size: 'l',
      },
      {
        id: 'amountToPay',
        header: <TableCell>Column size is 110</TableCell>,
        cell: ({ row }) => <TableCell>{row.amountToPay}</TableCell>,
        size: 110,
      },
    ],
    []
  );

  const tableProps = useTable({ data: smallData, columns });

  return (
    <Card paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};

export const PinnedColumnsExample = () => {
  const [, setRowSelectionState] = useState<TableRowSelectionState<PaymentIntent>>();
  const [, setAreAllSelected] = useState<boolean>();
  const columns: TableColumnDef<PaymentIntent>[] = [
    {
      id: 'billDetails',
      header: 'Vendor',
      cell: ({ row }) => <TableCell>{row.billDetails}</TableCell>,
      // This will make this column pin to the left of the table
      isPinnedToLeft: true,
      isRowHeader: true,
    },
    {
      id: 'fundingSource',
      header: <TableHeaderSelectCell label="Payment method" options={fundingSourceOptions} onSelect={noop} />,
      cell: ({ row }) => <TableSelectCell value={row.fundingSource} options={fundingSourceOptions} onSelect={noop} />,
    },
    {
      id: 'deliveryMethod',
      header: 'Delivery Method',
      cell: ({ row }) => <TableSelectCell value={row.deliveryMethod} options={deliveryMethodOptions} onSelect={noop} />,
    },
    {
      id: 'scheduledDate',
      header: 'Deduction date',
      cell: ({ row }) => <TableDateCell placeholder="N/A" value={createDate(row.scheduledDate)} onSelect={noop} />,
    },
    {
      id: 'amountToPay',
      header: 'Amount',
      cell: ({ row }) => <TableAmountCell value={row.amountToPay} />,
      textAlign: 'end',
      size: 110,
    },
    {
      id: 'actions',
      cell: () => <TableActionsCell options={actionsOptions} />,
      size: 'xs',
      // This will make this column pin to the right of the table
      isPinnedToRight: true,
    },
  ];

  const tableProps = useTable({
    data: mediumData,
    columns,
    onRowSelectionChange: setRowSelectionState,
    onAllRowsSelectionChange: setAreAllSelected,
    allRowsSelectionAriaLabel: 'Select all vendors',
    getRowSelectionAriaLabel: (row) => 'Vendor ' + row.billDetails,
  });

  return (
    <Storybook.Container width="700px">
      <Card paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    </Storybook.Container>
  );
};
