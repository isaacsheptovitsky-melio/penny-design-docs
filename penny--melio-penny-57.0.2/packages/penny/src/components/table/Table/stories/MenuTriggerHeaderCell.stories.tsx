import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';

import { Card } from '@/components/containers/cards/Card/Card';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableCell } from '../TableCell/TableCell';
import { TableHeaderMenuTriggerCell } from '../TableHeaderMenuTriggerCell/TableHeaderMenuTriggerCell';

const meta: Meta<typeof TableHeaderMenuTriggerCell> = {
  title: 'Table/Header Cells/Menu Trigger Header Cell [pattern]',
  component: TableHeaderMenuTriggerCell,
  parameters: {
    docs: {
      description: {
        component: '**_internal_** - This cell should be used as a trigger for a menu inside a table header cell.',
      },
      source: { type: 'code' },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: "The trigger's label",
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: "The trigger's description",
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    onClick: {
      description: 'An event handler for when clicking the trigger cell.',
      table: { category: 'events' },
    },
    isMenuOpen: {
      description: 'If true, flips the arrow icon to indicate the menu is open.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    tooltipLabel: {
      control: 'text',
      description: 'The label of the tooltip.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    label: 'Selectable',
    onClick: noop,
    isMenuOpen: false,
    tooltipLabel: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof TableHeaderMenuTriggerCell> = {
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
        header: <TableHeaderMenuTriggerCell {...args} />,
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
        headerAriaLabel: 'Header custom aria label',
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

export const IsMenuOpen: StoryObj<typeof TableHeaderMenuTriggerCell> = {
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
        header: <TableHeaderMenuTriggerCell {...args} isMenuOpen />,
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
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

export const WithDescription: StoryObj<typeof TableHeaderMenuTriggerCell> = {
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
        header: <TableHeaderMenuTriggerCell {...args} description="Same date" />,
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });

    return (
      // `Card` can be replaced with any surface.
      <Card width="min-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const WithTooltip: StoryObj<typeof TableHeaderMenuTriggerCell> = {
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
          <TableHeaderMenuTriggerCell
            {...args}
            tooltipLabel="To show a tooltip simply wrap the header cell with our Tooltip component!"
          />
        ),
        cell: ({ row }) => <TableCell>{row.name}</TableCell>,
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
  play: async () => userEvent.hover(screen.getByRole('button')),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
