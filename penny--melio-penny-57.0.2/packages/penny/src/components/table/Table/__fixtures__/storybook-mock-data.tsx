import { createDate, noop } from '@melio/penny-utils';

import type { SelectableDropdownMenuItem } from '@/components/containers/menus/SelectableDropdownMenu/SelectableDropdownMenu.types';

import type { TableColumnDef, TableDataEntity } from '../hooks/types';
import { TableActionsCell } from '../TableActionsCell/TableActionsCell';
import { TableAmountCell } from '../TableAmountCell/TableAmountCell';
import { TableCell } from '../TableCell/TableCell';
import { TableDateCell } from '../TableDateCell/TableDateCell';
import { TableHeaderSelectCell } from '../TableHeaderSelectCell/TableHeaderSelectCell';
import { TableSelectCell } from '../TableSelectCell/TableSelectCell';

export const actionsOptions = [
  { label: 'action 1', onClick: noop },
  { label: 'action 2', onClick: noop },
  { label: 'action 3', onClick: noop },
];

export const deliveryMethodOptions = [
  {
    value: 'bank',
    label: 'Bank',
  },
  {
    value: 'check',
    label: 'Check',
  },
];

export const fundingSourceOptions: SelectableDropdownMenuItem[] = [
  {
    value: 'bank',
    icon: 'bank',
    label: 'Bank account (free)',
  },
  {
    value: 'chase',
    image: {
      src: '/assets/ChaseMini.svg',
      alt: 'Chase bank',
    },
    label: 'Bank account ...1234',
  },
];
export const columns: TableColumnDef<PaymentIntent>[] = [
  {
    id: 'billDetails',
    header: 'Vendor',
    isRowHeader: true,
    cell: ({ row }) => <TableCell>{row.billDetails}</TableCell>,
    // Uses the default size of `m`
  },
  {
    id: 'fundingSource',
    header: <TableHeaderSelectCell label="Payment method" options={fundingSourceOptions} onSelect={noop} />,
    cell: ({ row }) => <TableSelectCell value={row.fundingSource} options={fundingSourceOptions} onSelect={noop} />,
    // Uses the default size of `m`
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
  {
    id: 'actions',
    cell: () => <TableActionsCell options={actionsOptions} />,
    size: 'xs',
  },
];

export type PaymentIntent = TableDataEntity<{
  billDetails: string;
  fundingSource: string;
  deliveryMethod: string;
  scheduledDate: string;
  amountToPay: number;
}>;

export const data: PaymentIntent[] = [
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

// type for rows
type BasePaymentIntent = {
  billDetails: string;
  fundingSource: string;
  deliveryMethod: string;
  scheduledDate: string;
  amountToPay: number;
};

// different type for sub-rows
export type BillInfo = {
  billDetails: `invoice-${number}`;
  scheduledDate: string;
  amountToPay: number;
};

export type SubRowsPaymentIntent = TableDataEntity<BasePaymentIntent, BillInfo>;

export const subRowsdata: SubRowsPaymentIntent[] = [
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
    amountToPay: 3450,
    subRows: [
      {
        billDetails: 'invoice-1312',
        scheduledDate: '2022-12-20',
        amountToPay: 1020,
      },
      {
        billDetails: 'invoice-6763',
        scheduledDate: '2022-12-20',
        amountToPay: 1300,
      },
      {
        billDetails: 'invoice-9282',
        scheduledDate: '2022-12-20',
        amountToPay: 1130,
      },
    ],
  },
  {
    billDetails: 'Yellow Rock',
    fundingSource: 'chase',
    deliveryMethod: 'bank',
    scheduledDate: '2022-12-20',
    amountToPay: 880,
  },
  {
    billDetails: 'Green Horizon',
    fundingSource: 'chase',
    deliveryMethod: 'bank',
    scheduledDate: '2022-12-20',
    amountToPay: 345,
  },
];

export const smallData: PaymentIntent[] = data.slice(0, 1);

export const mediumData: PaymentIntent[] = data.slice(0, 6);
