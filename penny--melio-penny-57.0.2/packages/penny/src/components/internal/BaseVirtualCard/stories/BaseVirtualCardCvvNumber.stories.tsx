import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { getUnionTypeSummary } from '../../../../test-utils/storybook.utils';
import { BaseVirtualCardCvvNumber } from '../components/BaseVirtualCardCvvNumber';

const variants = ['default', 'inverse'];

const meta: Meta<typeof BaseVirtualCardCvvNumber> = {
  title: 'Data Display Components/Virtual Card/Cvv Number',
  component: BaseVirtualCardCvvNumber,
  argTypes: {
    cvv: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The cvv number year to display.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The text to display as label for the cvv number.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    onCopy: {
      action: 'clicked',
      description: 'triggers when the copy button / cvv number is clicked.',
      table: {
        type: { summary: 'MouseEventHandler' },
        category: 'events',
      },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Determines the virtual cvv number variant.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: getUnionTypeSummary(variants) },
        category: 'props',
      },
    },
    showDetails: {
      control: 'boolean',
      description:
        'Determines if the cvv number is visible or not. when the details is hidden the content is not copyable.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
    children: {
      control: false,
      description: 'Customize content (if it exists, it replaces the cvv number and the copy button).',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
  },
  args: {
    label: 'CVV',
    cvv: '838',
    variant: 'default',
    onCopy: noop,
    showDetails: true,
  },
};
export default meta;

export const Main: StoryObj<typeof BaseVirtualCardCvvNumber> = {
  render: (args) => (
    <Storybook.Container
      bgColor={args.variant === 'inverse' ? 'semantic.surface.inverse' : undefined}
      padding="xs"
      borderRadius="global.100"
    >
      <BaseVirtualCardCvvNumber {...args} />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const HiddenDetails: StoryObj<typeof BaseVirtualCardCvvNumber> = {
  render: (args) => <BaseVirtualCardCvvNumber {...args} showDetails={false} />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Inverse: StoryObj<typeof BaseVirtualCardCvvNumber> = {
  render: (args) => (
    <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" borderRadius="global.100">
      <BaseVirtualCardCvvNumber {...args} variant="inverse" />
    </Storybook.Container>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Customize: StoryObj<typeof BaseVirtualCardCvvNumber> = {
  render: () => (
    <BaseVirtualCardCvvNumber label="CVV">
      <Storybook.ContentPlaceholder />
    </BaseVirtualCardCvvNumber>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
