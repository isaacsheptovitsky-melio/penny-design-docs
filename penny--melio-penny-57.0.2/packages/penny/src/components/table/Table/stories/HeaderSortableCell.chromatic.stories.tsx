import type { Meta, StoryObj } from '@storybook/react-vite';

import { TableHeaderSortableCell } from '../TableHeaderSortableCell/TableHeaderSortableCell';
import { MainExample } from './examples/HeaderSortableCell.examples';

const meta: Meta<typeof TableHeaderSortableCell> = {
  title: 'Chromatic/Header Sortable Cell',
  component: TableHeaderSortableCell,
};
export default meta;

export const Unsorted: StoryObj<typeof TableHeaderSortableCell> = {
  render: () => <MainExample sortDirection="none" />,
};
