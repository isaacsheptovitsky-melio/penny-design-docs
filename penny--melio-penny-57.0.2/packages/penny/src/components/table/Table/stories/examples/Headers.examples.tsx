import { createDate, noop } from '@melio/penny-utils';

import { Card } from '@/components/containers/cards/Card/Card';
import { Container } from '@/components/containers/Container/Container';
import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';

import {
  actionsOptions,
  columns,
  data,
  deliveryMethodOptions,
  fundingSourceOptions,
  type PaymentIntent,
  smallData,
} from '../../__fixtures__/storybook-mock-data';
import type { TableColumnDef, UseTableOptions } from '../../hooks/types';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';
import { TableActionsCell } from '../../TableActionsCell/TableActionsCell';
import { TableAmountCell } from '../../TableAmountCell/TableAmountCell';
import { TableCell } from '../../TableCell/TableCell';
import { TableDateCell } from '../../TableDateCell/TableDateCell';
import { TableHeaderCell } from '../../TableHeaderCell/TableHeaderCell';
import { TableHeaderCellDescription } from '../../TableHeaderCellDescription/TableHeaderCellDescription';
import { TableHeaderSelectCell } from '../../TableHeaderSelectCell/TableHeaderSelectCell';
import { TableSelectCell } from '../../TableSelectCell/TableSelectCell';

export const HeaderWithDescriptionExample = () => {
  const columns: TableColumnDef<PaymentIntent>[] = [
    {
      id: 'billDetails',
      header: 'Vendor',
      isRowHeader: true,
      cell: ({ row }) => <TableCell>{row.billDetails}</TableCell>,
    },
    {
      id: 'fundingSource',
      header: (
        <TableHeaderSelectCell
          label="Payment method"
          options={fundingSourceOptions}
          onSelect={noop}
          description="Multiple"
        />
      ),
      cell: ({ row }) => <TableSelectCell value={row.fundingSource} options={fundingSourceOptions} onSelect={noop} />,
    },
    {
      id: 'deliveryMethod',
      header: 'Delivery Method',
      cell: ({ row }) => <TableSelectCell value={row.deliveryMethod} options={deliveryMethodOptions} onSelect={noop} />,
    },
    {
      id: 'scheduledDate',
      header: (
        <TableHeaderCell>
          <Group width="full" variant="vertical" spacing="xxs">
            <Text textStyle="body4Semi">Deduction date</Text>
            <TableHeaderCellDescription text="Dec 20, 2022" />
          </Group>
        </TableHeaderCell>
      ),
      cell: ({ row }) => <TableDateCell placeholder="N/A" value={createDate(row.scheduledDate)} onSelect={noop} />,
    },
    {
      id: 'amountToPay',
      header: 'Amount',
      cell: ({ row }) => <TableAmountCell value={row.amountToPay} />,
      textAlign: 'end',
    },
    {
      id: 'actions',
      cell: () => <TableActionsCell options={actionsOptions} />,
      size: 'xs',
    },
  ];

  const tableProps = useTable({ data: smallData, columns });

  return (
    <Card paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};

export const WithStickyHeaderExample = (args: Partial<UseTableOptions<PaymentIntent>>) => {
  {
    const tableProps = useTable({ ...args, isHeaderSticky: true, data, columns });

    return (
      <Container overflow="initial">
        <Table {...tableProps} />
      </Container>
    );
  }
};
