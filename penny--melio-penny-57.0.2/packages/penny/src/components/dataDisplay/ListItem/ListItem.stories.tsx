import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';

import { Text } from '../Text';
import { ListItem } from './ListItem';

const descriptionPropsType = `{
  label: string;
} & OneOrNone<{
  link: { label: string; href: string };
  action: {
    label: string;
    onClick: MouseEventHandler;
    'data-testid'?: string;
  };
}>`;

const mainLabelPropsType = `{
  label: string;
  placeholder?: string;
  secondaryLabel?: string;
  pillProps?: {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
    type?: 'primary' | 'secondary' | 'status';
  } | {
    status: 'warning' | 'critical' | 'success' | 'neutral' | 'brand' | 'informative';
    label: string;
    type?: 'primary' | 'secondary' | 'status';
  }[]];
  variant?: 'default' | 'bold';
  tooltipProps?: TooltipProps & {
    triggerStatus?: _IconIndicatorProps['variant'];
  };
  iconProps?: Omit <<IconProps, 'size' | 'isReadOnly' | 'isDisabled'>>;
}`;

const labelPropsType = `{
  label: string;
  tooltipProps?: {
    content: ReactNode;
    shouldAddTriggerFocus?: boolean;
    triggerAriaLabel?: string;
  };
  description?: string;
}`;

const meta: Meta<typeof ListItem> = {
  title: 'Data Display Components/List Item [pattern]',
  component: ListItem,
  argTypes: {
    labelProps: {
      control: 'object',
      description: 'The properties passed to the label.',
      table: {
        type: { summary: 'TypographyLabelProps', detail: labelPropsType },
        category: 'props',
      },
    },
    mainLabelProps: {
      control: 'object',
      type: { required: true, value: 'object', name: 'other' },
      description: 'The properties passed to the main label.',
      table: {
        type: { summary: 'TypographyMainLabelProps', detail: mainLabelPropsType },
        category: 'props',
      },
    },
    descriptionProps: {
      control: 'object',
      description: 'The properties passed to the description.',
      table: {
        type: { summary: 'TypographyDescriptionProps', detail: descriptionPropsType },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the component is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'props',
      },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Determines if the component is read-only.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'props',
      },
    },
    isInvalid: {
      control: 'boolean',
      description:
        "Determines if the component is invalid.<br />**Should only be used if `mainLabelProps: { variant: 'default' }`.**",
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'props',
      },
    },
    textAlign: {
      control: 'select',
      options: ['start', 'center'],
      description: "Determines if the component's content is aligned to the start or center.",
      table: {
        type: { summary: 'start | center' },
        defaultValue: { summary: 'start' },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'list-item' }, category: 'tests' },
    },
  },
  args: {
    mainLabelProps: { label: 'Main Label' },
    labelProps: { label: 'Label' },
    descriptionProps: { label: 'Description' },
    isDisabled: false,
    isReadOnly: false,
    isInvalid: false,
    textAlign: 'start',
    'data-testid': 'list-item',
  },
};
export default meta;

export const Main: StoryObj<typeof ListItem> = {};

export const MainLabelVariants: StoryObj<typeof ListItem> = {
  render: (args) => (
    <Group spacing="xxxl" hasDivider>
      <ListItem {...args} mainLabelProps={{ label: 'I Have a "Default" Main Label', variant: 'default' }} />
      <ListItem {...args} mainLabelProps={{ label: 'I Have a "Bold" Main Label', variant: 'bold' }} />
    </Group>
  ),
};

export const WithoutLabelOrDescription: StoryObj<typeof ListItem> = {
  render: (args) => (
    <Group spacing="xxxl" hasDivider>
      <ListItem {...args} descriptionProps={undefined} mainLabelProps={{ label: 'I Have No Description' }} />
      <ListItem {...args} labelProps={undefined} mainLabelProps={{ label: 'I Have No Label' }} />
      <ListItem
        {...args}
        descriptionProps={undefined}
        labelProps={undefined}
        mainLabelProps={{ label: 'I Have No Label or Description' }}
      />
    </Group>
  ),
};

export const Placeholder: StoryObj<typeof ListItem> = {
  render: (args) => <ListItem {...args} mainLabelProps={{ placeholder: 'Placeholder' }} />,
};

export const Disabled: StoryObj<typeof ListItem> = {
  render: (args) => <ListItem {...args} isDisabled />,
};

export const ReadOnly: StoryObj<typeof ListItem> = {
  render: (args) => <ListItem {...args} isReadOnly />,
};

export const Invalid: StoryObj<typeof ListItem> = {
  render: (args) => <ListItem {...args} isInvalid />,
};

export const WithBadge: StoryObj<typeof ListItem> = {
  render: (args) => (
    <Group spacing="xxxl" hasDivider>
      <ListItem {...args} mainLabelProps={{ label: 'Single Badge', pillProps: { label: 'New', status: 'brand' } }} />
      <ListItem
        {...args}
        mainLabelProps={{
          label: 'Multiple Badges',
          pillProps: [
            { label: 'New', status: 'brand' },
            { label: 'Updated', status: 'success' },
          ],
        }}
      />
    </Group>
  ),
};

export const WithTooltips: StoryObj<typeof ListItem> = {
  render: (args) => (
    <ListItem
      {...args}
      labelProps={{ label: 'Label', tooltipProps: { content: "Don't go chasing waterfalls" } }}
      mainLabelProps={{
        label: 'Main Label',
        tooltipProps: { content: "Please stick to the rivers and the lakes that you're used to" },
      }}
    />
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithActions: StoryObj<typeof ListItem> = {
  render: (args) => (
    <Group spacing="xxxl" hasDivider>
      <ListItem
        {...args}
        descriptionProps={{ label: 'With an action', action: { label: 'Click here', onClick: () => null } }}
      />
      <ListItem {...args} descriptionProps={{ label: 'With a link', link: { label: 'Learn more', href: '' } }} />
    </Group>
  ),
};

export const WithAdditionalInfo: StoryObj<typeof ListItem> = {
  render: (args) => (
    <ListItem
      {...args}
      labelProps={{ label: 'Label', description: '(optional)' }}
      mainLabelProps={{ label: 'Main Label', variant: 'bold', secondaryLabel: 'Just keep swimming' }}
    />
  ),
};

export const TextAlignCenter: StoryObj<typeof ListItem> = {
  render: () => (
    <SimpleGrid columns={4} rowGap="l">
      <Group variant="vertical" alignItems="center">
        <Text textStyle="body2Semi">Without label</Text>
        <ListItem
          textAlign="center"
          descriptionProps={{ label: 'Description' }}
          mainLabelProps={{ label: 'Main Label' }}
        />
      </Group>
      <Group variant="vertical" alignItems="center">
        <Text textStyle="body2Semi">With an action</Text>
        <ListItem
          textAlign="center"
          labelProps={{ label: 'Label' }}
          descriptionProps={{ label: 'Description', action: { label: 'Click here', onClick: () => null } }}
          mainLabelProps={{ label: 'Main Label' }}
        />
      </Group>
      <Group variant="vertical" alignItems="center">
        <Text textStyle="body2Semi">With tooltips</Text>
        <ListItem
          textAlign="center"
          labelProps={{ label: 'Label', tooltipProps: { content: "Don't go chasing waterfalls" } }}
          descriptionProps={{ label: 'Description' }}
          mainLabelProps={{
            label: 'Main Label',
            tooltipProps: { content: "Please stick to the rivers and the lakes that you're used to" },
          }}
        />
      </Group>
      <Group variant="vertical" alignItems="center">
        <Text textStyle="body2Semi">With additional info</Text>
        <ListItem
          textAlign="center"
          labelProps={{ label: 'Label', description: '(optional)' }}
          descriptionProps={{ label: 'Description' }}
          mainLabelProps={{ label: 'Main Label', variant: 'bold', secondaryLabel: 'Secondary Label' }}
        />
      </Group>
      <Group variant="vertical" alignItems="center">
        <Text textStyle="body2Semi">With a badge</Text>
        <ListItem
          textAlign="center"
          labelProps={{ label: 'Label' }}
          descriptionProps={{ label: 'Description' }}
          mainLabelProps={{ label: 'Main Label', pillProps: { label: 'New', status: 'brand' } }}
        />
      </Group>
      <Group variant="vertical" alignItems="center">
        <Text textStyle="body2Semi">Invalid</Text>
        <ListItem
          textAlign="center"
          labelProps={{ label: 'Label' }}
          descriptionProps={{ label: 'Description' }}
          mainLabelProps={{ label: 'Main Label' }}
          isInvalid
        />
      </Group>
      <Group variant="vertical" alignItems="center">
        <Text textStyle="body2Semi">Read only</Text>
        <ListItem
          textAlign="center"
          labelProps={{ label: 'Label' }}
          descriptionProps={{ label: 'Description' }}
          mainLabelProps={{ label: 'Main Label' }}
          isReadOnly
        />
      </Group>
      <Group variant="vertical" alignItems="center">
        <Text textStyle="body2Semi">Disabled</Text>
        <ListItem
          textAlign="center"
          labelProps={{ label: 'Label' }}
          descriptionProps={{ label: 'Description' }}
          mainLabelProps={{ label: 'Main Label' }}
          isDisabled
        />
      </Group>
    </SimpleGrid>
  ),
};
