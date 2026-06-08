import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';

import { NakedButton } from './NakedButton';

const linkProps = `{
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}`;

const meta: Meta<typeof NakedButton> = {
  title: 'Action Components/Naked Button',
  component: NakedButton,
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: 'The size of the button.',
      table: { defaultValue: { summary: 'medium' }, type: { summary: 'medium | large' }, category: 'props' },
    },
    label: {
      control: 'text',
      description: 'The text inside the button',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Dedicated label for screen-readers (used for accessibility).',
      table: {
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'invert', 'critical'],
      description: 'The variant of the button.',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | invert | critical' },
        category: 'props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Determines if the button is disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: '${variant}-naked-button' }, type: { summary: 'string' }, category: 'tests' },
    },
    onClick: {
      control: false,
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
    shouldSupportEllipsis: {
      control: 'boolean',
      description: 'Determines if a long label should be truncated.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    leftElement: {
      control: false,
      description: 'An element to be displayed on the left side of the label.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
    rightElement: {
      control: false,
      description: 'An element to be displayed on the right side of the label.',
      table: {
        category: 'props',
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Button',
    link: undefined,
    onClick: undefined,
    isDisabled: false,
    shouldSupportEllipsis: false,
    'aria-label': undefined,
    'data-testid': undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof NakedButton> = {};

export const ShouldSupportEllipsis: StoryObj<typeof NakedButton> = {
  render: (args) => (
    <Storybook.Container width="70px">
      <NakedButton {...args} variant="primary" label="long long label" shouldSupportEllipsis />
    </Storybook.Container>
  ),
};

export const Variants: StoryObj<typeof NakedButton> = {
  render: (args) => (
    <Group>
      <NakedButton {...args} variant="primary" label="primary" />
      <NakedButton {...args} variant="secondary" label="secondary" />
      <NakedButton {...args} variant="critical" label="critical" />
      <Storybook.Container
        padding="xs"
        borderRadius="global.200"
        bgColor="semantic.surface.inverse"
        width="fit-content"
      >
        <NakedButton {...args} variant="invert" label="invert" />
      </Storybook.Container>
    </Group>
  ),
};

export const Sizes: StoryObj<typeof NakedButton> = {
  render: (args) => (
    <Group variant="vertical">
      <Group>
        <NakedButton {...args} size="medium" variant="primary" label="medium" />
        <NakedButton {...args} size="large" variant="primary" label="large" />
      </Group>

      <Group>
        <NakedButton {...args} size="medium" variant="secondary" label="medium" />
        <NakedButton {...args} size="large" variant="secondary" label="large" />
      </Group>

      <Group>
        <NakedButton {...args} size="medium" variant="critical" label="medium" />
        <NakedButton {...args} size="large" variant="critical" label="large" />
      </Group>

      <Group>
        <Storybook.Container
          padding="xs"
          borderRadius="global.200"
          bgColor="semantic.surface.inverse"
          width="fit-content"
        >
          <NakedButton {...args} size="medium" variant="invert" label="medium" />
        </Storybook.Container>
        <Storybook.Container
          padding="xs"
          borderRadius="global.200"
          bgColor="semantic.surface.inverse"
          width="fit-content"
        >
          <NakedButton {...args} size="large" variant="invert" label="large" />
        </Storybook.Container>
      </Group>
    </Group>
  ),
};

export const Disabled: StoryObj<typeof NakedButton> = {
  render: (args) => (
    <Group>
      <NakedButton {...args} variant="primary" label="primary" isDisabled />
      <NakedButton {...args} variant="secondary" label="secondary" isDisabled />
      <NakedButton {...args} variant="critical" label="critical" isDisabled />
      <Storybook.Container
        padding="xs"
        borderRadius="global.200"
        bgColor="semantic.surface.inverse"
        width="fit-content"
      >
        <NakedButton {...args} variant="invert" label="invert" isDisabled />
      </Storybook.Container>
    </Group>
  ),
};

/**
 * Example showcasing left and right elements.<br />	Also demonstrates support for ellipsis.
 */
export const LeftAndRightElements: StoryObj<typeof NakedButton> = {
  render: (args) => (
    <NakedButton
      {...args}
      label="Button"
      leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
      rightElement={<Icon size="small" type="caret-down" color="inherit" aria-hidden />}
    />
  ),
};

/**
 * The button will be rendered as `a` tag element when an `href` is provided in the `link` prop, allowing users to navigate to a different page
 *
 * Accessibility requirements make it that every button that redirects to another page should be an HTML link.
 */
export const ButtonAsLink: StoryObj<typeof NakedButton> = {
  args: { link: { href: 'https://www.google.com', target: '_blank' } },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
