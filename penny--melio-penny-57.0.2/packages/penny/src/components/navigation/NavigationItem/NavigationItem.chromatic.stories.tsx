import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { NavigationItem } from './NavigationItem';

const meta: Meta<typeof NavigationItem> = {
  title: 'Chromatic/Navigation Item',
  component: NavigationItem,
  args: {
    children: <Storybook.ContentPlaceholder label="Replace me" />,
  },
};
export default meta;

export const Focused: StoryObj<typeof NavigationItem> = {
  render: (args) => <NavigationItem {...args} />,
  play: async () => userEvent.tab(),
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const Hover: StoryObj<typeof NavigationItem> = {
  render: (args) => <NavigationItem {...args} />,
  parameters: {
    pseudo: { hover: true },
  },
};
export const Active: StoryObj<typeof NavigationItem> = {
  render: (args) => <NavigationItem {...args} />,
  parameters: {
    pseudo: { active: true },
  },
};
export const LongText: StoryObj<typeof NavigationItem> = {
  render: () => <NavigationItem>Long long long long long long long text</NavigationItem>,
};
