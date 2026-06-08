import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { getUnionTypeSummary } from '../../../../test-utils';
import { BaseVirtualCardCardNumber } from '../components/BaseVirtualCardCardNumber';

const variants = ['default', 'inverse'];

const meta: Meta<typeof BaseVirtualCardCardNumber> = {
  title: 'Data Display Components/Virtual Card/Card Number',
  component: BaseVirtualCardCardNumber,
  argTypes: {
    cardNumber: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The card number to display.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The text to display as label for the card number.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    onCopy: {
      action: 'clicked',
      description: 'triggers when the copy button / card number is clicked.',
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
    showDetails: {
      control: 'boolean',
      description:
        'Determines if the card number is visible or not. when the details is hidden the content is not copyable.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    children: {
      control: false,
      description: 'Customize content (if it exists, it replaces the card number and the copy button).',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
  },
  args: {
    label: 'Card number',
    cardNumber: '1234567890123456',
    variant: 'default',
    onCopy: noop,
    showDetails: true,
  },
};
export default meta;

export const Main: StoryObj<typeof BaseVirtualCardCardNumber> = {
  render: (args) => (
    <Storybook.Container
      bgColor={args.variant === 'inverse' ? 'semantic.surface.inverse' : undefined}
      padding="xs"
      borderRadius="global.100"
    >
      <BaseVirtualCardCardNumber {...args} />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const HiddenDetails: StoryObj<typeof BaseVirtualCardCardNumber> = {
  render: (args) => <BaseVirtualCardCardNumber {...args} showDetails={false} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Inverse: StoryObj<typeof BaseVirtualCardCardNumber> = {
  render: (args) => (
    <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" borderRadius="global.100">
      <BaseVirtualCardCardNumber {...args} variant="inverse" />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Customize: StoryObj<typeof BaseVirtualCardCardNumber> = {
  render: () => (
    <BaseVirtualCardCardNumber label="Card number">
      <Storybook.ContentPlaceholder />
    </BaseVirtualCardCardNumber>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
