import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen, userEvent } from 'storybook/test';

import { Container } from '@/components/containers/Container';

import { Typography } from '..';

const tooltipPropsType = `{
  content: ReactNode;
  shouldAddTriggerFocus?: boolean;
  triggerAriaLabel?: string;
}`;

const meta: Meta<typeof Typography.Label> = {
  title: 'Data Display Components/Typography/Label [pattern]',
  component: Typography.Label,
  argTypes: {
    label: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The text of the label.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    description: {
      control: 'text',
      description: 'The additional text of the label.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    tooltipProps: {
      control: 'object',
      description: 'An icon with tooltip to assert more information.',
      table: {
        type: { summary: "Pick<TooltipProps, 'content'>", detail: tooltipPropsType },
        category: 'props',
      },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Determines if the component is in an invalid state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the component is in a disabled state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the component is in a read only state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    isViewMode: {
      control: 'boolean',
      description: 'Determines if the component is in a view mode state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    labelShouldSupportEllipsis: {
      control: 'boolean',
      description: 'Determines if a long label should be truncated.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    descriptionShouldSupportEllipsis: {
      control: 'boolean',
      description: 'Determines if a long description should be truncated.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    id: {
      control: 'text',
      description: 'The id of the label.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    htmlFor: {
      control: 'text',
      description: 'The id of the element the label is associated with.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
  },
  args: {
    label: 'Full name',
    description: '',
    tooltipProps: undefined,
    isInvalid: false,
    isDisabled: false,
    isReadOnly: false,
    isViewMode: false,
    labelShouldSupportEllipsis: false,
    descriptionShouldSupportEllipsis: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Typography.Label> = {
  render: (args) => (
    <Container paddingX="xxl" paddingY="xxl">
      <Typography.Label {...args} />
    </Container>
  ),
};

export const WithTooltip: StoryObj<typeof Typography.Label> = {
  render: (args) => (
    <Container paddingX="xxl" paddingY="xxl">
      <Typography.Label {...args} tooltipProps={{ content: 'Did you know? A group of crows is called a "murder".' }} />
    </Container>
  ),
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const WithDescription: StoryObj<typeof Typography.Label> = {
  render: (args) => <Typography.Label {...args} description="(optional)" />,
};

export const Invalid: StoryObj<typeof Typography.Label> = {
  render: (args) => (
    <Container paddingX="xxl" paddingY="xxl">
      <Typography.Label
        {...args}
        tooltipProps={{ content: 'Did you know? A group of crows is called a "murder".' }}
        description="(optional)"
        isInvalid
      />
    </Container>
  ),
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const Disabled: StoryObj<typeof Typography.Label> = {
  render: (args) => (
    <Container paddingX="xxl" paddingY="xxl">
      <Typography.Label
        {...args}
        tooltipProps={{ content: 'Did you know? A group of crows is called a "murder".' }}
        description="(optional)"
        isDisabled
      />
    </Container>
  ),
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const ReadOnly: StoryObj<typeof Typography.Label> = {
  render: (args) => (
    <Container paddingX="xxl" paddingY="xxl">
      <Typography.Label
        {...args}
        tooltipProps={{ content: 'Did you know? A group of crows is called a "murder".' }}
        description="(optional)"
        isReadOnly
      />
    </Container>
  ),
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const ViewMode: StoryObj<typeof Typography.Label> = {
  render: (args) => (
    <Container paddingX="xxl" paddingY="xxl">
      <Typography.Label
        {...args}
        tooltipProps={{ content: 'Did you know? A group of crows is called a "murder".' }}
        description="(optional)"
        isViewMode
      />
    </Container>
  ),
  play: async () => userEvent.hover(screen.getByTestId('label-tooltip-trigger')),
};

export const WithEllipsis: StoryObj<typeof Typography.Label> = {
  render: () => (
    <Container paddingX="xxl" paddingY="xxl">
      <Typography.Label
        label="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        labelShouldSupportEllipsis
        descriptionShouldSupportEllipsis
        tooltipProps={{ content: 'Did you know? A group of crows is called a "murder".' }}
      />
    </Container>
  ),
};
