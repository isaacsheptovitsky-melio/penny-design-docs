import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { Storybook } from 'storybook-utils';

import { StatusIconSolid } from '@/components/foundations/StatusIconSolid';

import { Group } from '../../Group';
import { CollapsibleCard } from './CollapsibleCard';
import type { BaseCollapsibleCardProps } from './CollapsibleCard.types';

const getHeaderOrTitleProps = ({
  title,
  header,
  description,
}: Pick<BaseCollapsibleCardProps, 'title' | 'header' | 'description'>):
  | { title: string; description?: string }
  | { header: ReactNode } =>
  title ? { title, description } : { header: <Storybook.ContentPlaceholder label={header as string} /> };

/**
 * The `CollapsibleCard` based on the `InteractiveCard` component to provide interactivity.
 *
 * ### Key Features:
 * - **Flexible Content**: Accepts any free content as children.
 * - **Customizable Header**: Provides default styles for a header with a title and description, or allows custom header content via the `header` prop.
 * - **Accessible by Design**:
 *   - Prevents accessibility violations caused by nested interactive elements as header's content or children.
 *   - Ensures focus management and correct ARIA attributes for assistive technologies.
 */
const meta: Meta<typeof CollapsibleCard> = {
  title: 'Containers/Cards/Collapsible Card [pattern]',
  component: CollapsibleCard,
  parameters: { docs: { source: { type: 'dynamic' } } },
  argTypes: {
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'collapsible-card' }, type: { summary: 'string' }, category: 'tests' },
    },
    title: {
      control: 'text',
      type: { required: true, name: 'string' },
      description: 'The main label of the card.<br />**Either this or `header` are allowed.**',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    description: {
      control: 'text',
      description: 'The text shown below the title.',
      table: { type: { summary: 'string' }, category: 'props' },
    },
    defaultIsExpanded: {
      control: 'boolean',
      description:
        'The initial state of `isExpanded` (when disabled/readOnly true `defaultIsExpanded` is not supported)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    children: {
      type: { required: true, name: 'string' },
      control: false,
      description: 'The element that is exposed when `isExpanded` is true.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    header: {
      control: 'text',
      type: { required: true, name: 'string' },
      description:
        'The element that renders the header of the collapsible card.<br />**Either this or `title` are allowed.**',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    titleRightElement: {
      control: false,
      description: 'Element displayed on the right side of the title. Commonly used to render a status icon.',
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Determines if the component is disabled.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    readOnly: {
      control: 'boolean',
      description: 'Determines if the component is readOnly.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    onClick: {
      action: 'onClick',
      description: 'Callback when the component is clicked.',
      table: { type: { summary: 'MouseEventHandler<HTMLDivElement>' }, category: 'events' },
    },
    isExpanded: {
      control: 'boolean',
      description: 'Determines if the component is expanded, for controlled collapsibleCard',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'props' },
    },
    onExpandChange: {
      action: 'onExpandChange',
      description: 'Callback for controlled collapsibleCard, the expanded state should be controlled from outside.',
      table: { type: { summary: 'MouseEventHandler<HTMLDivElement>' }, category: 'events' },
    },
  },
  args: {
    title: 'Heading text',
    description: '',
    titleRightElement: undefined,
    header: undefined,
    children: <Storybook.ContentPlaceholder height="200px" />,
    defaultIsExpanded: true,
    isExpanded: undefined,
    disabled: false,
    readOnly: false,
    onClick: undefined,
    onExpandChange: undefined,
    'data-testid': 'collapsible-card',
  },
};
export default meta;

export const Main: StoryObj<typeof CollapsibleCard> = {
  render: ({ title, description, header, disabled, readOnly, defaultIsExpanded, isExpanded, ...args }) => {
    const [reset, setReset] = useState(defaultIsExpanded);

    useEffect(() => {
      setReset(false);
      setTimeout(() => setReset(true));
    }, [defaultIsExpanded]);

    return (
      <>
        {reset && (
          <CollapsibleCard
            {...args}
            disabled={disabled}
            readOnly={readOnly}
            defaultIsExpanded={defaultIsExpanded}
            {...getHeaderOrTitleProps({ title, description, header })}
          />
        )}
      </>
    );
  },
  parameters: { docs: { source: { type: 'code' } } },
};

export const WithDescription: StoryObj<typeof CollapsibleCard> = {
  render: ({ title, header, description, ...args }) => (
    <CollapsibleCard
      {...args}
      {...getHeaderOrTitleProps({ title, description: 'Description', header })}
      {...((args.disabled || args.readOnly) && { defaultIsExpanded: undefined, isExpanded: undefined })}
    />
  ),
};

/**
 * Renders a `CollapsibleCard` with a success status icon.
 *
 * Accessibility:
 * - If the status icon is purely decorative or redundant (e.g., the status is already conveyed via text), use `aria-hidden`.
 * - If the icon conveys meaningful status (e.g., success, error), provide accessible context using `role="img"` and `aria-label="..."`.
 *
 * Example:
 * `<StatusIconSolid role="img" aria-label="Completed" />`
 */
export const WithStatusSuccess: StoryObj<typeof CollapsibleCard> = {
  render: ({ title, header, description, ...args }) => (
    <CollapsibleCard
      {...args}
      {...getHeaderOrTitleProps({ title, description: 'Description', header })}
      titleRightElement={
        <StatusIconSolid
          variant="success"
          size="medium"
          isReadOnly={args.readOnly}
          isDisabled={args.disabled}
          aria-hidden
        />
      }
      {...((args.disabled || args.readOnly) && { defaultIsExpanded: undefined, isExpanded: undefined })}
    />
  ),
};

export const Disabled: StoryObj<typeof CollapsibleCard> = {
  args: {
    disabled: true,
  },
  render: ({ title, header, description, disabled, ...args }) => (
    <CollapsibleCard
      disabled={disabled}
      {...args}
      {...getHeaderOrTitleProps({ title, description: 'Description', header })}
      titleRightElement={<StatusIconSolid variant="success" size="medium" isDisabled={disabled} aria-hidden />}
      {...{ defaultIsExpanded: undefined, isExpanded: undefined }}
    />
  ),
};

export const ReadOnly: StoryObj<typeof CollapsibleCard> = {
  args: {
    readOnly: true,
  },
  render: ({ title, header, description, readOnly, ...args }) => (
    <CollapsibleCard
      {...args}
      {...getHeaderOrTitleProps({ title, description: 'Description', header })}
      readOnly={readOnly}
      titleRightElement={<StatusIconSolid variant="success" size="medium" isReadOnly={readOnly} aria-hidden />}
      {...{ defaultIsExpanded: undefined, isExpanded: undefined }}
    />
  ),
};

export const WithCustomHeader: StoryObj<typeof CollapsibleCard> = {
  render: (args) => (
    <CollapsibleCard header={<Storybook.ContentPlaceholder height="50px" label="Header" />}>
      {args.children}
    </CollapsibleCard>
  ),
};

export const Controlled: StoryObj<typeof CollapsibleCard> = {
  render: (args) => {
    const [expanded, setExpanded] = useState(false);

    const { onExpandChange, header, ...otherProps } = args;

    const handleExpandChange = useCallback((expanded: boolean) => {
      setExpanded(expanded);
    }, []);

    return (
      <CollapsibleCard
        title="Title"
        {...otherProps}
        description="Description"
        titleRightElement={
          <StatusIconSolid
            variant="success"
            size="medium"
            isReadOnly={args.readOnly}
            isDisabled={args.disabled}
            aria-hidden
          />
        }
        isExpanded={expanded}
        onExpandChange={handleExpandChange}
        {...((args.disabled || args.readOnly) && { defaultIsExpanded: undefined, isExpanded: undefined })}
      >
        content
      </CollapsibleCard>
    );
  },
  parameters: {
    docs: { source: { type: 'code' } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ControlledCollapsibleCardList: StoryObj<typeof CollapsibleCard> = {
  render: (args) => {
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    const { defaultIsExpanded, onExpandChange, header, title, ...otherProps } = args;

    const handleExpandChange = useCallback(
      (expanded: boolean, card: string): void => {
        setSelectedCards(expanded ? [card] : selectedCards.filter((c) => c !== card));
      },
      [selectedCards]
    );

    return (
      <Group variant="vertical">
        {['1', '2', '3'].map((card) => (
          <CollapsibleCard
            key={card}
            {...otherProps}
            title={`${title} ${card}`}
            description="Description"
            titleRightElement={
              <StatusIconSolid
                variant="success"
                size="medium"
                isReadOnly={args.readOnly}
                isDisabled={args.disabled}
                aria-hidden
              />
            }
            isExpanded={selectedCards.includes(card)}
            onExpandChange={(expanded) => handleExpandChange(expanded, card)}
            {...((args.disabled || args.readOnly) && { defaultIsExpanded: undefined, isExpanded: undefined })}
          />
        ))}
      </Group>
    );
  },
  parameters: {
    docs: { source: { type: 'code' } },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
