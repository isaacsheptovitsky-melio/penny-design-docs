import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';

import { fullScreenChromaticDecorator } from '@/test-utils/storybook.utils';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Chromatic/Pagination',
  component: Pagination,
};
export default meta;

export const FirstBatch: StoryObj<typeof Pagination> = {
  render: (args) => <Pagination {...args} currentPage={1} pageSize={50} totalItems={143} onPageChange={() => null} />,
};

export const MiddleBatch: StoryObj<typeof Pagination> = {
  render: (args) => <Pagination {...args} currentPage={2} pageSize={50} totalItems={143} onPageChange={() => null} />,
};

export const LastBatch: StoryObj<typeof Pagination> = {
  render: (args) => <Pagination {...args} currentPage={3} pageSize={50} totalItems={143} onPageChange={() => null} />,
};

export const NextTooltip: StoryObj<typeof Pagination> = {
  render: (args) => <Pagination {...args} currentPage={2} pageSize={5} totalItems={50} />,
  play: async () => userEvent.hover(screen.getByTestId('chevron-right')),
  decorators: [fullScreenChromaticDecorator],
};

export const PreviousTooltip: StoryObj<typeof Pagination> = {
  render: (args) => <Pagination {...args} currentPage={2} pageSize={5} totalItems={50} />,
  play: async () => userEvent.hover(screen.getByTestId('chevron-left')),
  decorators: [fullScreenChromaticDecorator],
};
