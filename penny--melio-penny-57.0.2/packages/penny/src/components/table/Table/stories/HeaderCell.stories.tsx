import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from '@/components/containers/cards/Card/Card';
import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { type ColTextAlign } from '../Table.types';
import { TableCell } from '../TableCell/TableCell';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';
import { TableHeaderCellDescription } from '../TableHeaderCellDescription/TableHeaderCellDescription';

const meta: Meta<typeof TableHeaderCell> = {
  title: 'Table/Header Cells/Header Cell',
  component: TableHeaderCell,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    children: {
      control: false,
      description: 'The content of the header cell.',
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
      },
    },
    textAlign: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Sets the text alignment in the header cell.',
      table: {
        defaultValue: { summary: 'start' },
        type: { summary: 'start | end' },
        category: 'props',
      },
    },
    onClick: {
      description: 'An event handler for when clicking the header cell.',
      table: { category: 'events' },
    },
  },
  args: {
    children: 'Name',
    textAlign: 'start',
    onClick: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof TableHeaderCell> = {
  render: (args) => {
    const data: { id: string; name: string }[] = [
      {
        id: '0',
        name: 'simone',
      },
    ];

    const columns: TableColumnDef<{ name: string }>[] = [
      {
        id: 'name',
        header: <TableHeaderCell {...args} />,
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        textAlign: args['textAlign'] as ColTextAlign,
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

export const TextAlignEnd: StoryObj<typeof TableHeaderCell> = {
  render: (args) => {
    const data: { id: string; name: string }[] = [
      {
        id: '0',
        name: 'simone',
      },
    ];

    const columns: TableColumnDef<{ name: string }>[] = [
      {
        id: 'name',
        header: <TableHeaderCell {...args} textAlign="end" />,
        cell: ({ row }) => <TableCell textAlign="end">{row.name}</TableCell>,
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

export const Clickable: StoryObj<typeof TableHeaderCell> = {
  render: (args) => {
    const data: { id: string; name: string }[] = [
      {
        id: '0',
        name: 'simone',
      },
    ];

    const columns: TableColumnDef<{ name: string }>[] = [
      {
        id: 'name',
        header: <TableHeaderCell {...args} onClick={() => null} />,
        cell: ({ row }) => <TableCell onClick={() => null}>{row.name}</TableCell>,
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
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const WithDescription: StoryObj<typeof TableHeaderCell> = {
  render: (args) => {
    const data: { id: string; name: string }[] = [
      {
        id: '0',
        name: 'simone',
      },
    ];

    const columns: TableColumnDef<{ name: string }>[] = [
      {
        id: 'name',
        header: (
          <TableHeaderCell {...args}>
            <Group width="full" variant="vertical" spacing="xxs">
              <Text textStyle="body3Semi">Text</Text>
              <TableHeaderCellDescription text="Description text" />
            </Group>
          </TableHeaderCell>
        ),
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        textAlign: 'start',
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
