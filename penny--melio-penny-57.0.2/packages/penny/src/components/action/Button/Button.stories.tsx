import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';

import { Button } from './Button';
import { type ButtonVariants, buttonVariants } from './Button.types';
import { DEFAULT_DATA_TEST_ID } from './button.utils';

const linkProps = `{
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}`;

const meta: Meta<typeof Button> = {
  title: 'Action Components/Button',
  component: Button,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button.',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: "'small' | 'medium' | 'large'" },
        category: 'props',
      },
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
      description: 'The aria-label for the button. **use only if you need to override the visual label**.',
      table: {
        type: { summary: 'string' },
        category: 'accessibility',
      },
    },
    variant: {
      control: 'select',
      options: buttonVariants as readonly ButtonVariants[],
      description: 'The variant of the button.',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: (buttonVariants as readonly string[]).join(' | ') },
        category: 'props',
      },
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
    isFullWidth: {
      control: 'boolean',
      description: 'Determines if the button should take the full width of its container.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
        category: 'props',
      },
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
    onClick: {
      action: 'clicked',
      description: 'Handles the click event of the button.',
      table: {
        type: { summary: 'MouseEventHandler<HTMLButtonElement>' },
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
    loadingText: {
      control: 'text',
      description:
        'For accessibility, it is important to add a fallback loading text. This text will be visible only to screen readers.',
      table: {
        category: 'accessibility',
        defaultValue: { summary: 'Loading...' },
        type: { summary: 'string' },
      },
    },
    hideLoadingText: {
      control: 'boolean',
      description:
        'To prevent rendering the loading text, set `hideLoadingText` to true, the loading component uses the aria-busy attribute. However, this causes a violation with other elements that require specific aria-children roles, such as the table in its loading state.',
      table: {
        category: 'accessibility',
        type: { summary: 'boolean' },
      },
    },
    'aria-labelledby': {
      control: 'text',
      description:
        'A space-separated list of element IDs whose associated labels should be read when the button is focused.<br /> This is used to provide a descriptive label while also indicating the loading state.',
      table: {
        category: 'accessibility',
        type: { summary: 'string' },
      },
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
    label: 'Click me',
    variant: 'primary',
    size: 'medium',
    isDisabled: false,
    isLoading: false,
    isFullWidth: false,
    link: undefined,
    leftElement: undefined,
    rightElement: undefined,
    'data-testid': undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof Button> = {
  render: (args) => (
    <Storybook.Container
      display="inline-block"
      borderRadius="global.200"
      backgroundColor={
        args.variant === 'primary-inverse' || args.variant === 'secondary-inverse' ? 'global.brand.700' : undefined
      }
      padding="s"
    >
      <Button {...args} />
    </Storybook.Container>
  ),
};

export const Variants: StoryObj<typeof Button> = {
  render: (args) => (
    <Group variant="vertical" alignItems="center">
      <Button {...args} label="Primary" />
      <Storybook.Container
        display="flex"
        backgroundColor="global.brand.700"
        height="100px"
        width="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Button {...args} label="Primary Inverse" variant="primary-inverse" />
      </Storybook.Container>
      <Button {...args} variant="secondary" label="Secondary" />
      <Storybook.Container
        display="flex"
        backgroundColor="global.brand.700"
        height="100px"
        width="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Button {...args} label="Secondary Inverse" variant="secondary-inverse" />
      </Storybook.Container>
      <Button {...args} variant="tertiary" label="Tertiary" />
      <Button {...args} variant="success" label="Success" />
      <Button {...args} variant="critical" label="Critical" />
      <Button {...args} variant="critical-secondary" label="Critical Secondary" />
    </Group>
  ),
};

export const Sizes: StoryObj<typeof Button> = {
  render: (args) => (
    <Group alignItems="center">
      <Button {...args} label="Small" size="small" />
      <Button {...args} label="Medium" size="medium" />
      <Button {...args} label="Large" size="large" />
    </Group>
  ),
};

export const Disabled: StoryObj<typeof Button> = {
  render: (args) => (
    <Group variant="vertical" alignItems="center">
      <Button {...args} label="Primary" isDisabled />
      <Storybook.Container
        display="flex"
        backgroundColor="global.brand.700"
        height="100px"
        width="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Button {...args} variant="primary-inverse" label="Primary Inverse" isDisabled />
      </Storybook.Container>
      <Button {...args} variant="secondary" isDisabled label="Secondary" />
      <Storybook.Container
        display="flex"
        backgroundColor="global.brand.700"
        height="100px"
        width="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Button {...args} variant="secondary-inverse" label="Secondary Inverse" isDisabled />
      </Storybook.Container>
      <Button {...args} variant="tertiary" isDisabled label="Tertiary" />
      <Button {...args} variant="success" isDisabled label="Success" />
      <Button {...args} variant="critical" isDisabled label="Critical" />
      <Button {...args} variant="critical-secondary" isDisabled label="Critical Secondary" />
    </Group>
  ),
};

export const LeftAndRightElements: StoryObj<typeof Button> = {
  render: () => (
    <Button
      size="medium"
      label="Button"
      leftElement={<Icon size="small" type="add" color="inherit" aria-hidden />}
      rightElement={<Icon size="small" type="caret-down" color="inherit" aria-hidden />}
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

/**
 * The button can enter a loading state, during which a loading spinner appears in the button's content.<br />
 */
export const LoadingState: StoryObj<typeof Button> = {
  render: (args) => (
    <Group variant="vertical" alignItems="center">
      <Button {...args} label="Primary" isLoading />
      <Storybook.Container
        display="flex"
        backgroundColor="global.brand.700"
        height="100px"
        width="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Button {...args} variant="primary-inverse" label="Primary Inverse" isLoading />
      </Storybook.Container>
      <Button {...args} variant="secondary" label="Secondary" isLoading />
      <Storybook.Container
        display="flex"
        backgroundColor="global.brand.700"
        height="100px"
        width="200px"
        justifyContent="center"
        alignItems="center"
      >
        <Button {...args} variant="secondary-inverse" label="Secondary Inverse" isLoading />
      </Storybook.Container>
      <Button {...args} variant="tertiary" label="Tertiary" isLoading />
      <Button {...args} variant="success" label="Success" isLoading />
      <Button {...args} variant="critical" label="Critical" isLoading />
      <Button {...args} variant="critical-secondary" label="Critical Secondary" isLoading />
    </Group>
  ),
};

export const FullWidth: StoryObj<typeof Button> = {
  args: { isFullWidth: true, label: 'Button' },
};

/**
 * The button will be rendered as `a` tag element when an `href` is provided in the `link` prop, allowing users to navigate to a different page
 *
 * Accessibility requirements make it that every button that redirects to another page should be an HTML link.
 */
export const ButtonAsLink: StoryObj<typeof Button> = {
  args: { link: { href: 'https://www.google.com', target: '_parent' } },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
