import { SimpleGrid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Badge } from '@/components/dataDisplay/Badge';
import { BrandSymbol } from '@/components/dataDisplay/BrandSymbol';
import { StatusIndicator } from '@/components/dataDisplay/StatusIndicator';
import { Text } from '@/components/dataDisplay/Text';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { getUnionTypeSummary } from '@/test-utils/storybook.utils';
import { getDefaultIconsMap, type IconKey } from '@/theme';

import { IconButton } from './IconButton';
import { type IconButtonSizes, iconButtonVariants } from './IconButton.types';
import { DEFAULT_DATA_TEST_ID } from './IconButton.utils';

const iconOptions = Object.keys(getDefaultIconsMap('')).sort() as IconKey[];

const sizes: IconButtonSizes[] = ['extra-small', 'small', 'medium', 'large'];

const linkProps = `{
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}`;

const meta: Meta<typeof IconButton> = {
  title: 'Action Components/Icon Button',
  component: IconButton,
  argTypes: {
    variant: {
      control: 'select',
      options: iconButtonVariants,
      description: 'The variant of the button.',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: getUnionTypeSummary(iconButtonVariants as unknown as string[]) },
        category: 'props',
      },
    },
    icon: {
      control: 'select',
      options: iconOptions,
      description: 'The icon inside the button.',
      type: { name: 'string', required: true },
      table: {
        category: 'props',
        type: {
          summary: iconOptions.join(' | '),
        },
      },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'The size of the button.',
      table: { defaultValue: { summary: 'medium' }, type: { summary: getUnionTypeSummary(sizes) }, category: 'props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the button is disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isLoading: {
      control: 'boolean',
      description: 'Determines if the button is in loading state.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onClick: {
      action: 'clicked',
      description: 'Handles the click event from the button.',
      table: {
        type: { summary: 'MouseEventHandler' },
        category: 'events',
      },
    },
    link: {
      control: 'object',
      description: 'The link props for the button.<br />If defined - the button will be rendered as `a` tag.',
      table: {
        type: { summary: 'object', detail: linkProps },
        category: 'props',
      },
    },
    'aria-label': {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The aria-label for the button.',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: DEFAULT_DATA_TEST_ID },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    icon: 'chevron-left',
    variant: undefined,
    size: 'medium',
    isLoading: false,
    link: undefined,
    'data-testid': undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof IconButton> = {
  render: (args) => (
    <Storybook.Container
      bgColor={args.variant === 'secondary-inverse' || args.variant === 'naked-inverse' ? 'neutral.800' : undefined}
      padding="xs"
      borderRadius="global.100"
      width="fit-content"
    >
      <IconButton {...args} aria-label="icon-button-prev" />
    </Storybook.Container>
  ),
};

export const Variants: StoryObj<typeof IconButton> = {
  render: () => (
    <SimpleGrid columns={9} gap="s" alignItems="center">
      <Text>Primary</Text>
      <Text>Secondary</Text>
      <Text>Tertiary</Text>
      <Text>Naked</Text>
      <Text>Critical</Text>
      <Text>Critical Secondary</Text>
      <Text>Primary Inverse</Text>
      <Text>Secondary Inverse</Text>
      <Text>Naked Inverse</Text>
      <IconButton icon="file-move" aria-label="icon-button-primary-file-move-medium" variant="primary" />
      <IconButton icon="file-move" aria-label="icon-button-secondary-file-move-medium" variant="secondary" />
      <IconButton icon="file-move" aria-label="icon-button-tertiary-file-move-medium" variant="tertiary" />
      <IconButton icon="file-move" aria-label="icon-button-naked-file-move-medium" variant="naked" />
      <IconButton icon="file-move" aria-label="icon-button-critical-file-move-medium" variant="critical" />
      <IconButton
        icon="file-move"
        aria-label="icon-button-critical-secondary-file-move-medium"
        variant="critical-secondary"
      />
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          icon="file-move"
          aria-label="icon-button-primary-inverse-file-move-medium"
          variant="primary-inverse"
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          icon="file-move"
          aria-label="icon-button-secondary-inverse-file-move-medium"
          variant="secondary-inverse"
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton icon="file-move" aria-label="icon-button-naked-inverse-file-move-medium" variant="naked-inverse" />
      </Storybook.Container>
    </SimpleGrid>
  ),
};

export const Sizes: StoryObj<typeof IconButton> = {
  render: (args) => (
    <SimpleGrid columns={5} gap="s" alignItems="center">
      <Text textStyle="body3Semi">Variant/Size</Text>
      <Text>Extra Small</Text>
      <Text>Small</Text>
      <Text>Medium</Text>
      <Text>Large</Text>
      <Text>Primary</Text>
      <Storybook.Container padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-primary-chevron-left-extra-small"
          variant="primary"
          size="extra-small"
        />
      </Storybook.Container>
      <Storybook.Container padding="xs" width="fit-content">
        <IconButton {...args} aria-label="icon-button-primary-chevron-left-small" variant="primary" size="small" />
      </Storybook.Container>
      <Storybook.Container padding="xs" width="fit-content">
        <IconButton {...args} aria-label="icon-button-primary-chevron-left-medium" variant="primary" />
      </Storybook.Container>
      <Storybook.Container padding="xs" width="fit-content">
        <IconButton {...args} aria-label="icon-button-primary-chevron-left-large" variant="primary" size="large" />
      </Storybook.Container>
      <Text>Secondary</Text>
      <IconButton
        {...args}
        aria-label="icon-button-secondary-chevron-left-extra-small"
        variant="secondary"
        size="extra-small"
      />
      <IconButton {...args} aria-label="icon-button-secondary-chevron-left-small" variant="secondary" size="small" />
      <IconButton {...args} aria-label="icon-button-secondary-chevron-left-medium" variant="secondary" />
      <IconButton {...args} aria-label="icon-button-secondary-chevron-left-large" variant="secondary" size="large" />
      <Text>Tertiary</Text>
      <IconButton
        {...args}
        aria-label="icon-button-tertiary-chevron-left-extra-small"
        size="extra-small"
        variant="tertiary"
      />
      <IconButton {...args} aria-label="icon-button-tertiary-chevron-left-small" size="small" variant="tertiary" />
      <IconButton {...args} aria-label="icon-button-tertiary-chevron-left-medium" variant="tertiary" />
      <IconButton {...args} aria-label="icon-button-tertiary-chevron-left-large" size="large" variant="tertiary" />
      <Text>Naked</Text>
      <IconButton
        {...args}
        aria-label="icon-button-naked-chevron-left-extra-small"
        variant="naked"
        size="extra-small"
      />
      <IconButton {...args} aria-label="icon-button-naked-chevron-left-small" variant="naked" size="small" />
      <IconButton {...args} aria-label="icon-button-naked-chevron-left-medium" variant="naked" />
      <IconButton {...args} aria-label="icon-button-naked-chevron-left-large" variant="naked" size="large" />
      <Text>Critical</Text>
      <IconButton
        {...args}
        aria-label="icon-button-critical-chevron-left-extra-small"
        variant="critical"
        size="extra-small"
      />
      <IconButton {...args} aria-label="icon-button-critical-chevron-left-small" variant="critical" size="small" />
      <IconButton {...args} aria-label="icon-button-critical-chevron-left-medium" variant="critical" />
      <IconButton {...args} aria-label="icon-button-critical-chevron-left-large" variant="critical" size="large" />
      <Text>Critical Secondary</Text>
      <IconButton
        {...args}
        aria-label="icon-button-critical-secondary-chevron-left-extra-small"
        variant="critical-secondary"
        size="extra-small"
      />
      <IconButton
        {...args}
        aria-label="icon-button-critical-secondary-chevron-left-small"
        variant="critical-secondary"
        size="small"
      />
      <IconButton
        {...args}
        aria-label="icon-button-critical-secondary-chevron-left-medium"
        variant="critical-secondary"
      />
      <IconButton
        {...args}
        aria-label="icon-button-critical-secondary-chevron-left-large"
        variant="critical-secondary"
        size="large"
      />
      <Text>Primary Inverse</Text>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-primary-inverse-chevron-left-extra-small"
          variant="primary-inverse"
          size="extra-small"
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-primary-inverse-chevron-left-small"
          variant="primary-inverse"
          size="small"
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton {...args} aria-label="icon-button-primary-inverse-chevron-left-medium" variant="primary-inverse" />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-primary-inverse-chevron-left-large"
          variant="primary-inverse"
          size="large"
        />
      </Storybook.Container>
      <Text>Secondary Inverse</Text>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-secondary-inverse-chevron-left-extra-small"
          size="extra-small"
          variant="secondary-inverse"
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-secondary-inverse-chevron-left-small"
          size="small"
          variant="secondary-inverse"
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-secondary-inverse-chevron-left-medium"
          variant="secondary-inverse"
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-secondary-inverse-chevron-left-large"
          variant="secondary-inverse"
          size="large"
        />
      </Storybook.Container>
      <Text>Naked Inverse</Text>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-naked-inverse-chevron-left-extra-small"
          variant="naked-inverse"
          size="extra-small"
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-naked-inverse-chevron-left-small"
          variant="naked-inverse"
          size="small"
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton {...args} aria-label="icon-button-naked-inverse-chevron-left-medium" variant="naked-inverse" />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          {...args}
          aria-label="icon-button-naked-inverse-chevron-left-large"
          variant="naked-inverse"
          size="large"
        />
      </Storybook.Container>
    </SimpleGrid>
  ),
};

export const WithStatus: StoryObj<typeof IconButton> = {
  render: () => (
    <SimpleGrid columns={3} gap="s" alignItems="center">
      <Text textStyle="body3Semi">Variant/Size</Text>
      <Text>Enabled</Text>
      <Text>Disabled</Text>
      <Text>Primary</Text>
      <StatusIndicator status="warning">
        <IconButton icon="file-move" aria-label="icon-button-primary-file-move-medium" variant="primary" />
      </StatusIndicator>
      <StatusIndicator status="warning" isDisabled>
        <IconButton icon="file-move" aria-label="icon-button-primary-file-move-medium" variant="primary" isDisabled />
      </StatusIndicator>
      <Text>Secondary</Text>
      <StatusIndicator status="warning">
        <IconButton icon="file-move" aria-label="icon-button-secondary-file-move-medium" variant="secondary" />
      </StatusIndicator>
      <StatusIndicator status="warning" isDisabled>
        <IconButton
          icon="file-move"
          aria-label="icon-button-secondary-file-move-medium"
          variant="secondary"
          isDisabled
        />
      </StatusIndicator>
      <Text>Tertiary</Text>
      <StatusIndicator status="warning">
        <IconButton icon="file-move" aria-label="icon-button-file-move-tertiary" variant="tertiary" />
      </StatusIndicator>
      <StatusIndicator status="warning" isDisabled>
        <IconButton icon="file-move" aria-label="icon-button-file-move-tertiary" variant="tertiary" isDisabled />
      </StatusIndicator>
      <Text>Naked</Text>
      <StatusIndicator status="warning">
        <IconButton icon="file-move" aria-label="icon-button-naked-file-move-medium" variant="naked" />
      </StatusIndicator>
      <StatusIndicator status="warning" isDisabled>
        <IconButton icon="file-move" aria-label="icon-button-naked-file-move-medium" variant="naked" isDisabled />
      </StatusIndicator>

      <Text>Critical</Text>
      <StatusIndicator status="warning">
        <IconButton icon="file-move" aria-label="icon-button-critical-file-move-medium" variant="critical" />
      </StatusIndicator>
      <StatusIndicator status="warning" isDisabled>
        <IconButton icon="file-move" aria-label="icon-button-critical-file-move-medium" variant="critical" isDisabled />
      </StatusIndicator>
      <Text>Critical Secondary</Text>
      <StatusIndicator status="warning">
        <IconButton
          icon="file-move"
          aria-label="icon-button-critical-secondary-file-move-medium"
          variant="critical-secondary"
        />
      </StatusIndicator>
      <StatusIndicator status="warning" isDisabled>
        <IconButton
          icon="file-move"
          aria-label="icon-button-critical-secondary-file-move-medium"
          variant="critical-secondary"
          isDisabled
        />
      </StatusIndicator>
      <Text>Primary Inverse</Text>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <StatusIndicator status="warning">
          <IconButton
            icon="file-move"
            aria-label="icon-button-primary-inverse-file-move-medium"
            variant="primary-inverse"
          />
        </StatusIndicator>
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <StatusIndicator status="warning" isDisabled>
          <IconButton
            icon="file-move"
            aria-label="icon-button-primary-inverse-file-move-medium"
            variant="primary-inverse"
            isDisabled
          />
        </StatusIndicator>
      </Storybook.Container>
      <Text>Secondary Inverse</Text>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <StatusIndicator status="warning">
          <IconButton
            icon="file-move"
            aria-label="icon-button-secondary-inverse-file-move-medium"
            variant="secondary-inverse"
          />
        </StatusIndicator>
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <StatusIndicator status="warning" isDisabled>
          <IconButton
            icon="file-move"
            aria-label="icon-button-secondary-inverse-file-move-medium"
            variant="secondary-inverse"
            isDisabled
          />
        </StatusIndicator>
      </Storybook.Container>
      <Text>Naked Inverse</Text>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <StatusIndicator status="warning">
          <IconButton
            icon="file-move"
            aria-label="icon-button-naked-inverse-file-move-medium"
            variant="naked-inverse"
          />
        </StatusIndicator>
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <StatusIndicator status="warning" isDisabled>
          <IconButton
            icon="file-move"
            aria-label="icon-button-naked-inverse-file-move-medium"
            variant="naked-inverse"
            isDisabled
          />
        </StatusIndicator>
      </Storybook.Container>
    </SimpleGrid>
  ),
};

export const WithBadge: StoryObj<typeof IconButton> = {
  render: () => (
    <SimpleGrid columns={3} gap="s" justifyItems="start" alignItems="center">
      <Text textStyle="body3Semi">Variant/Size</Text>
      <Text>Enabled</Text>
      <Text>Disabled</Text>
      <Text>Primary</Text>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" />}>
        <IconButton icon="file-move" aria-label="icon-button-primary-file-move-medium" variant="primary" />
      </Badge>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" isDisabled />}>
        <IconButton icon="file-move" aria-label="icon-button-primary-file-move-medium" variant="primary" isDisabled />
      </Badge>
      <Text>Secondary</Text>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" />}>
        <IconButton icon="file-move" aria-label="icon-button-secondary-file-move-medium" variant="secondary" />
      </Badge>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" isDisabled />}>
        <IconButton
          icon="file-move"
          aria-label="icon-button-secondary-file-move-medium"
          variant="secondary"
          isDisabled
        />
      </Badge>
      <Text>Tertiary</Text>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" />}>
        <IconButton icon="file-move" aria-label="icon-button-tertiary-file-move-medium" variant="tertiary" />
      </Badge>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" isDisabled />}>
        <IconButton icon="file-move" aria-label="icon-button-tertiary-file-move-medium" variant="tertiary" isDisabled />
      </Badge>
      <Text>Naked</Text>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" />}>
        <IconButton icon="file-move" aria-label="icon-button-naked-file-move-medium" variant="naked" />
      </Badge>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" isDisabled />}>
        <IconButton icon="file-move" aria-label="icon-button-naked-file-move-medium" variant="naked" isDisabled />
      </Badge>
      <Text>Critical</Text>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" />}>
        <IconButton icon="file-move" aria-label="icon-button-critical-file-move-medium" variant="critical" />
      </Badge>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" isDisabled />}>
        <IconButton icon="file-move" aria-label="icon-button-critical-file-move-medium" variant="critical" isDisabled />
      </Badge>
      <Text>Critical Secondary</Text>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" />}>
        <IconButton
          icon="file-move"
          aria-label="icon-button-critical-secondary-file-move-medium"
          variant="critical-secondary"
        />
      </Badge>
      <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" isDisabled />}>
        <IconButton
          icon="file-move"
          aria-label="icon-button-critical-secondary-file-move-medium"
          variant="critical-secondary"
          isDisabled
        />
      </Badge>
      <Text>Primary Inverse</Text>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" />}>
          <IconButton
            icon="file-move"
            aria-label="icon-button-primary-inverse-file-move-medium"
            variant="primary-inverse"
          />
        </Badge>
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" isDisabled />}>
          <IconButton
            icon="file-move"
            aria-label="icon-button-primary-inverse-file-move-medium"
            variant="primary-inverse"
            isDisabled
          />
        </Badge>
      </Storybook.Container>
      <Text>Secondary Inverse</Text>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" />}>
          <IconButton
            icon="file-move"
            aria-label="icon-button-secondary-inverse-file-move-medium"
            variant="secondary-inverse"
          />
        </Badge>
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" isDisabled />}>
          <IconButton
            icon="file-move"
            aria-label="icon-button-secondary-inverse-file-move-medium"
            variant="secondary-inverse"
            isDisabled
          />
        </Badge>
      </Storybook.Container>
      <Text>Naked Inverse</Text>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" />}>
          <IconButton
            icon="file-move"
            aria-label="icon-button-naked-inverse-file-move-medium"
            variant="naked-inverse"
          />
        </Badge>
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <Badge hasBorder mark={<BrandSymbol type="credit-key" size="extra-small" isDisabled />}>
          <IconButton
            icon="file-move"
            aria-label="icon-button-naked-inverse-file-move-medium"
            variant="naked-inverse"
            isDisabled
          />
        </Badge>
      </Storybook.Container>
    </SimpleGrid>
  ),
};

export const Disabled: StoryObj<typeof IconButton> = {
  render: () => (
    <SimpleGrid columns={9} gap="s" alignItems="center" justifyContent="center">
      <Text>Primary</Text>
      <Text>Secondary</Text>
      <Text>Tertiary</Text>
      <Text>Naked</Text>
      <Text>Critical</Text>
      <Text>Critical Secondary</Text>
      <Text>Primary Inverse</Text>
      <Text>Secondary Inverse</Text>
      <Text>Naked Inverse</Text>
      <IconButton icon="file-move" aria-label="icon-button-primary-file-move-medium" variant="primary" isDisabled />
      <IconButton icon="file-move" aria-label="icon-button-secondary-file-move-medium" variant="secondary" isDisabled />
      <IconButton icon="file-move" aria-label="icon-button-tertiary-file-move-medium" variant="tertiary" isDisabled />
      <IconButton icon="file-move" aria-label="icon-button-naked-file-move-medium" variant="naked" isDisabled />
      <IconButton icon="file-move" aria-label="icon-button-critical-file-move-medium" variant="critical" isDisabled />
      <IconButton
        icon="file-move"
        aria-label="icon-button-critical-secondary-file-move-medium"
        variant="critical-secondary"
        isDisabled
      />
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          icon="file-move"
          aria-label="icon-button-primary-inverse-file-move-medium"
          variant="primary-inverse"
          isDisabled
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          icon="file-move"
          aria-label="icon-button-secondary-inverse-file-move-medium"
          variant="secondary-inverse"
          isDisabled
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          icon="file-move"
          aria-label="icon-button-naked-inverse-file-move-medium"
          variant="naked-inverse"
          isDisabled
        />
      </Storybook.Container>
    </SimpleGrid>
  ),
};

export const LoadingState: StoryObj<typeof IconButton> = {
  render: () => (
    <SimpleGrid columns={9} gap="s" alignItems="center">
      <Text>Primary</Text>
      <Text>Secondary</Text>
      <Text>Tertiary</Text>
      <Text>Naked</Text>
      <Text>Critical</Text>
      <Text>Critical Secondary</Text>
      <Text>Primary Inverse</Text>
      <Text>Secondary Inverse</Text>
      <Text>Naked Inverse</Text>
      <IconButton icon="file-move" aria-label="icon-button-primary-file-move-loading" variant="primary" isLoading />
      <IconButton icon="file-move" aria-label="icon-button-secondary-file-move-loading" variant="secondary" isLoading />
      <IconButton icon="file-move" aria-label="icon-button-tertiary-file-move-loading" variant="tertiary" isLoading />
      <IconButton icon="file-move" aria-label="icon-button-naked-file-move-loading" variant="naked" isLoading />
      <IconButton icon="file-move" aria-label="icon-button-critical-file-move-loading" variant="critical" isLoading />
      <IconButton
        icon="file-move"
        aria-label="icon-button-critical-secondary-file-move-loading"
        variant="critical-secondary"
        isLoading
      />
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          icon="file-move"
          aria-label="icon-button-primary-inverse-file-move-loading"
          variant="primary-inverse"
          isLoading
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          icon="file-move"
          aria-label="icon-button-secondary-inverse-file-move-loading"
          variant="secondary-inverse"
          isLoading
        />
      </Storybook.Container>
      <Storybook.Container bgColor="semantic.surface.inverse" padding="xs" width="fit-content">
        <IconButton
          icon="file-move"
          aria-label="icon-button-naked-inverse-file-move-loading"
          variant="naked-inverse"
          isLoading
        />
      </Storybook.Container>
    </SimpleGrid>
  ),
};

/**
 * Here's an example of how to use the `IconButton` with a `Tooltip`. The tooltip also appears for a disabled `IconButton`.
 */
export const WithTooltip: StoryObj<typeof IconButton> = {
  render: () => {
    const items = [
      {
        label: 'With tooltip',
        component: (
          <Tooltip content="IconButton with tooltip">
            <IconButton icon="info" aria-label="icon-button-info-medium" variant="naked" />
          </Tooltip>
        ),
      },
      {
        label: 'Disabled IconButton with tooltip',
        component: (
          <Tooltip content="Disabled button with tooltip">
            <IconButton icon="info" aria-label="icon-button-info-medium" variant="naked" isDisabled />
          </Tooltip>
        ),
      },
    ];

    return <Storybook.Row items={items} />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * The button will be rendered as `a` tag element when an `href` is provided in the `link` prop, allowing users to navigate to a different page
 *
 * Accessibility requirements make it that every button that redirects to another page should be an HTML link.
 */
export const ButtonAsLink: StoryObj<typeof IconButton> = {
  args: { link: { href: 'https://www.google.com', target: '_blank' } },
  render: (args) => <IconButton {...args} aria-label="icon-button-chevron-left-medium" />,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
