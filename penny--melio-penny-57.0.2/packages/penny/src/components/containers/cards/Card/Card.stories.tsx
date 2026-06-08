import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Text } from '@/components/dataDisplay/Text';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';
import { themeSpaceKeys } from '@/theme/foundations/spaces';

import { Group } from '../../Group';
import { Card } from './Card';
import { ariaRoleType } from './Card.types';

const widthOptions = ['full', 'min-content', 'fit-content'];

/**
 * The `Card` component serves as a versatile container for grouping content and actions, allowing users to engage with and access information more effectively.
 *
 * <b>Features:</b>
 * - The `Card` has various default styles that can be overridden by setting the `variant` prop.
 * - The `Card` has default inner spacing that can be adjusted using the `paddingX` and `paddingY` props.
 * - The `Card` has a default width that can be modified by setting the `width` prop.
 */

const meta: Meta<typeof Card> = {
  title: 'Containers/Cards/Card',
  component: Card,
  argTypes: {
    variant: {
      description: 'The type of the card.',
      control: 'select',
      options: ['default', 'flat'],
      table: {
        defaultValue: { summary: 'default' },
        category: 'props',
        type: { summary: 'default | flat' },
      },
    },
    children: {
      description: 'The content of the card.',
      control: false,
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    onClick: {
      description: 'An event for when clicking the card.',
      table: { category: 'events' },
    },
    paddingX: {
      control: 'select',
      options: Object.keys(themeSpaceKeys),
      description: "The card's x-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(Object.values(themeSpaceKeys)) },
        defaultValue: { summary: 'm' },
        category: 'props',
      },
    },
    paddingY: {
      control: 'select',
      options: Object.keys(themeSpaceKeys),
      description: "The card's y-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(Object.values(themeSpaceKeys)) },
        defaultValue: { summary: 'm' },
        category: 'props',
      },
    },
    width: {
      description: 'The width behavior of the card.',
      control: 'select',
      options: widthOptions,
      table: {
        defaultValue: { summary: 'full' },
        type: { summary: getUnionTypeSummary(widthOptions) },
        category: 'props',
      },
    },
    role: {
      control: false,
      description: "The semantic meaning of the element. when the onClick provided default set to 'button'",
      table: {
        type: { summary: 'AriaRole', detail: ariaRoleType },
        category: 'accessibility',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'card' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    variant: 'default',
    children: undefined,
    paddingX: 'm',
    paddingY: 'm',
    'data-testid': 'card',
    width: 'full',
    onClick: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof Card> = {
  render: (args) => (
    <Card {...args}>
      <Storybook.ContentPlaceholder />
    </Card>
  ),
};

export const Width: StoryObj<typeof Card> = {
  render: (args) => (
    <Storybook.Container width="800px">
      <Group variant="vertical" spacing="s">
        <Text textStyle="body3Semi">default</Text>
        <Card {...args} width="full">
          <Storybook.ContentPlaceholder label="I am using 100% of the available width!" />
        </Card>
        <Card {...args} width="min-content">
          <Storybook.ContentPlaceholder label="I am only as wide as the longest word written!" />
        </Card>
        <Card {...args} width="fit-content">
          <Storybook.ContentPlaceholder label="I am using the available space, but never more than max-content!" />
        </Card>
        <Card {...args} width="fit-content">
          <Storybook.ContentPlaceholder label="I am using the available space, but never more than max-content! If I reach the full width of my container my text will start to wrap." />
        </Card>
        <Text textStyle="body3Semi">flat</Text>
        <Card {...args} variant="flat" width="full">
          <Storybook.ContentPlaceholder label="I am using 100% of the available width!" />
        </Card>
        <Card {...args} variant="flat" width="min-content">
          <Storybook.ContentPlaceholder label="I am only as wide as the longest word written!" />
        </Card>
        <Card {...args} variant="flat" width="fit-content">
          <Storybook.ContentPlaceholder label="I am using the available space, but never more than max-content!" />
        </Card>
        <Card {...args} variant="flat" width="fit-content">
          <Storybook.ContentPlaceholder label="I am using the available space, but never more than max-content! If I reach the full width of my container my text will start to wrap." />
        </Card>
      </Group>
    </Storybook.Container>
  ),
};
