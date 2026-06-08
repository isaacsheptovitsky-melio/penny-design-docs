import { createDate } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent, within } from 'storybook/test';

import { Card } from '@/components/containers/cards/Card/Card';
import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';

import {
  actionsOptions,
  type BillInfo,
  data,
  deliveryMethodOptions,
  fundingSourceOptions,
  type PaymentIntent,
  subRowsdata,
  type SubRowsPaymentIntent,
} from '../__fixtures__/storybook-mock-data';
import { type TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableActionsCell } from '../TableActionsCell/TableActionsCell';
import { TableAmountCell } from '../TableAmountCell/TableAmountCell';
import { TableCell } from '../TableCell/TableCell';
import { TableDateCell } from '../TableDateCell/TableDateCell';
import { TableHeaderSelectCell } from '../TableHeaderSelectCell/TableHeaderSelectCell';
import { TableSelectCell } from '../TableSelectCell/TableSelectCell';

const columns: TableColumnDef<PaymentIntent>[] = [
  {
    id: 'billDetails',
    header: 'Vendor',
    cell: ({ row }) => <TableCell>{row.billDetails}</TableCell>,
    // Uses the default size of `m`
  },
  {
    id: 'fundingSource',
    header: <TableHeaderSelectCell label="Payment method" options={fundingSourceOptions} onSelect={() => null} />,
    cell: ({ row }) => (
      <TableSelectCell value={row.fundingSource} options={fundingSourceOptions} onSelect={() => null} />
    ),
    // Uses the default size of `m`
  },
  {
    id: 'deliveryMethod',
    header: 'Delivery Method',
    cell: ({ row }) => (
      <TableSelectCell value={row.deliveryMethod} options={deliveryMethodOptions} onSelect={() => null} />
    ),
    size: 's',
  },
  {
    id: 'scheduledDate',
    header: 'Deduction date',
    cell: ({ row }) => <TableDateCell placeholder="N/A" value={createDate(row.scheduledDate)} onSelect={() => null} />,
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
];

const _TableCell = ({ firstLine, secondLine }: { firstLine: string; secondLine?: BillInfo[] }) => (
  <TableCell>
    <Group width="full" variant="vertical" spacing="xxs">
      <Text textStyle="body3" color="semantic.text.primary">
        {firstLine}
      </Text>
      {secondLine && (
        <Text textStyle="body4" color="semantic.text.secondary">
          {secondLine.length} {secondLine.length === 1 ? 'bill' : 'bills'}
        </Text>
      )}
    </Group>
  </TableCell>
);

const meta: Meta<typeof useTable> = {
  title: 'Chromatic/Table',
  component: Table,
  args: {
    data: [],
    columns: [],
    meta: undefined,
    isLoading: false,
    hideHeaderWhileLoading: false,
    loadingRowIds: undefined,
    highlightedRowIds: [],
    onRowClick: undefined,
    disableAllRowsSelection: undefined,
    disableRowSelection: undefined,
    rowSelectionTooltips: undefined,
    defaultSelectedRows: undefined,
    selectedRows: undefined,
    setSelectedRows: undefined,
    onRowSelectionChange: undefined,
    onAllRowsSelectionChange: undefined,
    defaultExpandedRows: undefined,
    onRowExpandChange: undefined,
    headerVariant: 'light',
  },
};
export default meta;

export const RowSelection: StoryObj<typeof Table> = {
  render: (args) => {
    const tableProps = useTable({
      data,
      columns,
      disableRowSelection: (row) => row.amountToPay < 500,
      rowSelectionTooltips: {
        row: ({ rowData, isSelectionDisabled }) =>
          isSelectionDisabled
            ? {
                content: `This row cannot be selected because the amount to pay is $${rowData.amountToPay} which is less than the minimum of $500`,
              }
            : undefined,
      },
      defaultSelectedRows: { '1': true, '3': true },
      getRowSelectionAriaLabel: (row) => `Select ${row.billDetails}`,
      onRowSelectionChange: () => null,
      onAllRowsSelectionChange: () => null,
    });

    return (
      <Card paddingX="none" paddingY="none">
        <Table {...args} {...tableProps} />
      </Card>
    );
  },
  play: async () => {
    const cell = screen.getByTestId('table-selectable-row-4');
    await userEvent.hover(within(cell).getByRole('checkbox'));
  },
};

export const ExpandableWithRowsInLoadingState: StoryObj<typeof Table> = {
  render: (args) => {
    const columns: TableColumnDef<SubRowsPaymentIntent>[] = [
      {
        id: 'billDetails',
        header: 'Vendor',
        cell: ({ row }) => <_TableCell firstLine={row.billDetails} secondLine={row.subRows} />,
        subRowCell: ({ row }) => <TableCell>{row.billDetails}</TableCell>,
      },
      {
        id: 'fundingSource',
        header: <TableHeaderSelectCell label="Payment method" options={fundingSourceOptions} onSelect={() => null} />,
        cell: ({ row }) => (
          <TableSelectCell value={row.fundingSource} options={fundingSourceOptions} onSelect={() => null} />
        ),
      },
      {
        id: 'deliveryMethod',
        header: 'Delivery Method',
        cell: ({ row }) => (
          <TableSelectCell value={row.deliveryMethod} options={deliveryMethodOptions} onSelect={() => null} />
        ),
      },
      {
        id: 'scheduledDate',
        header: 'Deduction date',
        cell: ({ row }) => (
          <TableDateCell placeholder="N/A" value={createDate(row.scheduledDate)} onSelect={() => null} />
        ),
        subRowCell: ({ row }) => (
          <TableDateCell placeholder="N/A" value={createDate(row.scheduledDate)} onSelect={() => null} isReadOnly />
        ),
      },
      {
        id: 'amountToPay',
        header: 'Amount',
        cell: ({ row }) => <TableAmountCell value={row.amountToPay} />,
        subRowCell: ({ row }) => <TableAmountCell value={row.amountToPay} />,
        textAlign: 'end',
      },
    ];

    const tableProps = useTable({
      data: subRowsdata,
      columns,
      loadingRowIds: ['0', '1', '1.0', '1.1', '1.2', '2', '3'],
      defaultExpandedRows: { '1': true },
    });

    return (
      <Card paddingX="none" paddingY="none">
        <Table {...args} {...tableProps} />
      </Card>
    );
  },
};
