import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from '@/components/containers/cards/Card/Card';
import { Group } from '@/components/containers/Group/Group';
import { Pill } from '@/components/dataDisplay/Pill/Pill';
import { Text } from '@/components/dataDisplay/Text/Text';
import { Icon } from '@/components/foundations/Icon/Icon';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableCell } from '../TableCell/TableCell';

const meta: Meta<typeof TableCell> = {
  title: 'Table/Row Cells/Cell',
  component: TableCell,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    children: {
      control: false,
      description: 'The content of the cell.',
      table: {
        type: { summary: 'ReactNode' },
        category: 'props',
      },
    },
    placeholder: {
      description: 'Text to display if children are not passed.',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    textAlign: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Sets the text alignment in the cell.',
      table: {
        defaultValue: { summary: 'start' },
        type: { summary: 'start | end' },
        category: 'props',
      },
    },
    isDisabled: {
      description: 'Determines if the cell is disabled.<br />**Note that the content should be handled separately.**',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    onClick: {
      control: false,
      description: 'An event handler for when clicking the cell.',
      table: { category: 'events' },
    },
  },
  args: {
    children: 'Text',
    placeholder: 'Placeholder',
    textAlign: 'start',
    isDisabled: false,
    onClick: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof TableCell> = {
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
        header: 'Name',
        cell: () => <TableCell {...args} />,
        textAlign: args.textAlign,
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

export const Placeholder: StoryObj<typeof TableCell> = {
  render: () => {
    const data: { id: string; name: string }[] = [
      {
        id: '0',
        name: 'simone',
      },
    ];

    const columns: TableColumnDef<{ name: string }>[] = [
      {
        id: 'name',
        header: 'Name',
        cell: () => <TableCell placeholder="Placeholder" />,
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

export const TextAlignEnd: StoryObj<typeof TableCell> = {
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
        header: 'Name',
        cell: () => <TableCell {...args} textAlign="end" />,
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

export const WithFreeContent: StoryObj<typeof TableCell> = {
  render: (args) => {
    const data: { id: string; name: string; city: string; state: string }[] = [
      {
        id: '0',
        name: 'simone',
        city: 'lod',
        state: 'israel',
      },
    ];

    const columns: TableColumnDef<{ name: string; city: string; state: string }>[] = [
      {
        id: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <TableCell {...args}>
            <Group spacing="xs" alignItems="center">
              <Icon type="bank" size="small" color="default" />
              {row.name}
            </Group>
          </TableCell>
        ),
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
      {
        id: 'city',
        header: 'City',
        cell: ({ row }) => (
          <TableCell {...args}>
            <Group spacing="xs" alignItems="center">
              {row.city}
              <Pill type="secondary" status="warning" label="Recommended" />
            </Group>
          </TableCell>
        ),
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
      {
        id: 'state',
        header: 'State',
        cell: ({ row }) => (
          <TableCell {...args}>
            <Group spacing="xxs" variant="vertical">
              {row.state}
              <Text textStyle="body4" color="semantic.text.secondary">
                base country
              </Text>
            </Group>
          </TableCell>
        ),
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

export const Clickable: StoryObj<typeof TableCell> = {
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
        header: 'Name',
        cell: () => <TableCell {...args} onClick={() => null} />,
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

export const Disabled: StoryObj<typeof TableCell> = {
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
        header: 'Name',
        cell: ({ row }) => (
          <TableCell {...args} onClick={() => null} isDisabled>
            <Group spacing="xs" alignItems="center">
              <Text color="semantic.text.disabled" textStyle="body3">
                {row.name}
              </Text>
              <Pill type="secondary" status="warning" label="Recommended" isDisabled />
            </Group>
          </TableCell>
        ),
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
