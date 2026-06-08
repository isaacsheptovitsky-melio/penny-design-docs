import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { screen, userEvent } from 'storybook/test';

import { Button } from '@/components/action/Button/Button';
import { Card } from '@/components/containers/cards/Card/Card';
import type { SelectableDropdownMenuItem } from '@/components/containers/menus/SelectableDropdownMenu/SelectableDropdownMenu.types';
import { isUsingVisualTesting } from '@/test-utils/storybook.utils';

import type { TableColumnDef } from '../hooks/types';
import { useTable } from '../hooks/useTable';
import { Table } from '../Table';
import { TableSelectCell } from '../TableSelectCell/TableSelectCell';

const popoverPropsType = `{
  description: string;
  actionRenderer: (props) => ReactNode;
  'data-testid'?: string;
}`;

const tooltipPropsType = `{
  content: ReactNode;
  shouldAddTriggerFocus?: boolean;
  triggerAriaLabel?: string;
}`;

const addButton = { text: '+ Add payment method', onClick: noop };

const items: SelectableDropdownMenuItem[] = [
  {
    value: 'id-1',
    icon: 'bank',
    label: 'label 1',
  },
  {
    value: 'id-2',
    image: {
      src: '/assets/ChaseMini.svg',
      alt: 'Chase bank',
    },
    label: 'label 2',
  },
];

const meta: Meta<typeof TableSelectCell> = {
  title: 'Table/Row Cells/Select Cell [pattern]',
  parameters: { docs: { source: { type: 'code' } } },
  component: TableSelectCell,
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
    },
    optionsToDisplayOnSelect: {
      control: 'object',
      description: 'An array of the items that will be displayed in the cell on select.',
      table: {
        category: 'props',
        type: {
          summary: 'SelectableDropdownMenuItem[]',
          detail: '{ label: string; icon?: IconKey; image?: ImageProps; value: string}[]',
        },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The text that is shown when options are passed but no value is passed.',
      table: {
        category: 'props',
        type: { summary: 'string' },
      },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Sets the cell as read-only.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Sets the cell as invalid.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    tooltipProps: {
      control: 'object',
      description: 'Sets a tooltip message.<br />**Displayed only in invalid state.**',
      table: {
        type: { summary: 'TooltipProps', detail: tooltipPropsType },
        category: 'props',
      },
    },
    popoverProps: {
      control: 'object',
      description: 'Sets a popover message.<br />**Displayed only in invalid state.**',
      table: {
        type: { summary: 'PopoverProps', detail: popoverPropsType },
        category: 'props',
      },
    },
    addButton: {
      description: 'An action for when there are no items to select from.',
      table: {
        category: 'props',
        type: {
          summary: '{ text: string; onClick: () => void }',
        },
      },
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
  },
  args: {
    placeholder: 'Choose payment method...',
    options: items,
    value: 'id-2',
    isReadOnly: false,
    isInvalid: false,
    tooltipProps: undefined,
    popoverProps: undefined,
    addButton,
  },
};
export default meta;

export const Main: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(args.value);
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => <TableSelectCell {...args} value={selectedValue} onSelect={setSelectedValue} />,
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args, selectedValue]
    );

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const WithOptionsToDisplay: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(args.value);
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);
    const displayedItems = useMemo(
      () => [
        { label: 'Bank Account', value: 'id-1' },
        { label: 'Visa Account', value: 'id-2' },
      ],
      []
    );
    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => (
            <TableSelectCell
              {...args}
              optionsToDisplayOnSelect={displayedItems}
              value={selectedValue}
              onSelect={setSelectedValue}
            />
          ),
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args, displayedItems, selectedValue]
    );

    const tableProps = useTable({ data, columns });
    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const OnlyWithSelectNoOptions: StoryObj<typeof TableSelectCell> = {
  render: () => {
    const data: { id: string; amount: number }[] = [{ id: '0', amount: 0 }];

    const columns: TableColumnDef<{ amount: number }>[] = [
      {
        id: 'select',
        header: 'Select',
        cell: () => <TableSelectCell onSelect={() => {}} addButton={{ text: '+ Add payment method', onClick: noop }} />,
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

export const WithoutIcon: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(args.value);
    const options = useMemo(
      () =>
        Array.from({ length: 2 }).map((_options, i) => ({
          value: `id-${i + 1}`,
          label: `label ${i + 1}`,
        })),
      []
    );
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => (
            <TableSelectCell
              {...args}
              options={options}
              addButton={addButton}
              placeholder="Choose payment method..."
              value={selectedValue}
              onSelect={setSelectedValue}
            />
          ),
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args, options, selectedValue]
    );
    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const WithFooter: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(args.value);
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => (
            <TableSelectCell
              {...args}
              footerAction={{ label: '+ Add payment method', onClick: noop }}
              value={selectedValue}
              onSelect={setSelectedValue}
            />
          ),
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args, selectedValue]
    );

    const tableProps = useTable({ data, columns });
    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const ReadOnly: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => <TableSelectCell {...args} isReadOnly value={args.value} onSelect={() => {}} />,
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args]
    );

    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const WithoutOptions: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => (
            <TableSelectCell
              {...args}
              options={[]}
              addButton={addButton}
              placeholder="Choose payment method..."
              onSelect={() => {}}
            />
          ),
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args]
    );
    const tableProps = useTable({ data, columns });
    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const WithoutValue: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(args.value);
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => <TableSelectCell {...args} value={selectedValue} onSelect={setSelectedValue} />,
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args, selectedValue]
    );
    const tableProps = useTable({ data, columns });
    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const InvalidWithPopover: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(args.value);
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => (
            <TableSelectCell
              {...args}
              isInvalid
              popoverProps={{
                description: 'You can stay under my umbrella',
                'aria-label': 'Stay here',
                actionRenderer: (props) => (
                  <Button {...props} size="small" variant="secondary-inverse" label="Got it" />
                ),
              }}
              value={selectedValue}
              onSelect={setSelectedValue}
            />
          ),
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args, selectedValue]
    );
    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
  parameters: {
    a11y: {
      // TODO: https://meliorisk.atlassian.net/browse/ME-109338 (aria-allowed-attr)
      test: 'todo',
    },
  },
  play: async () => await userEvent.hover(screen.getByTestId('table-select-cell-warning-icon')),
};

export const InvalidWithTooltip: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(args.value);
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => (
            <TableSelectCell
              {...args}
              isInvalid
              tooltipProps={{ content: 'You can stay under my umbrella' }}
              value={selectedValue}
              onSelect={setSelectedValue}
            />
          ),
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args, selectedValue]
    );
    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
  play: async () => await userEvent.hover(screen.getByTestId('table-select-cell-warning-icon')),
};

export const InvalidReadOnly: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(args.value);
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => (
            <TableSelectCell {...args} isInvalid isReadOnly value={selectedValue} onSelect={setSelectedValue} />
          ),
          size: isUsingVisualTesting() ? 'l' : 'm',
        },
      ],
      [args, selectedValue]
    );
    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
};

export const InvalidNoOptions: StoryObj<typeof TableSelectCell> = {
  render: (args) => {
    const data: { id: string; amount: number }[] = useMemo(() => [{ id: '0', amount: 0 }], []);

    const columns: TableColumnDef<{ amount: number }>[] = useMemo(
      () => [
        {
          id: 'select',
          header: 'Select',
          cell: () => <TableSelectCell {...args} isInvalid options={undefined} />,
          size: 'l',
        },
      ],
      [args]
    );
    const tableProps = useTable({ data, columns });

    return (
      <Card width="fit-content" paddingX="none" paddingY="none">
        <Table {...tableProps} />
      </Card>
    );
  },
  parameters: { docs: { source: { type: 'code' } }, chromatic: { viewports: [1440] } },
};
