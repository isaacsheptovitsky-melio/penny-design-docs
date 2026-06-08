import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { getUnionTypeSummary } from '../../../../test-utils/storybook.utils';
import { BaseVirtualCardDetails } from '../components/BaseVirtualCardDetails';

const variants = ['default', 'inverse'];

const meta: Meta<typeof BaseVirtualCardDetails> = {
  title: 'Data Display Components/Virtual Card/Details',
  component: BaseVirtualCardDetails,
  argTypes: {
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The text of the details label.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    mainLabel: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The text below the label.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    onCopy: {
      action: 'clicked',
      description: 'Handles the click event on the button or the number.',
      table: {
        type: { summary: 'MouseEventHandler' },
        category: 'events',
      },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Determines the virtual card details variant.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: getUnionTypeSummary(variants) },
        category: 'props',
      },
    },
    enableCopy: {
      control: 'boolean',
      description: 'Determines if enable to copy the main label value.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: {
    label: 'you can copy this text',
    mainLabel: 'this is a very long text to copy',
    variant: 'default',
    onCopy: noop,
    enableCopy: true,
  },
};
export default meta;

export const Main: StoryObj<typeof BaseVirtualCardDetails> = {
  render: (args) => (
    <Storybook.Container
      bgColor={args.variant === 'inverse' ? 'semantic.surface.inverse' : undefined}
      padding="xs"
      borderRadius="global.100"
    >
      <BaseVirtualCardDetails {...args} />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Inverse: StoryObj<typeof BaseVirtualCardDetails> = {
  render: (args) => (
    <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" borderRadius="global.100">
      <BaseVirtualCardDetails {...args} variant="inverse" />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Customize: StoryObj<typeof BaseVirtualCardDetails> = {
  render: () => <BaseVirtualCardDetails label="Custom Details" mainLabel={<Storybook.ContentPlaceholder />} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
