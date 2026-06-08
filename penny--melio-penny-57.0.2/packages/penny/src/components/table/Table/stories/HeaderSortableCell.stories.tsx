import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';

import { extractComponentSource } from '@/test-utils/storybook.utils';

import type { SortDirection } from '../Table.types';
import { TableHeaderSortableCell } from '../TableHeaderSortableCell/TableHeaderSortableCell';
import {
  InitialSortDirectionExample,
  MainExample,
  StaticExample,
  WithTooltipExample,
} from './examples/HeaderSortableCell.examples';
import HeaderSortableCellExamples from './examples/HeaderSortableCell.examples?raw';

const meta: Meta<typeof TableHeaderSortableCell> = {
  title: 'Table/Header Cells/Header Sortable Cell [pattern]',
  component: TableHeaderSortableCell,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    sortDirection: {
      control: 'select',
      options: ['none', 'desc', 'asc'],
      description: 'The sort direction of the header cell.',
      type: { name: 'string', required: true },
      table: {
        category: 'props',
        type: { summary: 'none | desc | asc' },
      },
    },
    initialSortDirection: {
      control: 'select',
      options: ['desc', 'asc'],
      description: 'The initial sort direction of the header cell when the sort direction is none.',
      table: {
        defaultValue: { summary: 'desc' },
        category: 'props',
        type: { summary: 'desc | asc' },
      },
    },
    onClick: {
      control: false,
      description: 'The callback triggers when clicking on the header cell, sends the next sort direction as argument.',
      table: {
        category: 'events',
        type: {
          summary: "(sortDirection: 'none' | 'desc' | 'asc') => void",
        },
      },
    },
    textAlign: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Sets the text alignment in the header sortable cell.',
      table: {
        defaultValue: { summary: 'start' },
        type: { summary: 'start | end' },
        category: 'props',
      },
    },
    instructionsText: {
      description:
        'The instructions the screen-readers will read, when there is no sort state (used for accessibility).',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Press enter to change sorting' },
        category: 'accessibility',
      },
    },
  },
  args: {
    sortDirection: undefined,
    initialSortDirection: undefined,
    onClick: undefined,
    textAlign: 'start',
    instructionsText: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof TableHeaderSortableCell> = {
  render: ({ sortDirection, ...args }) => <MainExample {...args} sortDirection={sortDirection as SortDirection} />,
  parameters: { docs: { source: { code: extractComponentSource(HeaderSortableCellExamples, 'MainExample') } } },
  play: async () => userEvent.hover(screen.getByTestId('header-sortable-cell')),
};

export const InitialSortDirectionAscending: StoryObj<typeof TableHeaderSortableCell> = {
  render: ({ sortDirection, ...args }) => (
    <InitialSortDirectionExample {...args} sortDirection={sortDirection as SortDirection} />
  ),
  parameters: {
    docs: { source: { code: extractComponentSource(HeaderSortableCellExamples, 'InitialSortDirectionExample') } },
  },
  play: async () => userEvent.hover(screen.getByTestId('header-sortable-asc-cell')),
};

export const Static: StoryObj<typeof TableHeaderSortableCell> = {
  render: (args) => <StaticExample {...args} />,
  parameters: { docs: { source: { code: extractComponentSource(HeaderSortableCellExamples, 'StaticExample') } } },
};

export const WithTooltip: StoryObj<typeof TableHeaderSortableCell> = {
  render: ({ sortDirection, ...args }) => (
    <WithTooltipExample {...args} sortDirection={sortDirection as SortDirection} />
  ),
  play: async () => userEvent.hover(screen.getByTestId('header-sortable-cell')),
  parameters: {
    docs: { source: { code: extractComponentSource(HeaderSortableCellExamples, 'WithTooltipExample') } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
