import { useMemo } from 'react';

import { Card } from '@/components/containers/cards/Card/Card';

import {
  deliveryMethodOptions,
  fundingSourceOptions,
  type PaymentIntent,
  smallData,
} from '../../__fixtures__/storybook-mock-data';
import { type TableColumnDef } from '../../hooks/types';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';
import { TableCell } from '../../TableCell/TableCell';
import { TableHeaderSelectCell } from '../../TableHeaderSelectCell/TableHeaderSelectCell';
import { TableSelectCell } from '../../TableSelectCell/TableSelectCell';

export const MetaOptionExample = () => {
  type TableMeta = { sayHello: VoidFunction };

  type HeaderCellProps = {
    meta?: TableMeta;
    // Any other props needed for your header cell go here.
  };

  // The `meta` object is available via header cell props.
  const HeaderCell = ({ meta }: HeaderCellProps) => (
    <TableHeaderSelectCell
      label="Payment method"
      options={fundingSourceOptions}
      onSelect={() => {
        meta?.sayHello();
      }}
    />
  );

  // Note that `columns` must be memoized!
  const columns: TableColumnDef<PaymentIntent, TableMeta>[] = useMemo(
    () => [
      {
        id: 'billDetails',
        header: 'Vendor',
        isRowHeader: true,
        cell: ({ row }) => <TableCell>{row.billDetails}</TableCell>,
      },
      {
        id: 'fundingSource',
        // The `meta` object is passed internally and is available via header cell props.
        header: <HeaderCell />,
        cell: ({ row, meta }) => (
          <TableSelectCell
            value={row.fundingSource}
            options={fundingSourceOptions}
            onSelect={() => {
              meta?.sayHello();
            }}
          />
        ),
      },
      {
        id: 'deliveryMethod',
        header: 'Delivery Method',
        // The `meta` object is available via the cell renderer.
        cell: ({ row, meta }) => (
          <TableSelectCell
            value={row.deliveryMethod}
            options={deliveryMethodOptions}
            onSelect={() => {
              meta?.sayHello();
            }}
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line no-alert
  const tableProps = useTable({ data: smallData, columns, meta: { sayHello: () => alert('Hello!') } });

  return (
    <Card paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};
