import { SimpleGrid } from '@chakra-ui/react';
import { noop } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils';

import { BrandSymbol } from '../BrandSymbol';
import { FlagIcon } from '../FlagIcon';
import { Text } from '../Text';
import { Avatar } from './Avatar';
import type { AvatarColor, AvatarProps } from './Avatar.types';

const sizes = ['extra-small', 'small', 'medium', 'large', 'extra-large'];
const colors = ['default', 'avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6'];

const variantOptions = ['square', 'circle'];
const meta: Meta<typeof Avatar> = {
  title: 'Data Display Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      description: 'Determines the size of the avatar.',
      options: sizes,
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: getUnionTypeSummary(sizes) },
        category: 'props',
      },
    },
    name: {
      control: 'text',
      description: 'The description of the content of the avatar.',
      type: { required: true, name: 'other', value: 'string' },
      table: { type: { summary: 'string' }, category: 'props' },
    },
    src: {
      control: 'text',
      description: 'The source of the image of the avatar.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    alt: {
      control: 'text',
      description: 'The alt text for the avatar image. If not provided, defaults to "{name}".',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    badge: {
      control: false,
      description: 'The element to set as badge.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    bgColor: {
      control: 'select',
      options: [undefined, ...colors],
      description: `Set the avatar's background color`,
      table: {
        defaultValue: { summary: 'default' },
        category: 'props',
        type: { summary: getUnionTypeSummary(colors) },
      },
    },
    isSelected: {
      control: 'boolean',
      description: 'Determines if the avatar is selected.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the avatar is disabled.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    variant: {
      control: 'select',
      description: 'Determines the shape of the avatar.',
      options: variantOptions,
      table: {
        defaultValue: { summary: 'circle' },
        type: { summary: getUnionTypeSummary(variantOptions) },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: 'avatar' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    name: 'Robin the Dog',
    // Use a placeholder in chromatic for consistency in the snapshots
    src: isUsingVisualTesting() ? 'https://placehold.co/150x150' : '/assets/Robin.jpeg',
    size: 'medium',
    isSelected: false,
    isDisabled: false,
    variant: 'circle',
    badge: undefined,
    'data-testid': 'avatar',
    alt: 'Robin the Dog',
  },
};
export default meta;

export const Main: StoryObj<typeof Avatar> = {};

export const Variants: StoryObj<typeof Avatar> = {
  render: (args) => (
    <SimpleGrid columns={2} gap="s" justifyItems="center" alignItems="center">
      <Text textStyle="body2Semi">circle</Text>
      <Text textStyle="body2Semi">square</Text>

      <Avatar {...args} variant="circle" />
      <Avatar {...args} variant="square" />
    </SimpleGrid>
  ),
};

export const Sizes: StoryObj<typeof Avatar> = {
  render: ({ badge, ...args }) => (
    <SimpleGrid columns={2} templateColumns="100px 1fr" justifyItems="center" alignItems="center" gap="m">
      <Text textStyle="body2Semi">circle</Text>
      <SimpleGrid columns={sizes.length} justifyItems="center" alignItems="center" width="100%">
        {sizes.map((size) => (
          <Text key={`title-${size}`} textStyle="body2Semi">
            {size}
          </Text>
        ))}
        {sizes.map((size) => (
          <Avatar key={`avatar-${size}`} {...args} size={size as AvatarProps['size']} />
        ))}
      </SimpleGrid>
      <Text textStyle="body2Semi">square</Text>
      <SimpleGrid columns={sizes.length} justifyItems="center" alignItems="center" width="100%">
        {sizes.map((size) => (
          <Text key={`title-${size}`} textStyle="body2Semi">
            {size}
          </Text>
        ))}
        {sizes.map((size) => (
          <Avatar key={`avatar-${size}`} {...args} size={size as AvatarProps['size']} variant="square" />
        ))}
      </SimpleGrid>
    </SimpleGrid>
  ),
};

export const BackgroundColors: StoryObj<typeof Avatar> = {
  render: ({ src, ...args }) => (
    <SimpleGrid columns={2} templateColumns="100px 1fr" justifyItems="center" alignItems="center" gap="m">
      <Text textStyle="body2Semi">circle</Text>
      <SimpleGrid columns={colors.length} justifyItems="center" alignItems="center" width="100%">
        {colors.map((color) => (
          <Text key={color} textStyle="body2Semi">
            {color}
          </Text>
        ))}
        {colors.map((color) => (
          <Avatar key={`avatar-${color}`} {...args} bgColor={color as AvatarColor} />
        ))}
      </SimpleGrid>
      <Text textStyle="body2Semi">square</Text>
      <SimpleGrid columns={colors.length} justifyItems="center" alignItems="center" width="100%">
        {colors.map((color) => (
          <Text key={color} textStyle="body2Semi">
            {color}
          </Text>
        ))}
        {colors.map((color) => (
          <Avatar key={`avatar-${color}`} {...args} bgColor={color as AvatarColor} variant="square" />
        ))}
      </SimpleGrid>
    </SimpleGrid>
  ),
};

export const Selected: StoryObj<typeof Avatar> = {
  render: ({ src, ...args }) => (
    <SimpleGrid columns={2} templateColumns="100px 1fr" justifyItems="start" alignItems="center" gap="m">
      <Text textStyle="body2Semi">circle</Text>
      <Group>
        <Avatar {...args} isSelected />
        <Avatar {...args} src={src} isSelected />
      </Group>
      <Text textStyle="body2Semi">square</Text>
      <Group>
        <Avatar {...args} isSelected variant="square" />
        <Avatar {...args} src={src} isSelected variant="square" />
      </Group>
    </SimpleGrid>
  ),
};

export const Clickable: StoryObj<typeof Avatar> = {
  render: (args) => (
    <SimpleGrid columns={2} templateColumns="100px 1fr" justifyItems="start" alignItems="center" gap="m">
      <Text textStyle="body2Semi">circle</Text>
      <Group>
        <Avatar {...args} src={undefined} onClick={noop} />
        <Avatar {...args} onClick={noop} />
        <Avatar {...args} onClick={noop} isDisabled />
      </Group>
      <Text textStyle="body2Semi">square</Text>
      <Group>
        <Avatar {...args} src={undefined} onClick={noop} variant="square" />
        <Avatar {...args} onClick={noop} variant="square" />
        <Avatar {...args} onClick={noop} isDisabled variant="square" />
      </Group>
    </SimpleGrid>
  ),
  parameters: {
    pseudo: { hover: isUsingVisualTesting() },
  },
};

export const Disabled: StoryObj<typeof Avatar> = {
  render: ({ src, ...args }) => (
    <SimpleGrid columns={2} templateColumns="100px 1fr" justifyItems="start" alignItems="center" gap="m">
      <Text textStyle="body2Semi">circle</Text>
      <Group>
        <Avatar {...args} src={undefined} isDisabled />
        <Avatar {...args} src={src} isDisabled />
      </Group>
      <Text textStyle="body2Semi">square</Text>
      <Group>
        <Avatar {...args} src={undefined} isDisabled variant="square" />
        <Avatar {...args} src={src} isDisabled variant="square" />
      </Group>
    </SimpleGrid>
  ),
};

export const WithBadge: StoryObj<typeof Avatar> = {
  render: ({ size, ...args }) => (
    <SimpleGrid columns={6} justifyItems="start" alignItems="center" gap="m">
      <Text textStyle="body2Semi">circle / brand symbol</Text>
      <Text textStyle="body2Semi">circle / icon</Text>
      <Text textStyle="body2Semi">circle / flag</Text>
      <Text textStyle="body2Semi">square / brand symbol</Text>
      <Text textStyle="body2Semi">square / icon</Text>
      <Text textStyle="body2Semi">square / flag</Text>
      <Avatar {...args} badge={<BrandSymbol type="quickbooks" size="small" />} size="large" />
      <Avatar {...args} badge={<Icon type="verified" size="small" color="brand" />} size="large" />
      <Avatar {...args} badge={<FlagIcon countryCode="IL" size="small" />} size="large" />
      <Avatar {...args} badge={<BrandSymbol type="quickbooks" size="small" />} variant="square" size="large" />
      <Avatar {...args} badge={<Icon type="verified" size="small" color="brand" />} variant="square" size="large" />
      <Avatar {...args} badge={<FlagIcon countryCode="IL" size="small" />} variant="square" size="large" />
      <Avatar {...args} badge={<BrandSymbol type="quickbooks" size="small" />} />
      <Avatar {...args} badge={<Icon type="verified" size="small" color="brand" />} />
      <Avatar {...args} badge={<FlagIcon countryCode="IL" size="small" />} />
      <Avatar {...args} badge={<BrandSymbol type="quickbooks" size="small" />} variant="square" />
      <Avatar {...args} badge={<Icon type="verified" size="small" color="brand" />} variant="square" />
      <Avatar {...args} badge={<FlagIcon countryCode="IL" size="small" />} variant="square" />
      <Avatar {...args} badge={<BrandSymbol type="quickbooks" size="extra-small" />} size="small" />
      <Avatar {...args} badge={<Icon type="verified" size="extra-small" color="brand" />} size="small" />
      <Avatar {...args} badge={<FlagIcon countryCode="IL" size="extra-small" />} size="small" />
      <Avatar {...args} badge={<BrandSymbol type="quickbooks" size="extra-small" />} variant="square" size="small" />
      <Avatar
        {...args}
        badge={<Icon type="verified" size="extra-small" color="brand" />}
        variant="square"
        size="small"
      />
      <Avatar {...args} badge={<FlagIcon countryCode="IL" size="extra-small" />} variant="square" size="small" />
    </SimpleGrid>
  ),
};

/**
 * When the avatar image fails to load, it falls back to the name abbreviation
 */
export const Fallback: StoryObj<typeof Avatar> = {
  render: ({ src, ...args }) => <Avatar {...args} src={undefined} />,
};

/**
 * The alt prop allows customizing the alt text for the avatar image.
 * If not provided, it defaults to "{name}".
 */
export const WithAltProperty: StoryObj<typeof Avatar> = {
  render: (args) => (
    <SimpleGrid columns={2} templateColumns="200px 1fr" justifyItems="start" alignItems="center" gap="m">
      <Text textStyle="body2Semi">No alt property</Text>
      <Avatar {...args} />
      <Text textStyle="body2Semi">With alt property</Text>
      <Avatar {...args} alt="Custom profile picture" />
    </SimpleGrid>
  ),
};
