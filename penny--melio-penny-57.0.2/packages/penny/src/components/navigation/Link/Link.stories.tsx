import { Grid } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { screen } from '@testing-library/react';
import { userEvent } from 'storybook/test';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';

import { Link } from './Link';

const colors = ['default', 'secondary', 'inverse', 'inherit'];
const variants = ['standalone', 'inline'];
const sizes = ['large', 'medium'];

const meta: Meta<typeof Link> = {
  title: 'Navigation Components/Link',
  component: Link,
  argTypes: {
    href: {
      control: 'text',
      description: 'The link address.',
      type: { name: 'string', required: true },
      table: {
        category: 'props',
        type: {
          summary: 'string',
        },
      },
    },
    label: {
      control: 'text',
      description: 'The label of the link.',
      type: { name: 'string', required: true },
      table: {
        category: 'props',
        type: {
          summary: 'string',
        },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Dedicated label for screen-readers (used for accessibility).',
      table: {
        category: 'accessibility',
        type: {
          summary: 'string',
        },
      },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'The variant of the link.',
      table: {
        defaultValue: { summary: 'inline' },
        category: 'props',
        type: {
          summary: getUnionTypeSummary(variants),
        },
      },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'The size of the link - the size being relevant only for the standalone variant.',
      table: {
        defaultValue: { summary: 'medium' },
        category: 'props',
        type: {
          summary: getUnionTypeSummary(sizes),
        },
      },
    },
    shouldSupportEllipsis: {
      control: 'boolean',
      description: 'If passed, would render text-ellipsis when the label is too long.',
      table: {
        category: 'props',
        type: {
          summary: 'boolean',
        },
      },
    },
    onClick: {
      description: 'Handles the click event of the link.',
      table: {
        type: { summary: 'MouseEventHandler<HTMLDivElement>' },
        category: 'events',
      },
    },
    color: {
      control: 'select',
      description: 'The color of the link.',
      options: colors,
      table: {
        category: 'props',
        type: { summary: getUnionTypeSummary(colors) },
        defaultValue: { summary: 'default' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the link is disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    isBold: {
      control: 'boolean',
      description: "Determines if the link's  font is bold - bold styles relevant only for the standalone variant.",
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    newTab: {
      control: 'boolean',
      description: 'Determines whether the link opens in a new browser tab or in the current tab.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: {
        defaultValue: { summary: '${variant}-link' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
  },
  args: {
    href: '#',
    label: 'here',
    variant: 'inline',
    color: 'default',
    isBold: undefined,
    newTab: undefined,
    'data-testid': undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof Link> = {
  render: (args) => {
    if (args.variant === 'standalone') {
      return (
        <Storybook.Container
          w="max-content"
          padding="s-m"
          backgroundColor={args.color === 'inverse' ? 'semantic.surface.inverse' : 'unset'}
          color="semantic.text.primary"
          display="flex"
          alignItems="center"
        >
          <Link {...args} />
        </Storybook.Container>
      );
    }
    return (
      <Text textStyle="body3" color="semantic.text.secondary">
        <Storybook.Container
          w="max-content"
          padding="s-m"
          backgroundColor={args.color === 'inverse' ? 'semantic.surface.inverse' : 'unset'}
          display="flex"
          alignItems="center"
          gap="xxs"
        >
          <Storybook.Container color={args.color === 'inverse' ? 'semantic.surface.inverse' : 'unset'}>
            I&apos;m
          </Storybook.Container>
          <Link {...args} />
        </Storybook.Container>
      </Text>
    );
  },
};

/**
 * ONLY FOR STANDALONE VARIANT
 */
export const Sizes: StoryObj<typeof Link> = {
  render: (args) => (
    <>
      <Storybook.Container>
        <Link {...args} href="#" label="large" variant="standalone" size="large" />
      </Storybook.Container>
      <Storybook.Container>
        <Link {...args} href="#" label="medium" variant="standalone" size="medium" />
      </Storybook.Container>
    </>
  ),
};

export const Variants: StoryObj<typeof Link> = {
  render: (args) => (
    <Group variant="vertical">
      <Text textStyle="body1" color="semantic.text.secondary">
        I&apos;m an <Link {...args} href="#" label="Inline variant" variant="inline" size={undefined} />
      </Text>
      <Link {...args} href="#" label="standalone variant" variant="standalone" size="large" />
    </Group>
  ),
};

export const Colors: StoryObj<typeof Link> = {
  render: (args) => (
    <Grid templateColumns="repeat(4, 1fr)" gap="s" alignItems="center" justifyItems="center">
      <Text textStyle="body2Semi">Default</Text>
      <Text textStyle="body2Semi">Secondary</Text>
      <Text textStyle="body2Semi">Inverse</Text>
      <Group variant="vertical" alignItems="center" spacing="none">
        <Text textStyle="body2Semi">Inherit</Text>
        <Text textStyle="body4Semi">(container is semantic.text.secondary)</Text>
      </Group>
      <Storybook.Container w="max-content" padding="s-m" display="flex" alignItems="center">
        <Link {...args} variant="standalone" color="default" />
      </Storybook.Container>
      <Storybook.Container w="max-content" padding="s-m" display="flex" alignItems="center">
        <Link {...args} variant="standalone" color="secondary" />
      </Storybook.Container>
      <Storybook.Container
        w="max-content"
        padding="s-m"
        backgroundColor="semantic.surface.inverse"
        display="flex"
        alignItems="center"
      >
        <Link {...args} variant="standalone" color="inverse" />
      </Storybook.Container>
      <Storybook.Container
        w="max-content"
        padding="s-m"
        display="flex"
        alignItems="center"
        color="semantic.text.secondary"
      >
        <Link {...args} variant="standalone" color="inherit" />
      </Storybook.Container>
    </Grid>
  ),
};

export const Disabled: StoryObj<typeof Link> = {
  render: (args) => (
    <Grid templateColumns="repeat(4, 1fr)" gap="s" alignItems="center" justifyItems="center">
      <Text textStyle="body2Semi">Default</Text>
      <Text textStyle="body2Semi">Secondary</Text>
      <Text textStyle="body2Semi">Inverse</Text>
      <Group variant="vertical" alignItems="center" spacing="none">
        <Text textStyle="body2Semi">Inherit</Text>
        <Text textStyle="body4Semi">(container is semantic.text.secondary)</Text>
      </Group>
      <Storybook.Container w="max-content" padding="s-m" display="flex" alignItems="center">
        <Link {...args} variant="standalone" color="default" isDisabled />
      </Storybook.Container>
      <Storybook.Container w="max-content" padding="s-m" display="flex" alignItems="center">
        <Link {...args} variant="standalone" color="secondary" isDisabled />
      </Storybook.Container>
      <Storybook.Container
        w="max-content"
        padding="s-m"
        backgroundColor="semantic.surface.inverse"
        display="flex"
        alignItems="center"
      >
        <Link {...args} variant="standalone" color="inverse" isDisabled />
      </Storybook.Container>
      <Storybook.Container
        w="max-content"
        padding="s-m"
        display="flex"
        alignItems="center"
        color="semantic.text.secondary"
      >
        <Link {...args} variant="standalone" color="inherit" isDisabled />
      </Storybook.Container>
    </Grid>
  ),
};

export const Bold: StoryObj<typeof Link> = {
  render: (args) => (
    <Grid templateColumns="repeat(4, 1fr)" gap="s" alignItems="center" justifyItems="center">
      <Text textStyle="body2Semi">Default</Text>
      <Text textStyle="body2Semi">Secondary</Text>
      <Text textStyle="body2Semi">Inverse</Text>
      <Group variant="vertical" alignItems="center" spacing="none">
        <Text textStyle="body2Semi">Inherit</Text>
        <Text textStyle="body4Semi">(container is semantic.text.secondary)</Text>
      </Group>
      <Storybook.Container w="max-content" padding="s-m" display="flex" alignItems="center">
        <Link {...args} variant="standalone" color="default" isBold />
      </Storybook.Container>
      <Storybook.Container w="max-content" padding="s-m" display="flex" alignItems="center">
        <Link {...args} variant="standalone" color="secondary" isBold />
      </Storybook.Container>
      <Storybook.Container
        w="max-content"
        padding="s-m"
        backgroundColor="semantic.surface.inverse"
        display="flex"
        alignItems="center"
      >
        <Link {...args} variant="standalone" color="inverse" isBold />
      </Storybook.Container>
      <Storybook.Container
        w="max-content"
        padding="s-m"
        display="flex"
        alignItems="center"
        color="semantic.text.secondary"
      >
        <Link {...args} variant="standalone" color="inherit" isBold />
      </Storybook.Container>
    </Grid>
  ),
};

export const WithEllipsis: StoryObj<typeof Link> = {
  render: (args) => (
    <Storybook.Container width="180px" padding={isUsingVisualTesting() ? '50px' : 0}>
      <Link
        {...args}
        variant="standalone"
        href="#"
        label="I have a long label which cannot be fully visible"
        size="large"
        shouldSupportEllipsis
        data-testid="link-to-hover"
      />
    </Storybook.Container>
  ),
  play: async () => {
    await userEvent.hover(screen.getByTestId('link-to-hover'), { delay: 100 });
  },
};
