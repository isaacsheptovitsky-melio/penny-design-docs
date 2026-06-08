import { createDate, noop } from '@melio/penny-utils';
import { useMemo } from 'react';

import { Card } from '@/components/containers/cards/Card/Card';
import { Container } from '@/components/containers/Container/Container';
import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';

import {
  actionsOptions,
  deliveryMethodOptions,
  fundingSourceOptions,
  type PaymentIntent,
} from '../../__fixtures__/storybook-mock-data';
import type { TableColumnDef, TableDataEntity, UseTableOptions } from '../../hooks/types';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';
import { TableActionsCell } from '../../TableActionsCell/TableActionsCell';
import { TableAmountCell } from '../../TableAmountCell/TableAmountCell';
import { TableCell } from '../../TableCell/TableCell';
import { TableDateCell } from '../../TableDateCell/TableDateCell';
import { TableHeaderSelectCell } from '../../TableHeaderSelectCell/TableHeaderSelectCell';
import { TableSelectCell } from '../../TableSelectCell/TableSelectCell';

export const MainExample = ({
  args,
  captionId,
}: {
  args: Partial<UseTableOptions<PaymentIntent>>;
  captionId: string | undefined;
}) => {
  type PaymentIntent = TableDataEntity<{
    billDetails: string;
    fundingSource: string;
    deliveryMethod: string;
    scheduledDate: string;
    amountToPay: number;
  }>;

  const data: PaymentIntent[] = [
    {
      billDetails: 'Blue Runner',
      fundingSource: 'bank',
      deliveryMethod: 'bank',
      scheduledDate: '2022-12-20',
      amountToPay: 1231,
    },
    {
      billDetails: 'White Lotus',
      fundingSource: 'chase',
      deliveryMethod: 'check',
      scheduledDate: '2022-12-20',
      amountToPay: 673,
    },
    {
      billDetails: 'Blue Runner',
      fundingSource: 'bank',
      deliveryMethod: 'check',
      scheduledDate: '2022-12-20',
      amountToPay: 2540,
    },
    {
      billDetails: 'White Lotus',
      fundingSource: 'bank',
      deliveryMethod: 'bank',
      scheduledDate: '2022-12-20',
      amountToPay: 4560,
    },
    {
      billDetails: 'Yellow Rock',
      fundingSource: 'bank',
      deliveryMethod: 'check',
      scheduledDate: '2022-12-20',
      amountToPay: 230,
    },
    {
      billDetails: 'Yellow Rock',
      fundingSource: 'chase',
      deliveryMethod: 'bank',
      scheduledDate: '2022-12-20',
      amountToPay: 880,
    },
    {
      billDetails: 'Blue Runner',
      fundingSource: 'chase',
      deliveryMethod: 'bank',
      scheduledDate: '2022-12-20',
      amountToPay: 345,
    },
  ];

  // Note that `columns` must be memoized!
  const columns: TableColumnDef<PaymentIntent>[] = useMemo(
    () => [
      {
        id: 'billDetails',
        header: 'Vendor',
        // Set as true for column that describes the row
        isRowHeader: true,
        cell: ({ row }) => <TableCell>{row.billDetails}</TableCell>,
        // Uses the default size of \`m\`
      },
      {
        id: 'fundingSource',
        header: <TableHeaderSelectCell label="Payment method" options={fundingSourceOptions} onSelect={noop} />,
        cell: ({ row }) => <TableSelectCell value={row.fundingSource} options={fundingSourceOptions} onSelect={noop} />,
        // Uses the default size of \`m\`
      },
      {
        id: 'deliveryMethod',
        header: 'Delivery Method',
        cell: ({ row }) => (
          <TableSelectCell value={row.deliveryMethod} options={deliveryMethodOptions} onSelect={noop} />
        ),
        size: 's',
      },
      {
        id: 'scheduledDate',
        header: 'Deduction date',
        cell: ({ row }) => <TableDateCell placeholder="N/A" value={createDate(row.scheduledDate)} onSelect={noop} />,
        size: 's',
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
      },
    ],
    []
  );

  const tableProps = useTable({ ...args, data, columns, captionId, onRowClick: () => null });
  return (
    <Group variant="vertical">
      <Text id={captionId} as="h2" textStyle="body2Semi">
        {captionId}
      </Text>
      <Card paddingX="none" paddingY="none">
        <Table
          {...tableProps}
          mobileRowRenderer={(data) => (
            <Container paddingX="s">
              <span>{data.billDetails}</span>
              <br />
              <span>{data.amountToPay}</span>
            </Container>
          )}
        />
      </Card>
    </Group>
  );
};
