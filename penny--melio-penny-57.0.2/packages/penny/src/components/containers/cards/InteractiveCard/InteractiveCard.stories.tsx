import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { getUnionTypeSummary, isUsingVisualTesting } from '@/test-utils/storybook.utils';
import { themeSpaceKeys } from '@/theme/foundations/spaces';

import { Group } from '../../Group';
import { ariaRoleType } from '../Card/Card.types';
import { InteractiveCard } from './InteractiveCard';

const widthOptions = ['full', 'min-content', 'fit-content'];

/**
 * The `InteractiveCard` component is based on `Card` and extends its styles to reflect interaction states.<br/>
 *
 * <b>Features:</b>
 * - Supports a selected state, which can be set using the `selected` prop.
 * - Supports disabled or readonly states, configurable with `disabled` and `readOnly` props.
 * - Extends `HTMLAttributes<HTMLDivElement>`, supporting all default attributes and events (e.g., ARIA, role, onClick).
 * - Styles respond to user interactions (hover/focus) when it is clickable (onClick provided).
 */
const meta: Meta<typeof InteractiveCard> = {
  title: 'Containers/Cards/Interactive Card [pattern]',
  component: InteractiveCard,
  argTypes: {
    children: {
      description: 'The content of the InteractiveCard.',
      control: false,
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    variant: {
      description: 'The type of the InteractiveCard.',
      control: 'select',
      options: ['default', 'flat'],
      table: {
        defaultValue: { summary: 'default' },
        category: 'props',
        type: { summary: 'default | flat' },
      },
    },
    paddingX: {
      control: 'select',
      options: Object.keys(themeSpaceKeys),
      description: "The InteractiveCard's x-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(Object.values(themeSpaceKeys)) },
        defaultValue: { summary: 'm' },
        category: 'props',
      },
    },
    paddingY: {
      control: 'select',
      options: Object.keys(themeSpaceKeys),
      description: "The InteractiveCard's y-axis padding.",
      table: {
        type: { summary: getUnionTypeSummary(Object.values(themeSpaceKeys)) },
        defaultValue: { summary: 'm' },
        category: 'props',
      },
    },
    width: {
      description: 'The width behavior of the InteractiveCard.',
      control: 'select',
      options: widthOptions,
      table: {
        defaultValue: { summary: 'full' },
        type: { summary: getUnionTypeSummary(widthOptions) },
        category: 'props',
      },
    },
    selected: {
      control: 'boolean',
      description: 'Determines if the component is selected.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Determines if the component is disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    readOnly: {
      control: 'boolean',
      description: 'Determines if the component is readonly.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    onClick: {
      description: 'An event for when clicking the InteractiveCard.',
      table: { category: 'events' },
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
        defaultValue: { summary: 'interactive-card' },
        type: { summary: 'string' },
        category: 'tests',
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description:
        'The button type attribute. Only used when onClick is provided. Will be ignored if onClick is not present.',
      table: {
        defaultValue: { summary: 'button' },
        category: 'props',
      },
    },
  },
  args: {
    children: undefined,
    variant: 'default',
    selected: false,
    disabled: false,
    readOnly: false,
    paddingX: 'm',
    paddingY: 'm',
    'data-testid': 'interactive-card',
    width: 'full',
    onClick: noop,
  },
};
export default meta;

export const Main: StoryObj<typeof InteractiveCard> = {
  render: (args) => {
    const [counter, setCounter] = useState(0);
    return (
      <InteractiveCard {...args} onClick={() => setCounter((prev) => prev + 1)}>
        <Storybook.ContentPlaceholder
          isDisabled={args.disabled}
          label={counter ? `InteractiveCard clicked ${counter} times` : undefined}
        />
      </InteractiveCard>
    );
  },
};

/**
 * Clickable InteractiveCard has styles that respond to user interactions (hover/focus).
 */
export const Clickable: StoryObj<typeof InteractiveCard> = {
  args: {
    ...meta.args,
    selected: undefined,
  },
  render: (args) => {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);

    return (
      <Group>
        <InteractiveCard {...args} onClick={() => setCounter1((prev) => prev + 1)}>
          <Storybook.ContentPlaceholder label={counter1 ? `InteractiveCard clicked ${counter1} times` : 'Default'} />
        </InteractiveCard>
        <InteractiveCard {...args} variant="flat" onClick={() => setCounter2((prev) => prev + 1)}>
          <Storybook.ContentPlaceholder label={counter2 ? `InteractiveCard clicked ${counter2} times` : 'Flat'} />
        </InteractiveCard>
      </Group>
    );
  },
  parameters: {
    pseudo: { hover: isUsingVisualTesting() },
  },
};

/**
 * The `selected` prop visually marks the InteractiveCard as selected.
 *
 * When the component is also clickable (i.e., `onClick` is provided), the `selected` state can be toggled dynamically to reflect user interaction.
 * In this example, clicking the card will toggle its selected state between true and false.
 *
 * Additionally, when both `selected` and `onClick` are provided, the component includes `aria-pressed` for improved accessibility, indicating a toggle button behavior.
 */
export const Selected: StoryObj<typeof InteractiveCard> = {
  args: {
    ...meta.args,
    selected: true,
  },
  render: ({ selected, ...args }) => {
    const [selected1, setSelected1] = useState(selected);
    const [selected2, setSelected2] = useState(selected);
    return (
      <Group>
        <InteractiveCard {...args} selected={selected1} onClick={() => setSelected1(!selected1)}>
          <Storybook.ContentPlaceholder label="Default" />
        </InteractiveCard>
        <InteractiveCard {...args} variant="flat" selected={selected2} onClick={() => setSelected2(!selected2)}>
          <Storybook.ContentPlaceholder label="Flat" />
        </InteractiveCard>
      </Group>
    );
  },
};

/**
 * Use the `readOnly` prop to make the InteractiveCard non-interactive while keeping it visually present.
 *
 * This is especially relevant when the card is normally clickable (i.e., when an `onClick` handler is provided).
 *
 * In read-only mode:
 * - The card is not focusable and does not respond to click or keyboard events.
 * - Hover, active, and focus styles are disabled to signal that interaction is not allowed.
 * - This mode is useful when the card’s appearance and semantics should be preserved,
 *   but user interaction should be temporarily prevented — for example, during a loading or transition state.
 */
export const ReadOnly: StoryObj<typeof InteractiveCard> = {
  args: {
    ...meta.args,
    selected: undefined,
  },
  render: (args) => (
    <Group>
      <InteractiveCard {...args} readOnly>
        <Storybook.ContentPlaceholder label="Default" />
      </InteractiveCard>
      <InteractiveCard {...args} variant="flat" readOnly>
        <Storybook.ContentPlaceholder label="Flat" />
      </InteractiveCard>
    </Group>
  ),
};

/**
 * Use the `disabled` prop to fully disable the InteractiveCard.
 *
 * This is especially relevant when the card is clickable (`onClick` is provided).
 * In disabled mode:
 * - The card is non-interactive and not focusable via keyboard.
 * - It is announced by screen readers as disabled when applicable.
 * - Visual styles clearly indicate that the card is disabled.
 *
 * This state helps communicate to all users, including assistive technology users,
 * that the card is currently not available for interaction.
 */
export const Disabled: StoryObj<typeof InteractiveCard> = {
  args: {
    ...meta.args,
    selected: undefined,
  },
  render: (args) => (
    <Group>
      <InteractiveCard {...args} disabled>
        <Storybook.ContentPlaceholder label="Default" isDisabled />
      </InteractiveCard>
      <InteractiveCard {...args} variant="flat" disabled>
        <Storybook.ContentPlaceholder label="Flat" isDisabled />
      </InteractiveCard>
    </Group>
  ),
};
