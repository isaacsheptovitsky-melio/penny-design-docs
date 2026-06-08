import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { themeSpaceKeys } from '@/theme/foundations/spaces';

import { Group } from '../Group';
import { StackedContainer } from './StackedContainer';
import { BorderOptions } from './StackedContainer.types';

const meta: Meta<typeof StackedContainer> = {
  title: 'Containers/Stacked Container',
  component: StackedContainer,
  parameters: { docs: { source: { type: 'code' } } },
  argTypes: {
    stacksToDisplay: {
      control: 'select',
      description: "Determines the stackedContainer's stacksToDisplay styles.",
      options: [0, 1, 2],
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: { summary: '0' },
        category: 'props',
      },
    },
    border: {
      control: 'select',
      options: Object.values(BorderOptions),
      description: "Determines the stackedContainer's border styles.",
      table: {
        type: { summary: Object.values(BorderOptions).join(' | ') },
        defaultValue: { summary: BorderOptions.Regular },
        category: 'props',
      },
    },
    paddingX: {
      control: 'select',
      options: Object.keys(themeSpaceKeys),
      description: "The stackedContainer's x-axis padding.",
      table: {
        type: { summary: Object.keys(themeSpaceKeys).join(' | ') },
        defaultValue: { summary: themeSpaceKeys.none },
        category: 'props',
      },
    },
    paddingY: {
      control: 'select',
      options: Object.keys(themeSpaceKeys),
      description: "The stackedContainer's y-axis padding.",
      table: {
        type: { summary: Object.keys(themeSpaceKeys).join(' | ') },
        defaultValue: { summary: themeSpaceKeys.none },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'stacked-container' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    stacksToDisplay: 0,
  },
};
export default meta;

export const Main: StoryObj<typeof StackedContainer> = {
  render: ({ ...args }) => (
    <StackedContainer {...args}>
      <Storybook.ContentPlaceholder />
    </StackedContainer>
  ),
};

export const StacksToDisplay: StoryObj<typeof StackedContainer> = {
  render: (args) => (
    <Group variant="vertical">
      <StackedContainer {...args} paddingX="m" paddingY="m" stacksToDisplay={0}>
        <Storybook.ContentPlaceholder label="0 stacks" />
      </StackedContainer>
      <StackedContainer {...args} paddingX="m" paddingY="m" stacksToDisplay={1}>
        <Storybook.ContentPlaceholder label="1 stack" />
      </StackedContainer>
      <StackedContainer {...args} paddingX="m" paddingY="m" stacksToDisplay={2}>
        <Storybook.ContentPlaceholder label="2 stacks" />
      </StackedContainer>
    </Group>
  ),
};
