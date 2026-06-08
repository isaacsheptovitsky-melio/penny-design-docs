import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { screen, userEvent, within } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { iconColorMapping } from '@/components/internal/_BaseIcon';
import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Text } from '../../Text';
import { Typography } from '..';

const tooltipPropsType = `{
  content: ReactNode;
  children?: ReactNode;
  shouldAddTriggerFocus?: boolean;
  triggerAriaLabel?: string;
  dontDescribeChild?: boolean;
  placement: 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end';
  isEnabled: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
  triggerStatus?: 'info' | 'warning' | 'alert';
}`;

const iconPropsTypes = `{
  type: IconProps['type'];
  color?: ${getUnionTypeSummary(Object.keys(iconColorMapping))};
  role?: AriaRole;
  aria-label: string;
}`;

const pillPropsType = `{
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
    type?: 'primary' | 'secondary' | 'status';
  } | {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
    type?: 'primary' | 'secondary' | 'status';
  }[]];
`;

const sizes = ['small', 'large'];
const variants = ['default', 'bold'];

const meta: Meta<typeof Typography.MainLabel> = {
  title: 'Data Display Components/Typography/Main Label [pattern]',
  component: Typography.MainLabel,
  decorators: [
    (Story: StoryFn) => (
      <Container paddingX={isUsingVisualTesting() ? 'xxl' : 'none'} paddingY={isUsingVisualTesting() ? 'xxl' : 'none'}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text of the main label.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    placeholder: {
      control: 'text',
      description: "The text of the main label placeholder.<br />**Required in case `label` prop isn't provided.**",
      table: { type: { summary: 'string' }, category: 'props' },
    },
    secondaryLabel: {
      control: 'text',
      description:
        'The additional text of the main label. Appears to the right of the label.<br />**Relevant for the bold variant.**',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'The variant of the main label.',
      table: {
        type: { summary: getUnionTypeSummary(variants) },
        defaultValue: { summary: 'default' },
        category: 'props',
      },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'The size of the main label.',
      table: { type: { summary: getUnionTypeSummary(sizes) }, defaultValue: { summary: 'large' }, category: 'props' },
    },
    iconProps: {
      control: 'object',
      description: 'A iconProps to assert more information.  <br/> **override when `tooltipProps` prop passed.**',
      table: {
        type: {
          summary: 'IconProps',
          detail: iconPropsTypes,
        },
        category: 'props',
      },
    },
    tooltipProps: {
      control: 'object',
      description:
        'An icon with tooltip to assert more information.  <br/> **When passed override the `iconProps` prop.**',
      table: {
        type: {
          summary: 'TooltipProps',
          detail: tooltipPropsType,
        },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the component is in a disabled state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the component is in read-only state.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    pillProps: {
      control: 'object',
      description:
        'If passed, renders a [Pill](https://penny.melio.com/?path=/docs/data-display-components-pill--docs) alongside the label.',
      table: {
        type: { summary: 'PillProps | PillProps[]', detail: pillPropsType },
        category: 'props',
      },
    },
    id: {
      control: 'text',
      description:
        'A unique identifier for the main label, essential for accessibility as it allows screen readers to associate labels correctly.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    shouldSupportEllipsis: {
      control: 'boolean',
      description: 'Determines if a long label should be truncated.',
      table: { defaultValue: { summary: 'true' }, type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: {
    label: 'Full name',
    placeholder: undefined,
    secondaryLabel: '',
    iconProps: undefined,
    tooltipProps: undefined,
    variant: 'default',
    size: 'large',
    isDisabled: false,
    isReadOnly: false,
    shouldSupportEllipsis: true,
  },
};
export default meta;

export const Main: StoryObj<typeof Typography.MainLabel> = {
  render: (args) => <Typography.MainLabel {...args} />,
};

export const Variants: StoryObj<typeof Typography.MainLabel> = {
  render: () => {
    const items = [
      { label: 'Default', component: <Typography.MainLabel label="Full name" variant="default" /> },
      { label: 'Bold', component: <Typography.MainLabel label="Full name" variant="bold" /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};

export const Sizes: StoryObj<typeof Typography.MainLabel> = {
  render: () => {
    const items = [
      { label: 'Small', component: <Typography.MainLabel label="Full name" size="small" /> },
      { label: 'Large', component: <Typography.MainLabel label="Full name" size="large" /> },
    ];

    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};

export const WithBadge: StoryObj<typeof Typography.MainLabel> = {
  render: (args) => (
    <SimpleGrid columns={2}>
      <Group variant="vertical">
        <Text textStyle="body2Semi">Single badge</Text>
        <Typography.MainLabel {...args} pillProps={{ status: 'brand', label: 'New' }} />
      </Group>
      <Group variant="vertical">
        <Text textStyle="body2Semi">Multiple badges</Text>
        <Typography.MainLabel
          {...args}
          pillProps={[
            { status: 'brand', label: 'New' },
            { status: 'success', label: 'Updated' },
          ]}
        />
      </Group>
    </SimpleGrid>
  ),
};

export const Placeholder: StoryObj<typeof Typography.MainLabel> = {
  render: (args) => <Typography.MainLabel {...args} label={undefined} placeholder="Placeholder" />,
};

export const WithSecondaryLabel: StoryObj<typeof Typography.MainLabel> = {
  render: (args) => <Typography.MainLabel {...args} variant="bold" secondaryLabel="The cake is a lie" />,
};

export const WithIcon: StoryObj<typeof Typography.MainLabel> = {
  render: (args) => (
    <Group variant="vertical">
      <Typography.MainLabel {...args} iconProps={{ type: 'error', color: 'critical' }} />
      <Typography.MainLabel {...args} iconProps={{ type: 'checked-circle', color: 'success' }} />
      <Typography.MainLabel {...args} iconProps={{ type: 'warning' }} />
    </Group>
  ),
};

export const WithTooltip: StoryObj<typeof Typography.MainLabel> = {
  render: (args) => (
    <Typography.MainLabel
      {...args}
      tooltipProps={{ content: 'Did you know? A group of fish is called a "school".' }}
      data-testid="label-1"
    />
  ),
  play: async () => userEvent.hover(within(screen.getByTestId('label-1')).getByTestId('line-item-tooltip-trigger')),
};

export const WithTooltipAndBadge: StoryObj<typeof Typography.MainLabel> = {
  render: (args) => (
    <Typography.MainLabel
      {...args}
      tooltipProps={{ content: 'Did you know? A group of fish is called a "school".' }}
      pillProps={{ status: 'brand', label: 'New' }}
    />
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const ReadOnly: StoryObj<typeof Typography.MainLabel> = {
  render: (args) => (
    <Typography.MainLabel
      {...args}
      variant="bold"
      secondaryLabel="The cake is a lie"
      tooltipProps={{ content: 'Did you know? A group of fish is called a "school".' }}
      pillProps={{ status: 'brand', label: 'New' }}
      isReadOnly
    />
  ),
};

export const Disabled: StoryObj<typeof Typography.MainLabel> = {
  render: (args) => (
    <Typography.MainLabel
      {...args}
      variant="bold"
      secondaryLabel="The cake is a lie"
      tooltipProps={{ content: 'Did you know? A group of fish is called a "school".' }}
      pillProps={{ status: 'brand', label: 'New' }}
      isDisabled
    />
  ),
  play: (ReadOnly.play = async () => userEvent.hover(screen.getByTestId('line-item-tooltip-trigger'))),
};
