import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { screen, userEvent } from 'storybook/test';

import { Card } from '@/components/containers/cards/Card/Card';
import type { SelectableDropdownMenuItem } from '@/components/containers/menus/SelectableDropdownMenu/SelectableDropdownMenu.types';
import { fullScreenChromaticDecorator, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableCell } from '../TableCell/TableCell';
import { TableHeaderSelectCell } from '../TableHeaderSelectCell/TableHeaderSelectCell';

const options: SelectableDropdownMenuItem[] = [
  {
    value: 'bank',
    icon: 'bank',
    label: 'Bank account (free)',
  },
  {
    value: 'check',
    icon: 'chase',
    label: 'Bank account ...1234',
  },
];

const meta: Meta<typeof TableHeaderSelectCell> = {
  title: 'Table/Header Cells/Select Header Cell [pattern]',
  parameters: { docs: { source: { type: 'code' } } },
  component: TableHeaderSelectCell,
  argTypes: {
    options: {
      description: 'An array of the items in the dropdown menu.',
      table: {
        category: 'props',
        type: {
          summary: 'SelectableDropdownMenuItem[]',
          detail: '{ label: string; icon?: IconKey; image?: ImageIconProps; value: string}[]',
        },
      },
      type: { required: true, name: 'other', value: 'array' },
    },
    label: {
      control: 'text',
      description: 'The text of the header cell.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
      type: { required: true, name: 'string' },
    },
    footerAction: {
      control: 'object',
      description: 'The action that appears on the bottom of the dropdown',
      table: {
        category: 'props',
        type: {
          summary: 'DropdownSelectableFooterAction',
          detail: '{ label: string; onClick?: VoidFunction }',
        },
      },
    },
    onSelect: {
      control: false,
      description: 'The callback function for selecting an item.',
      table: {
        category: 'events',
        type: {
          summary: "(SelectableDropdownMenuItem['value']) => void",
        },
      },
      type: { required: true, name: 'function' },
    },
    value: {
      control: 'object',
      description: "The selected item's value.",
      table: {
        category: 'props',
        type: {
          summary: "SelectableDropdownMenuItem['value']",
        },
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
    label: 'Payment method',
    options,
    value: 'bank',
    description: undefined,
    tooltipLabel: undefined,
  },
};
export default meta;

type Entity = { id: string };

export const Main: StoryObj<typeof TableHeaderSelectCell> = {
  render: ({ value, ...args }) => {
    const [selectedValue, setSelectedValue] = useState<SelectableDropdownMenuItem['value'] | undefined>(value);

    const data: Entity[] = [{ id: '0' }];

    const columns: TableColumnDef<Entity>[] = [
      {
        id: 'header-select',
        header: <TableHeaderSelectCell {...args} onSelect={(value) => setSelectedValue(value)} value={selectedValue} />,
        cell: () => <TableCell placeholder="Choose payment method...">{selectedValue}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
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

export const WithoutValue: StoryObj<typeof TableHeaderSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<SelectableDropdownMenuItem['value']>();

    const data: Entity[] = [{ id: '0' }];

    const columns: TableColumnDef<Entity>[] = [
      {
        id: 'header-select',
        header: (
          <TableHeaderSelectCell
            {...args}
            label="Payment method"
            options={options}
            onSelect={(value) => setSelectedValue(value)}
          />
        ),
        cell: () => <TableCell placeholder="Choose payment method...">{selectedValue}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
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

export const WithFooterAction: StoryObj<typeof TableHeaderSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<SelectableDropdownMenuItem['value']>();

    const data: Entity[] = [{ id: '0' }];

    const columns: TableColumnDef<Entity>[] = [
      {
        id: 'header-select',
        header: (
          <TableHeaderSelectCell
            {...args}
            label="Payment method"
            options={options}
            onSelect={(value) => setSelectedValue(value)}
            footerAction={{ label: '+ Add payment method', onClick: noop }}
            data-testid="selectable-header"
          />
        ),
        cell: () => <TableCell placeholder="Choose payment method...">{selectedValue}</TableCell>,
      },
    ];

    const tableProps = useTable({ data, columns });
    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
  decorators: [fullScreenChromaticDecorator],
  parameters: {
    a11y: {
      // TODO: https://meliorisk.atlassian.net/browse/ME-109462 (aria-required-children, aria-required-parent, list)
      test: 'todo',
    },
  },
  play: async () => userEvent.click(screen.getByTestId('selectable-header')),
};

export const WithDescription: StoryObj<typeof TableHeaderSelectCell> = {
  render: ({ value }) => {
    const [selectedValue, setSelectedValue] = useState<SelectableDropdownMenuItem['value'] | undefined>(value);

    const data: Entity[] = [{ id: '0' }];

    const columns: TableColumnDef<Entity>[] = [
      {
        id: 'header-select',
        header: (
          <TableHeaderSelectCell
            label="Payment method"
            options={options}
            onSelect={(value) => setSelectedValue(value)}
            value={selectedValue}
            description="Description text"
          />
        ),
        cell: () => <TableCell placeholder="Choose payment method...">{selectedValue}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
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

export const WithTooltip: StoryObj<typeof TableHeaderSelectCell> = {
  render: ({ value }) => {
    const [selectedValue, setSelectedValue] = useState<SelectableDropdownMenuItem['value'] | undefined>(value);

    const data: Entity[] = [{ id: '0' }];

    const columns: TableColumnDef<Entity>[] = [
      {
        id: 'header-select',
        header: (
          <TableHeaderSelectCell
            label="Payment method"
            options={options}
            onSelect={(value) => setSelectedValue(value)}
            value={selectedValue}
            tooltipLabel="To show a tooltip simply use the tooltipLabel prop!"
          />
        ),
        cell: () => <TableCell placeholder="Choose payment method...">{selectedValue}</TableCell>,
        size: isUsingVisualTesting() ? 'l' : 'm',
      },
    ];

    const tableProps = useTable({ data, columns });
    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
  play: async () => userEvent.hover(screen.getByTestId('table-select-cell')),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
