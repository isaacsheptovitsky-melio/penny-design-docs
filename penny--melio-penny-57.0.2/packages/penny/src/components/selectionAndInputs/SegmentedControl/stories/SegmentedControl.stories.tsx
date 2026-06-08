import { Box, SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { Text } from '@/components/dataDisplay/Text';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { FormField } from '@/components/form/components/FormField';
import { Icon } from '@/components/foundations/Icon';
import { StatusIconSolid } from '@/components/foundations/StatusIconSolid';

import { DEFAULT_SEGMENT_SIZE } from '../components/SegmentedControlItem.types';
import { SegmentedControl, SegmentedControlItem } from '../index';

/**
 * Segmented control consists of `control` which is a container that groups two or more `segments`.
 * A segmented control can offer a single option or multiple options.
 * The segments are inputs with attached labels that have one of the following types:
 * 1. `radio` \- single select.
 * 2. `checkbox` \- multi select.
 *
 * `<SegmentedControl />` renders the control, which groups the segments inputs
 * (see <a href="#anatomy" target="_self">anatomy story</a>).
 */
const meta: Meta<typeof SegmentedControl> = {
  title: 'Selection & Inputs Components/Segmented Control [new]/Segmented Control',
  component: SegmentedControl,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the segments.',
      table: {
        defaultValue: { summary: DEFAULT_SEGMENT_SIZE },
        type: { summary: 'small | medium | large' },
        category: 'props',
      },
    },
    isMulti: {
      control: 'boolean',
      description: 'Set if multi options or single options.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Sets the all segments as disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    readOnly: {
      control: 'boolean',
      description: 'Sets the all segmented as read only.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Sets if width fill its container.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onChange: {
      description: 'A callback function that is invoked on value change.',
      table: {
        category: 'events',
        type: {
          summary: 'ChangeEventHandler<HTMLInputElement>',
        },
      },
    },
    children: {
      control: false,
      description: 'The segments.',
      table: {
        category: 'props',
        type: { summary: 'Segment' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'segmented-control' }, type: { summary: 'string' }, category: 'tests' },
    },
    role: {
      description: 'The semantic meaning of the component.',
      control: 'text',
      table: {
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    'aria-label': {
      control: 'text',
      description: 'The aria-label for the component.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'aria-labelledby': {
      control: 'text',
      description: 'The id of the element that labels the component.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
    'aria-describedby': {
      control: 'text',
      description: 'The id of the element that describes the component.',
      table: { type: { summary: 'string' }, category: 'accessibility' },
    },
  },
  args: {
    size: 'large',
    onChange: () => null,
    isMulti: false,
    isFullWidth: false,
    disabled: false,
    readOnly: false,
    children: [
      <SegmentedControlItem key="1" checked>
        Label 1
      </SegmentedControlItem>,
      <SegmentedControlItem key="2">Label 2</SegmentedControlItem>,
      <SegmentedControlItem key="3">Label 3</SegmentedControlItem>,
    ],
    'aria-label': 'Segmented control label',
    'data-testid': 'segmented-control',
  },
};

export default meta;

export const Main: StoryObj<typeof SegmentedControl> = {
  render: (args) => {
    const [value, setValue] = useState('1');

    return (
      <SegmentedControl {...args} name="main" onChange={(event) => setValue(event.target.value)}>
        <SegmentedControlItem value="1" checked={value === '1'}>
          Label 1
        </SegmentedControlItem>
        <SegmentedControlItem value="2" checked={value === '2'}>
          Label 2
        </SegmentedControlItem>
        <SegmentedControlItem value="3" checked={value === '3'}>
          Label 3
        </SegmentedControlItem>
      </SegmentedControl>
    );
  },
};

export const Anatomy: StoryObj<typeof SegmentedControl> = {
  args: {
    children: [
      <Storybook.ContentPlaceholder label="segment #1" key="1" width="fit-content" />,
      <Storybook.ContentPlaceholder label="segment #2" key="2" width="fit-content" />,
      <Storybook.ContentPlaceholder label="segment #3" key="3" width="fit-content" />,
    ],
  },
};

export const Sizes: StoryObj<typeof SegmentedControl> = {
  render: (args) => (
    <SimpleGrid columns={3} gap="l" alignItems="center">
      <Text>Small</Text>
      <Text>Medium</Text>
      <Text>Large</Text>
      <SegmentedControl {...args} name="small" size="small">
        <SegmentedControlItem key="1" checked>
          Label 1
        </SegmentedControlItem>
        <SegmentedControlItem key="2">Label 2</SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl {...args} name="medium" size="medium">
        <SegmentedControlItem key="1" checked>
          Label 1
        </SegmentedControlItem>
        <SegmentedControlItem key="2">Label 2</SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl {...args} name="large" size="large">
        <SegmentedControlItem key="1" checked>
          Label 1
        </SegmentedControlItem>
        <SegmentedControlItem key="2">Label 2</SegmentedControlItem>
      </SegmentedControl>
    </SimpleGrid>
  ),
};

export const Disabled: StoryObj<typeof SegmentedControl> = {
  args: {
    disabled: true,
    name: 'disabled',
  },
};

export const DisabledSingleOption: StoryObj<typeof SegmentedControl> = {
  render: (args) => (
    <SegmentedControl {...args} onChange={() => null}>
      <SegmentedControlItem value="1" checked>
        Label 1
      </SegmentedControlItem>
      <SegmentedControlItem value="2" disabled>
        Label 2
      </SegmentedControlItem>
      <SegmentedControlItem value="3">Label 3</SegmentedControlItem>
    </SegmentedControl>
  ),
};

export const FullWidth: StoryObj<typeof SegmentedControl> = {
  args: {
    isFullWidth: true,
    name: 'fillContainer',
  },
};

export const MultiSelect: StoryObj<typeof SegmentedControl> = {
  render: (args) => {
    const [values, setValues] = useState<string[]>(['1', '2']);
    return (
      <SegmentedControl
        {...args}
        isMulti
        onChange={(event) => {
          const changedValue = event.target.value;

          setValues(
            values.includes(changedValue) ? values.filter((value) => value !== changedValue) : [...values, changedValue]
          );
        }}
      >
        <SegmentedControlItem value="1" checked={values.includes('1')}>
          Label 1
        </SegmentedControlItem>
        <SegmentedControlItem value="2" checked={values.includes('2')}>
          Label 2
        </SegmentedControlItem>
        <SegmentedControlItem value="3" checked={values.includes('3')}>
          Label 3
        </SegmentedControlItem>
      </SegmentedControl>
    );
  },
};

export const WithTooltip: StoryObj<typeof SegmentedControl> = {
  render: (args) => (
    <SegmentedControl {...args}>
      <Tooltip content="Tooltip 1">
        <SegmentedControlItem value="1" aria-label="label 1" checked>
          <Icon color="inherit" type="calendar" size="small" aria-hidden />
        </SegmentedControlItem>
      </Tooltip>
      <Tooltip content="Tooltip 2">
        <SegmentedControlItem value="2" aria-label="label 2">
          <Icon color="inherit" type="calendar" size="small" aria-hidden />
        </SegmentedControlItem>
      </Tooltip>
    </SegmentedControl>
  ),
};

export const Presets: StoryObj<typeof SegmentedControl> = {
  render: (args) => (
    <Group spacing="xl" variant="vertical">
      <SimpleGrid columns={3} gap="s">
        <Text>Label and icon</Text>
        <Text>Icon only</Text>
        <Text>Label only</Text>
        <SegmentedControl {...args} name="label-icon">
          <SegmentedControlItem value="1" checked>
            <Icon color="inherit" type="calendar" size="small" aria-hidden />
            Label
          </SegmentedControlItem>
          <SegmentedControlItem value="2">
            <Icon color="inherit" type="calendar" size="small" aria-hidden />
            Label
          </SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl {...args} name="icon">
          <Tooltip content="Tooltip content">
            <SegmentedControlItem value="1" checked aria-label="label 1">
              <Icon color="inherit" type="calendar" size="small" aria-hidden />
            </SegmentedControlItem>
          </Tooltip>
          <Tooltip content="Tooltip content">
            <SegmentedControlItem value="2" aria-label="label 2">
              <Icon color="inherit" type="calendar" size="small" aria-hidden />
            </SegmentedControlItem>
          </Tooltip>
        </SegmentedControl>
        <SegmentedControl {...args} name="label">
          <SegmentedControlItem value="1" checked>
            Label 1
          </SegmentedControlItem>
          <SegmentedControlItem value="2">Label 2</SegmentedControlItem>
        </SegmentedControl>
      </SimpleGrid>
      <SimpleGrid columns={3} gap="s">
        <Text>Status icon</Text>
        <Text>Brand symbol</Text>
        <Box />
        <SegmentedControl {...args} name="status-icon">
          <SegmentedControlItem value="1" checked>
            <StatusIconSolid isDisabled={args.disabled} variant="pending" size="small" />
            Label
          </SegmentedControlItem>
          <SegmentedControlItem value="2">
            <StatusIconSolid isDisabled={args.disabled} variant="informative" size="small" />
            Label
          </SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl {...args} name="brand-symbol">
          <SegmentedControlItem value="1" checked>
            <BrandSymbol isDisabled={args.disabled} type="google" size="small" />
            Label
          </SegmentedControlItem>
          <SegmentedControlItem value="2">
            <BrandSymbol isDisabled={args.disabled} type="quickbooks" size="small" />
            Label
          </SegmentedControlItem>
        </SegmentedControl>
        <></>
      </SimpleGrid>
    </Group>
  ),
};

/**
 * **Accessibility note:** You should mention important information and instruction in the field's label and not in the helper text
 * since the component is a group of input it will be hard for SR to announce it.
 */
export const WithFormField: StoryObj<typeof SegmentedControl> = {
  render: (args) => {
    const [value, setValue] = useState('1');

    return (
      <FormField
        id="form-field-segmented-control"
        labelProps={{ label: 'Segmented control label' }}
        helperText="Choose one of the options"
        render={({ isViewMode, isInvalid, isLoading, ...renderProps }) => (
          <SegmentedControl {...args} {...renderProps} name="main" onChange={(event) => setValue(event.target.value)}>
            <SegmentedControlItem value="1" checked={value === '1'}>
              Label 1
            </SegmentedControlItem>
            <SegmentedControlItem value="2" checked={value === '2'}>
              Label 2
            </SegmentedControlItem>
            <SegmentedControlItem value="3" checked={value === '3'}>
              Label 3
            </SegmentedControlItem>
          </SegmentedControl>
        )}
      />
    );
  },
  args: {
    'aria-label': undefined,
  },
};
