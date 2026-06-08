import type { Meta, StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { Card } from '@/components/containers/cards/Card';
import { Group } from '@/components/containers/Group';

import { NavigationItem } from '../NavigationItem';
import { NavigationList, NavigationListItem } from '.';

/**
 * The `NavigationList` component provides an accessible and customizable way to navigate through a list of items.
 * It supports keyboard navigation, looping behavior, ARIA attributes, and flexible rendering.
 * This component is built on top of the Floating UI `Composite` component.<br/>
 * For more information, see the [Composite documentation](https://floating-ui.com/docs/composite).
 *
 * Use `NavigationListItem` to define individual items within the list.
 * This component is built on top of the Floating UI `CompositeItem` component.<br/>
 * For more information, see the [CompositeItem documentation](https://floating-ui.com/docs/composite#compositeitem).
 */

const meta: Meta<typeof NavigationList> = {
  title: 'Internal Components/Navigation List',
  component: NavigationList,
  argTypes: {
    render: {
      control: false,
      description: 'Custom wrapper element or component (e.g., `<Group />` or `<Card />`) used to layout the items.',
      table: { category: 'props', type: { summary: 'ReactElement' } },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical', 'both'],
      description:
        'Defines the keyboard navigation direction and ARIA orientation<br/>' +
        '**Note: This does not affect visual layout** — use `render` or container styling for layout.\n' +
        '- "horizontal": Use arrow left/right keys\n' +
        '- "vertical": Use arrow up/down keys\n' +
        '- "both": Enables 2D grid-like navigation\n\n',
      table: {
        category: 'props',
        type: { summary: '"horizontal" | "vertical" | "both"' },
        defaultValue: { summary: '"both"' },
      },
    },
    role: {
      control: 'select',
      options: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
      description:
        'Sets the ARIA role for the list, helping assistive tech understand the list’s structure and behavior.',
      table: {
        category: 'props',
        type: {
          summary: '"listbox" | "menu" | "menubar" | "radiogroup" | "tablist" | "tree" | "treegrid"',
        },
      },
    },
    loop: {
      control: 'boolean',
      description: 'Whether navigation loops around from last to first and vice versa. Useful for keyboard users.',
      table: {
        category: 'props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    cols: {
      control: 'number',
      description: 'When `orientation="both"`, this defines the number of columns (i.e. for grid navigation).',
      table: { category: 'props', type: { summary: 'number' }, defaultValue: { summary: '1' } },
    },
    disabledIndices: {
      control: 'object',
      description: 'Array of indices to disable. These items are not focusable or interactive.',
      table: { category: 'props', type: { summary: 'number[]' } },
    },
    activeIndex: {
      control: 'number',
      description: 'The index of the currently active (focused) item. Can be used to programmatically control focus.',
      table: { category: 'props', type: { summary: 'number' } },
    },
    onNavigate: {
      description: 'Callback called with the new index when navigation occurs.',
      table: { category: 'events', type: { summary: '(index: number) => void' } },
    },
  },
  args: {
    orientation: 'both',
    loop: true,
    cols: 1,
  },
};

export default meta;

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

export const Main: StoryObj<typeof NavigationList> = {
  render: (args) => (
    <NavigationList {...args} render={<Group variant="vertical" />}>
      {items.map((label, index) => (
        <NavigationListItem key={index} render={<Storybook.ContentPlaceholder label={label} width="fit-content" />} />
      ))}
    </NavigationList>
  ),
};

/** Use the `render` prop to customize the wrapper element for `NavigationList`
 * and `NavigationListItem`. <br />
 *
 * **You can pass:**<br />
 *   • A JSX element `render={<Card />}`<br />
 *   • A function that returns an element `render={(htmlProps) => <Card {...htmlProps} />}`<br />
 *
 * **Important:**<br />
 * When using the `render` prop You **must forward the `ref`** to the DOM element.<br />
 *
 * These steps are required to ensure keyboard navigation and accessibility work properly.<br /><br />
 *
 * In this example:<br />
 * - `<Card>` wraps the entire list.<br />
 * - `<NavigationItem>` wraps each item.
 **/
export const RenderFunction: StoryObj<typeof NavigationList> = {
  render: () => (
    <NavigationList role="menu" orientation="horizontal" render={<Card />}>
      {items.map((label, index) => (
        <NavigationListItem key={index} role="menuitem" render={<NavigationItem>{label}</NavigationItem>} />
      ))}
    </NavigationList>
  ),
};

/** The disabledIndices prop makes the navigation skip specific items during keyboard navigation.
 ** It doesn't change the item's appearance or apply any attributes like aria-disabled—you'll need to handle that separately.
 **/
export const DisabledIndices: StoryObj<typeof NavigationList> = {
  render: () => (
    <NavigationList render={<Group variant="vertical" />} disabledIndices={[1]}>
      {items.map((label, index) => (
        <NavigationListItem key={index} render={<Storybook.ContentPlaceholder label={label} />} />
      ))}
    </NavigationList>
  ),
};

export const Columns: StoryObj<typeof NavigationList> = {
  render: () => (
    <NavigationList role="grid" orientation="both" cols={3} render={<Group variant="vertical" />}>
      <Group variant="horizontal" role="row">
        <NavigationListItem
          key={0}
          role="gridcell"
          render={<Storybook.ContentPlaceholder label="Item 1" width="85px" />}
        />
        <NavigationListItem
          key={1}
          role="gridcell"
          render={<Storybook.ContentPlaceholder label="Item 2" width="85px" />}
        />
        <NavigationListItem
          key={2}
          role="gridcell"
          render={<Storybook.ContentPlaceholder label="Item 3" width="85px" />}
        />
      </Group>
      <Group variant="horizontal" role="row">
        <NavigationListItem
          key={3}
          role="gridcell"
          render={<Storybook.ContentPlaceholder label="Item 4" width="85px" />}
        />
        <NavigationListItem
          key={4}
          role="gridcell"
          render={<Storybook.ContentPlaceholder label="Item 5" width="85px" />}
        />
        <NavigationListItem
          key={5}
          role="gridcell"
          render={<Storybook.ContentPlaceholder label="Item 6" width="85px" />}
        />
      </Group>
    </NavigationList>
  ),
};

export const Vertical: StoryObj<typeof NavigationList> = {
  render: () => (
    <NavigationList role="menu" orientation="vertical" render={<Group variant="vertical" />}>
      {items.map((label, index) => (
        <NavigationListItem key={index} role="menuitem" render={<Storybook.ContentPlaceholder label={label} />} />
      ))}
    </NavigationList>
  ),
};

export const Horizontal: StoryObj<typeof NavigationList> = {
  render: () => (
    <NavigationList role="menu" orientation="horizontal" render={<Group variant="horizontal" />}>
      {items.map((label, index) => (
        <NavigationListItem
          key={index}
          role="menuitem"
          render={<Storybook.ContentPlaceholder width="fit-content" label={label} />}
        />
      ))}
    </NavigationList>
  ),
};

export const KeyboardLooping: StoryObj<typeof NavigationList> = {
  render: () => (
    <NavigationList role="menu" orientation="horizontal" loop render={<Group variant="horizontal" />}>
      {items.map((label, index) => (
        <NavigationListItem
          key={index}
          role="menuitem"
          render={<Storybook.ContentPlaceholder width="fit-content" label={label} />}
        />
      ))}
    </NavigationList>
  ),
};
