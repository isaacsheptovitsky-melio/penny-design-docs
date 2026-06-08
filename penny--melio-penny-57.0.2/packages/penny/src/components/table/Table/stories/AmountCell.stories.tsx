import { Box } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from '@/components/containers/cards/Card/Card';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableAmountCell } from '../TableAmountCell/TableAmountCell';

const meta: Meta<typeof TableAmountCell> = {
  title: 'Table/Row Cells/Amount Cell [pattern]',
  component: TableAmountCell,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    value: {
      description: 'The amount to display.',
      control: 'number',
      table: {
        type: { summary: 'number' },
        category: 'props',
      },
    },
    additionalAmount: {
      description: 'The additional amount to display and an optional tooltip.',
      control: 'object',
      table: {
        type: {
          summary: "{ amount: number; tooltip?: Pick<TooltipProps, 'content'> }",
        },
        category: 'props',
      },
    },
    currency: {
      control: 'inline-radio',
      options: ['USD'],
      description: 'Sets the currency type of the cell.',
      table: {
        defaultValue: { summary: 'USD' },
        type: { summary: 'USD' },
        category: 'props',
      },
    },
    isDisabled: {
      description: 'Determines if the cell is disabled.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
  },
  args: {
    value: 100,
    currency: 'USD',
    isDisabled: false,
    additionalAmount: { amount: 15 },
  },
};
export default meta;

export const Main: StoryObj<typeof TableAmountCell> = {
  render: (args) => {
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'amount',
        header: 'Amount',
        cell: () => <TableAmountCell {...args} />,
        textAlign: 'end',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      // `Card` can be replaced with any surface.
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const NoAdditionalAmount: StoryObj<typeof TableAmountCell> = {
  render: ({ additionalAmount, ...rest }) => {
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'amount',
        header: 'Amount',
        cell: () => <TableAmountCell {...rest} currency="USD" />,
        textAlign: 'end',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
      {
        id: 'additional amount',
        header: 'Additional amount',
        cell: () => (
          <TableAmountCell
            {...rest}
            currency="USD"
            additionalAmount={{ amount: 0, tooltip: { content: 'No additional amount' } }}
          />
        ),
        textAlign: 'end',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      // `Card` can be replaced with any surface.
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const Placeholder: StoryObj<typeof TableAmountCell> = {
  render: () => {
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'amount',
        header: 'Amount',
        cell: () => <TableAmountCell />,
        textAlign: 'end',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      // `Card` can be replaced with any surface.
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const Disabled: StoryObj<typeof TableAmountCell> = {
  render: (args) => {
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'amount',
        header: 'Amount',
        cell: () => <TableAmountCell {...args} currency="USD" isDisabled />,
        textAlign: 'end',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      // `Card` can be replaced with any surface.
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const WithTooltip: StoryObj<typeof TableAmountCell> = {
  render: (args) => {
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'amount',
        header: 'Amount',
        cell: () => (
          <TableAmountCell
            {...args}
            additionalAmount={{
              amount: 15,
              tooltip: {
                content: (
                  <>
                    <Box as="span" display="inline-flex" textStyle="body4Semi">
                      Extra fee is necessary
                    </Box>
                    Additional amount
                  </>
                ),
              },
            }}
            currency="USD"
          />
        ),
        textAlign: 'end',
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      // `Card` can be replaced with any surface.
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};
