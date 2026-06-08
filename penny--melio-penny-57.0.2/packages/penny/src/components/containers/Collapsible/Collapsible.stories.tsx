import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { getUnionTypeSummary } from '@/test-utils/storybook.utils';

import { Collapsible } from './Collapsible';

const labelViewOptions = ['default', 'full'];

const meta: Meta<typeof Collapsible> = {
  title: 'Containers/Collapsible',
  component: Collapsible,
  parameters: {
    chromatic: { delay: 300 },
  },
  argTypes: {
    label: {
      type: { required: true, name: 'string' },
      control: 'text',
      description: 'The main label that is always visible',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    labelView: {
      control: 'select',
      options: labelViewOptions,
      description:
        'Determines the gap between the main label and the icon. If there’s a second label, the gap will always be default. If there’s no second label, the gap could be default or full (end to end).',
      table: {
        type: { summary: getUnionTypeSummary(labelViewOptions) },
        defaultValue: { summary: 'default' },
        category: 'props',
      },
    },
    secondaryLabel: {
      control: 'text',
      description: 'The second label that is shown when the component is expanded',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    defaultIsExpanded: {
      control: 'boolean',
      description: 'The initial state of `Collapsible` component',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    children: {
      control: false,
      description: "The `Collapsible`'s content that shown when is expanded.",
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'collapsible' }, category: 'tests' },
    },
  },
  args: {
    label: 'View next 4 recurring payments',
    labelView: 'default',
    secondaryLabel: '',
    children: <Storybook.ContentPlaceholder />,
    defaultIsExpanded: true,
  },
};
export default meta;

export const Main: StoryObj<typeof Collapsible> = {};

export const WithSecondaryLabel: StoryObj<typeof Collapsible> = {
  render: (args) => <Collapsible {...args} secondaryLabel="second label" />,
};
