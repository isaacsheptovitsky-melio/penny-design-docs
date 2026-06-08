import { noop } from '@melio/penny-utils';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Button } from '@/components/action/Button/Button';
import { Card } from '@/components/containers/cards/Card/Card';
import { Group } from '@/components/containers/Group/Group';

import { columns, data, mediumData, type PaymentIntent, smallData } from '../../__fixtures__/storybook-mock-data';
import type { TableRowSelectionState, UseTableOptions } from '../../hooks/types';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';

const rowSelectionAriaOptions: Pick<
  UseTableOptions<PaymentIntent>,
  'getRowSelectionAriaLabel' | 'allRowsSelectionAriaLabel'
> = {
  getRowSelectionAriaLabel: (row) => row.billDetails,
  allRowsSelectionAriaLabel: 'Select all',
};

export const LoadingRowIdsExample = () => {
  const tableProps = useTable({ data: mediumData, columns, loadingRowIds: ['0', '2', '4'] });

  return (
    <Card paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};

export const RowSelectionExample = () => {
  const [rowSelectionState, setRowSelectionState] = useState<TableRowSelectionState<PaymentIntent>>();
  const [areAllSelected, setAreAllSelected] = useState<boolean>();
  const [buttonLabel, setButtonLabel] = useState<string>('Review and pay');

  const tableProps = useTable({
    data: smallData,
    columns,
    onRowSelectionChange: setRowSelectionState,
    onAllRowsSelectionChange: setAreAllSelected,
    allRowsSelectionAriaLabel: 'Select all vendors',
    getRowSelectionAriaLabel: (row) => 'Vendor ' + row.billDetails,
  });

  return (
    <Group variant="vertical">
      <Card paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
      <Storybook.Code label={`Last \`onRowSelectionChange\` param: ${JSON.stringify(rowSelectionState)}`} />
      <Storybook.Code label={`Last \`onAllRowsSelectionChange\` param: ${JSON.stringify(areAllSelected)}`} />
      <Group variant="vertical" alignItems="flex-start">
        <Button id="review-and-pay" label={buttonLabel} onClick={() => setButtonLabel('You clicked me!')} />
      </Group>
    </Group>
  );
};

export const DefaultRowSelectionExample = () => {
  const [rowSelectionState, setRowSelectionState] = useState<TableRowSelectionState<PaymentIntent>>();
  const [areAllSelected, setAreAllSelected] = useState<boolean>();

  const tableProps = useTable({
    data: mediumData,
    columns,
    defaultSelectedRows: { '1': true, '3': true },
    onRowSelectionChange: setRowSelectionState,
    onAllRowsSelectionChange: setAreAllSelected,
    ...rowSelectionAriaOptions,
  });

  return (
    <Group variant="vertical">
      <Card paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
      <Storybook.Code label={`Last \`onRowSelectionChange\` param: ${JSON.stringify(rowSelectionState)}`} />
      <Storybook.Code label={`Last \`onAllRowsSelectionChange\` param: ${JSON.stringify(areAllSelected)}`} />
    </Group>
  );
};

export const DisabledRowSelectionExample = () => {
  const [rowSelectionState, setRowSelectionState] = useState<TableRowSelectionState<PaymentIntent>>();
  const [areAllSelected, setAreAllSelected] = useState<boolean>();

  const tableProps = useTable({
    data: mediumData,
    columns,
    disableRowSelection: (row) => row.amountToPay < 700,
    onRowSelectionChange: setRowSelectionState,
    onAllRowsSelectionChange: setAreAllSelected,
    ...rowSelectionAriaOptions,
  });

  return (
    <Group variant="vertical">
      <Card paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
      <Storybook.Code label={`Last \`onRowSelectionChange\` param: ${JSON.stringify(rowSelectionState)}`} />
      <Storybook.Code label={`Last \`onAllRowsSelectionChange\` param: ${JSON.stringify(areAllSelected)}`} />
    </Group>
  );
};

export const DisableAllRowSelectionExample = () => {
  const tableProps = useTable({
    data: mediumData,
    columns,
    disableAllRowsSelection: true,
    onRowSelectionChange: noop,
    onAllRowsSelectionChange: noop,
    ...rowSelectionAriaOptions,
  });

  return (
    <Card paddingX="none" paddingY="none">
      <Table {...tableProps} />
    </Card>
  );
};

export const RowSelectionTooltipsExample = () => {
  const [rowSelectionState, setRowSelectionState] = useState<TableRowSelectionState<PaymentIntent>>();
  const [areAllSelected, setAreAllSelected] = useState<boolean>();

  const tableProps = useTable({
    data: smallData,
    columns,
    disableRowSelection: (row) => row.amountToPay < 1300,
    rowSelectionTooltips: {
      header: { content: 'Select all' },
      row: ({ rowData, isSelectionDisabled }) =>
        isSelectionDisabled
          ? {
              content: `This row cannot be selected because the amount to pay is $${rowData.amountToPay} which is less than the minimum of $1300`,
            }
          : undefined,
    },
    onRowSelectionChange: setRowSelectionState,
    onAllRowsSelectionChange: setAreAllSelected,
    ...rowSelectionAriaOptions,
  });

  return (
    <Group variant="vertical">
      <Card paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
      <Storybook.Code label={`Last \`onRowSelectionChange\` param: ${JSON.stringify(rowSelectionState)}`} />
      <Storybook.Code label={`Last \`onAllRowsSelectionChange\` param: ${JSON.stringify(areAllSelected)}`} />
    </Group>
  );
};

export const ControlledRowSelectionExample = () => {
  const [selectedRows, setSelectedRows] = useState({});

  const handleSelectAllRows = () => {
    // If you provide ids in your data then `allRowsSelected` would look like so:
    // data.reduce((acc, cur) => ({ ...acc, [cur.id]: true }), {});
    // Here we are using the default row-ids provided which are simple indexes:
    const allRowsSelected = data.reduce((acc, _cur, idx) => ({ ...acc, [idx]: true }), {});
    setSelectedRows(allRowsSelected);
  };

  const [rowSelectionState, setRowSelectionState] = useState<TableRowSelectionState<PaymentIntent>>();
  const [areAllSelected, setAreAllSelected] = useState<boolean>();

  const tableProps = useTable({
    data: mediumData,
    columns,
    selectedRows,
    setSelectedRows,
    onRowSelectionChange: setRowSelectionState,
    onAllRowsSelectionChange: setAreAllSelected,
    ...rowSelectionAriaOptions,
  });

  return (
    <Group variant="vertical">
      <Card paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
      <Group>
        <Button label="Select All Rows" onClick={handleSelectAllRows} />
        <Button label="Deselect All Rows" onClick={() => setSelectedRows({})} />
      </Group>
      <Storybook.Code label={`Last \`onRowSelectionChange\` param: ${JSON.stringify(rowSelectionState)}`} />
      <Storybook.Code label={`Last \`onAllRowsSelectionChange\` param: ${JSON.stringify(areAllSelected)}`} />
    </Group>
  );
};
