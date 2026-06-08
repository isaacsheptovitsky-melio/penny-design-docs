import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from '@/components/containers/cards/Card/Card';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableActionsCell } from '../TableActionsCell/TableActionsCell';

const meta: Meta<typeof TableActionsCell> = {
  title: 'Table/Row Cells/Actions Cell [pattern]',
  component: TableActionsCell,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    options: {
      description: 'An array of the options in the dropdown menu.',
      table: {
        category: 'props',
        type: {
          detail: '{ label: string, variant?: "default" | "critical", onClick: VoidFunction }[]',
          summary: 'ActionsDropdownMenuItemProps[]',
        },
      },
    },
    isLoading: {
      description: 'Determines if the cell is loading - (controlled by the Table component).',
      control: false,
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Sets the cell as disabled.',
      table: {
        category: 'props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'The aria-label for the menu trigger, used for the screen reader to announce.',
      table: {
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
  },
  args: {
    options: [
      /*eslint no-alert:*/
      { label: 'action 1', onClick: () => alert('action 1') },
      { label: 'action 2', onClick: () => alert('action 2') },
      { label: 'action 3', onClick: () => alert('action 3') },
    ],
    'aria-label': undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof TableActionsCell> = {
  render: (args) => {
    const data: { id: string }[] = [
      {
        id: '0',
      },
    ];

    const columns: TableColumnDef<{ id: string }>[] = [
      {
        id: 'action',
        cell: () => <TableActionsCell {...args} />,
        size: 'xs',
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

export const Disabeld: StoryObj<typeof TableActionsCell> = {
  render: ({ options, ...args }) => {
    const data: { id: string }[] = [
      {
        id: '0',
      },
    ];

    const columns: TableColumnDef<{ id: string }>[] = [
      {
        id: 'action',
        cell: () => <TableActionsCell {...args} options={options} isDisabled />,
        size: 'xs',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const LoadingState: StoryObj<typeof TableActionsCell> = {
  render: ({ options, ...args }) => {
    const data: { id: string }[] = [
      {
        id: '0',
      },
    ];

    const columns: TableColumnDef<{ id: string }>[] = [
      {
        id: 'action',
        cell: () => <TableActionsCell {...args} options={options} />,
        size: 'xs',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} loadingRowIds={['0']} />
      </Card>
    );
  },
};
