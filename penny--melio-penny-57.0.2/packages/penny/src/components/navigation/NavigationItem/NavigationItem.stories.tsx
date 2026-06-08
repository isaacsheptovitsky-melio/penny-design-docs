import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Container } from '@/components/containers/Container';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { Icon } from '@/components/foundations/Icon';

import { NavigationItem } from './NavigationItem';

const linkProps = `{
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}`;

/**
 * The Navigation Item component is a versatile component used for navigation purposes, capable of rendering as either a link or a button. <br />
 * This flexibility allows it to be used in various contexts within your application, such as navigation bars, action panels, or interactive lists.
 **/

const meta: Meta<typeof NavigationItem> = {
  title: 'Navigation Components/Navigation Item',
  component: NavigationItem,
  argTypes: {
    children: {
      control: false,
      description: 'The content of the navigation item.',
      type: { name: 'other', value: 'ReactNode', required: true },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    link: {
      control: 'object',
      description: 'The link props for the navigation item.<br />If defined - the item will be rendered as `a` tag.',
      table: {
        type: { summary: 'object', detail: linkProps },
        category: 'props',
      },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'navigation-item' }, type: { summary: 'string' }, category: 'tests' },
    },
    role: {
      control: 'text',
      description: 'The semantic meaning of the element.',
      table: {
        type: { summary: 'AriaRole' },
        category: 'accessibility',
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
    as: {
      control: 'text',
      description:
        'Change the renders tag element.<br />A classic use-case is when you are rendering a custom button as content, and you need the nav item to render as div.',
      table: {
        category: 'props',
        defaultValue: { summary: 'button' },
      },
    },
    isSelected: {
      control: 'boolean',
      description: 'Determines if the item is selected.',
      table: {
        defaultValue: { summary: 'false' },
        category: 'props',
        type: { summary: 'boolean' },
      },
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Determines if the item should take the full width of its container.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onClick: {
      action: 'clicked',
      description: 'Handles the click event on the component.',
      table: {
        type: { summary: 'MouseEventHandler<HTMLButtonElement>' },
        category: 'events',
      },
    },
  },
  args: {
    children: <Storybook.ContentPlaceholder label="Slot" />,
    link: undefined,
    isFullWidth: false,
    isSelected: false,
    'data-testid': 'navigation-item',
  },
};
export default meta;

/**
 * The NavigationItem comes with a default style that includes:
 * - Font Color: Neutral-1000 (black)
 * - Text Style: Body3
 */
export const Main: StoryObj<typeof NavigationItem> = {
  render: () => {
    const items = [
      {
        label: 'Default',
        component: <NavigationItem>Nav item label</NavigationItem>,
      },
      {
        label: 'Custom',
        component: (
          <NavigationItem>
            <Storybook.ContentPlaceholder label="Slot" />
          </NavigationItem>
        ),
      },
    ];
    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};

export const Selected: StoryObj<typeof NavigationItem> = {
  render: () => {
    const items = [
      {
        label: 'Default',
        component: <NavigationItem isSelected>Nav item label</NavigationItem>,
      },
      {
        label: 'Custom',
        component: (
          <NavigationItem isSelected>
            <Storybook.ContentPlaceholder label="Slot" />
          </NavigationItem>
        ),
      },
    ];
    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
};

export const CustomContent: StoryObj<typeof NavigationItem> = {
  render: () => {
    const items = [
      {
        label: 'Vertical',
        component: (
          <NavigationItem>
            <Group variant="vertical" spacing="xxs" alignItems="center">
              <Icon size="small" type="add-bill" color="inherit" aria-hidden />
              <Text textStyle="inline">Nav item label</Text>
            </Group>
          </NavigationItem>
        ),
      },
      {
        label: 'Horizontal',
        component: (
          <NavigationItem>
            <Group variant="horizontal" spacing="xs-s" alignItems="center">
              <Icon size="small" type="add-bill" color="inherit" />
              <Text textStyle="inline">Nav item label</Text>
            </Group>
          </NavigationItem>
        ),
      },
      {
        label: 'Icon Only',
        component: (
          <Tooltip content="Settings" placement="right">
            <NavigationItem aria-label="settings-button">
              <Container paddingY="xxxs" alignItems="center">
                <Icon size="large" type="settings" color="inherit" />
              </Container>
            </NavigationItem>
          </Tooltip>
        ),
      },
    ];
    return <Storybook.Row items={items} alignCompLabel="vertical" />;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const FullWidth: StoryObj<typeof NavigationItem> = {
  render: (args) => <NavigationItem {...args} isFullWidth />,
};

/**
 * The navigation item will be rendered as `a` tag element when an `href` is provided in the `link` prop, allowing users to navigate to a different page.
 *
 * Accessibility requirements make it that every button that redirects to another page should be an HTML link.
 */
export const AsLink: StoryObj<typeof NavigationItem> = {
  args: { link: { href: 'https://www.google.com', target: '_parent' } },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
