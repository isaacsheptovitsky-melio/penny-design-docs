/* eslint-disable max-lines */
import { createDate, noop } from '@melio/penny-utils';
import { type Row, type RowSelectionState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden/VisuallyHidden';
import { Button } from '@/components/action/Button/Button';
import { IconButton } from '@/components/action/IconButton/IconButton';
import { Card } from '@/components/containers/cards/Card/Card';
import { Container } from '@/components/containers/Container/Container';
import { Group } from '@/components/containers/Group/Group';
import { FloatingMenuDropdownList } from '@/components/containers/menus/FloatingMenu/components/FloatingMenuDropdownList';
import { FloatingMenuItem } from '@/components/containers/menus/FloatingMenu/components/FloatingMenuItem';
import { FloatingMenu } from '@/components/containers/menus/FloatingMenu/FloatingMenu';
import { Text } from '@/components/dataDisplay/Text/Text';
import { Icon } from '@/components/foundations/Icon/Icon';

import {
  type BillInfo,
  columns,
  deliveryMethodOptions,
  fundingSourceOptions,
  mediumData,
  type PaymentIntent,
  subRowsdata,
  type SubRowsPaymentIntent,
} from '../../__fixtures__/storybook-mock-data';
import type { TableColumnDef, TableRowExpandedState, TableRowSelectionState, UseTableOptions } from '../../hooks/types';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';
import { TableAmountCell } from '../../TableAmountCell/TableAmountCell';
import { TableCell } from '../../TableCell/TableCell';
import { TableDateCell } from '../../TableDateCell/TableDateCell';
import { TableHeaderSelectCell } from '../../TableHeaderSelectCell/TableHeaderSelectCell';
import { TableSelectCell } from '../../TableSelectCell/TableSelectCell';

const rowSelectionAriaOptions: Pick<
  UseTableOptions<PaymentIntent>,
  'getRowSelectionAriaLabel' | 'allRowsSelectionAriaLabel'
> = {
  getRowSelectionAriaLabel: (row) => row.billDetails,
  allRowsSelectionAriaLabel: 'Select all',
};

export const ExpandedRowExample = () => {
  const TableExpandableCell = ({
    firstLine,
    secondLine,
    isHighlighted,
    subRows,
    getToggleExpandedHandler,
    getIsExpanded,
  }: {
    firstLine: string;
    secondLine?: BillInfo[];
    isHighlighted?: boolean;
    subRows?: Row<SubRowsPaymentIntent>[];
    getToggleExpandedHandler: () => () => void;
    getIsExpanded: () => boolean;
  }) => {
    const controls = subRows?.map((subRow) => subRow.id).join(' ');
    const toggle = getToggleExpandedHandler?.();
    const isExpanded = getIsExpanded?.();

    const getControls = () => {
      if (!controls || !isExpanded) {
        return undefined;
      }

      return controls;
    };

    return (
      <TableCell>
        <Group
          width="full"
          variant="vertical"
          spacing="xxs"
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          aria-controls={getControls()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
              e.preventDefault();
              toggle();
            }
          }}
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          <Text textStyle="body3" color="semantic.text.primary">
            {firstLine}
          </Text>
          {secondLine && (
            <Text textStyle="body4" color={isHighlighted ? 'semantic.text.primary' : 'semantic.text.secondary'}>
              {secondLine.length} {secondLine.length === 1 ? 'bill' : 'bills'}
            </Text>
          )}
        </Group>
      </TableCell>
    );
  };
  // Note that `columns` must be memoized!
  const columns: TableColumnDef<SubRowsPaymentIntent>[] = useMemo(
    () => [
      {
        id: 'billDetails',
        header: 'Vendor',
        isRowHeader: true,
        cell: ({ row, subRows, getToggleExpandedHandler, getIsExpanded }) => (
          <TableExpandableCell
            firstLine={row.billDetails}
            secondLine={row.subRows}
            subRows={subRows}
            getToggleExpandedHandler={getToggleExpandedHandler}
            getIsExpanded={getIsExpanded}
          />
        ),
        subRowCell: ({ row, parentId }) => (
          <TableCell>
            {row.billDetails}
            {parentId && <VisuallyHidden>{subRowsdata[Number(parentId)]?.billDetails}</VisuallyHidden>}
          </TableCell>
        ),
      },
      {
        id: 'fundingSource',
        header: <TableHeaderSelectCell label="Payment method" options={fundingSourceOptions} onSelect={noop} />,
        cell: ({ row }) => <TableSelectCell value={row.fundingSource} options={fundingSourceOptions} onSelect={noop} />,
      },
      {
        id: 'deliveryMethod',
        header: 'Delivery Method',
        cell: ({ row }) => (
          <TableSelectCell value={row.deliveryMethod} options={deliveryMethodOptions} onSelect={noop} />
        ),
      },
      {
        id: 'scheduledDate',
        header: 'Deduction date',
        cell: ({ row }) => <TableDateCell placeholder="N/A" value={createDate(row.scheduledDate)} onSelect={noop} />,
        subRowCell: ({ row }) => (
          <TableDateCell placeholder="N/A" value={createDate(row.scheduledDate)} onSelect={noop} isReadOnly />
        ),
      },
      {
        id: 'amountToPay',
        header: 'Amount',
        cell: ({ row }) => <TableAmountCell value={row.amountToPay} />,
        subRowCell: ({ row }) => <TableAmountCell value={row.amountToPay} />,
        textAlign: 'end',
      },
    ],
    []
  );

  const [rowExpandedState, setRowExpandedState] = useState<TableRowExpandedState>();

  const tableProps = useTable({
    data: subRowsdata,
    columns,
    defaultExpandedRows: { '1': true },
    onRowExpandChange: setRowExpandedState,
  });

  return (
    <Group variant="vertical">
      <Card paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
      <Storybook.Code label={`Last \`onRowExpandChange\` param: ${JSON.stringify(rowExpandedState)}`} />
    </Group>
  );
};

export const HighlightedRowExample = () => {
  const _TableCell = ({
    firstLine,
    secondLine,
    subRows,
    isHighlighted,
    getToggleExpandedHandler,
    getIsExpanded,
  }: {
    firstLine: string;
    secondLine?: BillInfo[];
    subRows?: Row<SubRowsPaymentIntent>[];
    getToggleExpandedHandler: () => () => void;
    getIsExpanded: () => boolean;
    isHighlighted?: boolean;
  }) => {
    const controls = subRows?.map((subRow) => subRow.id).join(' ');
    const toggle = getToggleExpandedHandler?.();
    const isExpanded = getIsExpanded?.();

    const getControls = () => {
      if (!controls || !isExpanded) {
        return undefined;
      }

      return controls;
    };

    return (
      <TableCell>
        <Group
          width="full"
          variant="vertical"
          spacing="xxs"
          role="button"
          aria-expanded={isExpanded}
          aria-controls={getControls()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
              e.preventDefault();
              toggle();
            }
          }}
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          <Text textStyle="body3" color="semantic.text.primary">
            {firstLine}
          </Text>
          {secondLine && (
            <Text textStyle="body4" color={isHighlighted ? 'semantic.text.primary' : 'semantic.text.secondary'}>
              {secondLine.length} {secondLine.length === 1 ? 'bill' : 'bills'}
            </Text>
          )}
        </Group>
      </TableCell>
    );
  };
  // TODO: add this context to CellRenderer
  // https://meliorisk.atlassian.net/browse/ME-57069
  function isRowHighlighted(data: SubRowsPaymentIntent[], row: SubRowsPaymentIntent, highlightedIds: string[]) {
    if (!highlightedIds) return false;

    const rowIndex = data.map(({ billDetails }) => billDetails).indexOf(row.billDetails);

    if (!rowIndex) return false;

    return highlightedIds.includes(rowIndex.toString());
  }

  const columns: TableColumnDef<SubRowsPaymentIntent>[] = [
    {
      id: 'billDetails',
      header: 'Vendor',
      isRowHeader: true,
      cell: ({ row, subRows, getToggleExpandedHandler, getIsExpanded }) => (
        <_TableCell
          firstLine={row.billDetails}
          secondLine={row.subRows}
          subRows={subRows}
          isHighlighted={isRowHighlighted(subRowsdata, row, highlightedRowIds)}
          getToggleExpandedHandler={getToggleExpandedHandler}
          getIsExpanded={getIsExpanded}
        />
      ),
      subRowCell: ({ row }) => <TableCell>{row.billDetails}</TableCell>,
    },
    {
      id: 'fundingSource',
      header: <TableHeaderSelectCell label="Payment method" options={fundingSourceOptions} onSelect={noop} />,
      cell: ({ row }) => <TableSelectCell value={row.fundingSource} options={fundingSourceOptions} onSelect={noop} />,
    },
  ];

  const [highlightedRowIds, setHighlightedRowIds] = useState(['1', '1.0', '1.1', '1.2', '3']);

  const handleToggle = () => {
    setHighlightedRowIds(highlightedRowIds.length ? [] : ['1', '1.0', '1.1', '1.2', '3']);
  };

  const tableProps = useTable({
    data: subRowsdata,
    columns,
    defaultExpandedRows: { '1': true },
    highlightedRowIds,
  });

  return (
    <Group variant="vertical" spacing="l">
      <Card paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
      <Container width="fit-content">
        <Button label="Toggle Highlight" onClick={handleToggle} />
      </Container>
    </Group>
  );
};

export const RowSelectionTooltipReplacementExample = () => {
  const [rowSelectionState, setRowSelectionState] = useState<TableRowSelectionState<PaymentIntent>>();
  const [areAllSelected, setAreAllSelected] = useState<boolean>();

  const columnsNew: TableColumnDef<PaymentIntent>[] = [
    {
      id: 'billDetails',
      header: 'Vendor',
      isRowHeader: true,
      cell: ({ row, rowIndex }) => (
        <TableCell>
          <Group variant="vertical" spacing="xxs" id={`selection-billDetails-info-${rowIndex}`}>
            <Text>{row.billDetails}</Text>
            <Group alignItems="center" spacing="s">
              {row.amountToPay < 1300 && <VisuallyHidden>This row cannot be selected</VisuallyHidden>}
              <Icon type="info" size="small" />
              <Text color="semantic.text.secondary" textStyle="body4">
                {row.amountToPay < 1300
                  ? `Amount to pay is ${row.amountToPay}$ which is less than the minimum of $1300`
                  : `Amount to pay is ${row.amountToPay}$`}
              </Text>
            </Group>
          </Group>
        </TableCell>
      ),
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
  ];

  const tableProps = useTable({
    data: mediumData,
    columns: columnsNew,
    disableRowSelection: (row) => row.amountToPay < 1300,
    allRowsSelectionAriaLabel: 'Select all',
    rowSelectionTooltips: {
      header: { content: 'Select all vendors' },
    },
    getRowSelectionAriaLabel: (row) => `Vendor ${row.billDetails}`,
    getRowSelectionAriaLabelledBy: (row) => `selection-billDetails-info-${row.index}`,
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

export const HeaderSelectableCellRightElementExample = () => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const [, setRowSelectionState] = useState<TableRowSelectionState<PaymentIntent>>();
  const [isHeaderSelectableCellMenuOpen, setIsHeaderSelectableCellMenuOpen] = useState(false);

  const tableProps = useTable({
    data: mediumData,
    columns,
    selectedRows,
    setSelectedRows,
    renderRowSelectionHeaderRightElement: ({ table }) => (
      <FloatingMenu
        isOpen={isHeaderSelectableCellMenuOpen}
        onOpenChange={setIsHeaderSelectableCellMenuOpen}
        trigger={<IconButton icon="caret-down" size="extra-small" variant="naked" aria-label="Row selection options" />}
        content={
          <FloatingMenuDropdownList paddingY="xs">
            <FloatingMenuItem
              onClick={() => {
                setIsHeaderSelectableCellMenuOpen(false);
                table.toggleAllRowsSelected(true);
              }}
            >
              Select all (50)
            </FloatingMenuItem>

            <FloatingMenuItem
              onClick={() => {
                setIsHeaderSelectableCellMenuOpen(false);
                table.toggleAllPageRowsSelected(true);
              }}
            >
              Select visible
            </FloatingMenuItem>
          </FloatingMenuDropdownList>
        }
      />
    ),
    onRowSelectionChange: setRowSelectionState,
    ...rowSelectionAriaOptions,
  });

  return (
    <Group variant="vertical">
      <Card paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>

      <Storybook.Code label={`selectedRows: ${JSON.stringify(selectedRows)}`} />
    </Group>
  );
};
