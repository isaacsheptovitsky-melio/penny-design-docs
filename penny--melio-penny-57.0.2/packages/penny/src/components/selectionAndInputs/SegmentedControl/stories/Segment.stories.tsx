import { Box, SimpleGrid } from '@chakra-ui/react';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Text } from '@/components/dataDisplay/Text';

import { SegmentedControlItem } from '../index';

/**
 * The `<SegmentedControlItem />` component represent an option within a segmented control.
 * It extends [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element and
 * meant to have one of the following types:
 * 1. `radio` \- single select.
 * 2. `checkbox` \- multi select.
 */
const meta: Meta<typeof SegmentedControlItem> = {
  title: 'Selection & Inputs Components/Segmented Control [new]/Segment',
  component: SegmentedControlItem,
  parameters: {
    docs: { source: { type: 'code' } },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['radio', 'checkbox'],
      table: {
        disable: true,
      },
    },
    value: {
      control: 'text',
      description: 'Value of the segment input',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    checked: {
      description: 'Decides if the segment option is checked.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    readOnly: {
      control: 'boolean',
      description: 'Set the segment as read only.',
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
      description: 'The segment content.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'segmented-control.segment' },
        type: { summary: 'string' },
        category: 'tests',
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
    value: '',
    checked: false,
    readOnly: false,
    onChange: () => null,
    children: 'Label',
    type: 'radio',
    'data-testid': 'segmented-control.segment',
  },
};

export default meta;

export const Default: StoryObj<typeof SegmentedControlItem> = {};

export const Checked: StoryObj<typeof SegmentedControlItem> = {
  args: {
    checked: true,
  },
};

/**
 * Segment supports any content. When has multiple children - it applies a default gap between..
 */
export const Anatomy: StoryObj<typeof SegmentedControlItem> = {
  render: (args) => (
    <SimpleGrid columns={3}>
      <Box width="fit-content">
        <SegmentedControlItem {...args}>
          <Storybook.ContentPlaceholder key="1" label="1" width="fit-content" />
        </SegmentedControlItem>
      </Box>
      <Box width="fit-content">
        <SegmentedControlItem {...args}>
          <Storybook.ContentPlaceholder key="1" label="1" width="fit-content" />
          <Storybook.ContentPlaceholder key="2" label="2" width="fit-content" />
          <Storybook.ContentPlaceholder key="3" label="3" width="fit-content" />
        </SegmentedControlItem>
      </Box>
      <Box width="fit-content">
        <SegmentedControlItem {...args}>
          <Storybook.ContentPlaceholder key="1" label="1" width="fit-content" />
          Label
          <Storybook.ContentPlaceholder key="2" label="2" width="fit-content" />
        </SegmentedControlItem>
      </Box>
    </SimpleGrid>
  ),
};

/**
 * **Accessibility note:** When overriding the segment style, you should follow the contrast ratio success criteria (3:1)
 * between the checked and not checked segments.
 */
export const OverrideDefaultStyle: StoryObj<typeof SegmentedControlItem> = {
  render: (args) => (
    <SimpleGrid columns={2} gap="s">
      <Text as="h2" textStyle="heading4">
        Checked
      </Text>
      <Text as="h2" textStyle="heading4">
        Not checked
      </Text>
      <Box width="fit-content">
        <SegmentedControlItem {...args} checked readOnly>
          Pay yearly
          <Text textStyle="body3Semi" color="semantic.icon.informative">
            save 20%
          </Text>
        </SegmentedControlItem>
      </Box>
      <Box width="fit-content">
        <SegmentedControlItem {...args} readOnly>
          Pay yearly
          <Text textStyle="body3" color="semantic.text.primary">
            save 20%
          </Text>
        </SegmentedControlItem>
      </Box>
    </SimpleGrid>
  ),
};
