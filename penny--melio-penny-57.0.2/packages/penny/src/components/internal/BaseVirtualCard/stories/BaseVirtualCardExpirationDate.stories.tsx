import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { getUnionTypeSummary } from '../../../../test-utils/storybook.utils';
import { BaseVirtualCardExpirationDate } from '../components/BaseVirtualCardExpirationDate';

const variants = ['default', 'inverse'];

const meta: Meta<typeof BaseVirtualCardExpirationDate> = {
  title: 'Data Display Components/Virtual Card/Expiration Date',
  component: BaseVirtualCardExpirationDate,
  argTypes: {
    month: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The expiration date month to display.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    year: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The expiration date year to display.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The text to display as label for the expiration date.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    onCopy: {
      action: 'clicked',
      description: 'triggers when the copy button / expiration date is clicked.',
      table: {
        type: { summary: 'MouseEventHandler' },
        category: 'events',
      },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Determines the virtual expiration date variant.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: getUnionTypeSummary(variants) },
        category: 'props',
      },
    },
    showDetails: {
      control: 'boolean',
      description:
        'Determines if the expiration date is visible or not. when the details is hidden the content is not copyable.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    children: {
      control: false,
      description: 'Customize content (if it exists, it replaces the date and the copy button).',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
  },
  args: {
    label: 'Expiry date',
    month: '01',
    year: '27',
    variant: 'default',
    onCopy: noop,
    showDetails: true,
  },
};
export default meta;

export const Main: StoryObj<typeof BaseVirtualCardExpirationDate> = {
  render: (args) => (
    <Storybook.Container
      bgColor={args.variant === 'inverse' ? 'semantic.surface.inverse' : undefined}
      padding="xs"
      borderRadius="global.100"
    >
      <BaseVirtualCardExpirationDate {...args} />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const HiddenDetails: StoryObj<typeof BaseVirtualCardExpirationDate> = {
  render: (args) => <BaseVirtualCardExpirationDate {...args} showDetails={false} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Inverse: StoryObj<typeof BaseVirtualCardExpirationDate> = {
  render: (args) => (
    <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" borderRadius="global.100">
      <BaseVirtualCardExpirationDate {...args} variant="inverse" />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Customize: StoryObj<typeof BaseVirtualCardExpirationDate> = {
  render: () => (
    <BaseVirtualCardExpirationDate label="Expiry date">
      <Storybook.ContentPlaceholder />
    </BaseVirtualCardExpirationDate>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
