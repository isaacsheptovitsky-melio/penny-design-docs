import { useBoolean } from '@melio/penny-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Storybook } from 'storybook-utils';

import { IconButton } from '@/components/action/IconButton';
import { Group } from '@/components/containers/Group';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { Text } from '@/components/dataDisplay/Text';
import { Icon } from '@/components/foundations/Icon';
import { Link } from '@/components/navigation/Link';

import { Tag } from './Tag';

const removeButtonPropsType = `{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  ref?: RefObject<HTMLButtonElement>
}`;

/**
 * ### Key Features:
 * - **Flexible Content**: Accepts free content as children.
 * - **Automatic Styling**: Provides 8px spacing between child elements and applies text styles based on design guidelines.
 *   - If text is inserted directly as a child (`<Tag>Label</Tag>`), it automatically inherits the default text styles, eliminating the need for wrapping it inside a `Text` component.
 * - **Removable**: Can display a remove button with configurable `removeButtonProps`.
 */
const meta: Meta<typeof Tag> = {
  title: 'Selection & Inputs Components/Tags/Tag [new]',
  component: Tag,
  argTypes: {
    disabled: {
      table: { disable: true },
    },
    children: {
      control: false,
      description: 'The content of the tag.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'tag' }, type: { summary: 'string' }, category: 'tests' },
    },
    removeButtonProps: {
      control: 'object',
      description: 'Configuring the remove button (e.g., onClick to handle removal).',
      table: {
        type: {
          summary: 'RemoveButtonProps',
          detail: removeButtonPropsType,
        },
        category: 'props',
      },
    },
  },
  args: {
    'data-testid': 'tag',
    children: 'Label',
    disabled: false,
  },
};
export default meta;

export const Main: StoryObj<typeof Tag> = {
  render: (args) => <Tag {...args} />,
};

export const Removable: StoryObj<typeof Tag> = {
  render: (args) => {
    const [showTag, setShowTag] = useBoolean(true);
    return showTag ? (
      <Tag {...args} removeButtonProps={{ onClick: setShowTag.off }}>
        Label
      </Tag>
    ) : (
      <Group alignItems="center">
        {`You've removed the Tag, refresh the story.`}
        <IconButton aria-label="Refresh" variant="tertiary" icon="refresh" onClick={setShowTag.on} size="small" />
      </Group>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `(args) => (<Tag {...args} removeButtonProps={{ onClick: console.log('Remove') }} />)`,
      },
    },
  },
};

/**
 * `Tag` supports any content. When it has multiple children, a default gap of `xs` (8px) is applied between them.
 */
export const Anatomy: StoryObj<typeof Tag> = {
  render: () => {
    const items = [
      {
        component: (
          <Tag>
            <Storybook.ContentPlaceholder label="1" height="20px" width="fit-content" />
          </Tag>
        ),
      },
      {
        component: (
          <Tag>
            <Storybook.ContentPlaceholder label="1" height="20px" width="fit-content" />
            <Storybook.ContentPlaceholder label="2" height="20px" width="fit-content" />
            <Storybook.ContentPlaceholder label="3" height="20px" width="fit-content" />
          </Tag>
        ),
      },
      {
        component: (
          <Tag>
            <Storybook.ContentPlaceholder label="1" height="20px" width="fit-content" />
            Label
            <Storybook.ContentPlaceholder label="3" height="20px" width="fit-content" />
          </Tag>
        ),
      },
    ];
    return <Storybook.Row items={items} />;
  },
};

/**
 * Examples demonstrating how to override default behavior and styles:
 * - To customize tag spacing, wrap the content and apply a custom spacing.
 * - If using decorative icons or images, hide them with `aria-hidden="true"` (see the first and second tag examples).
 */
export const OverrideDefaultStyle: StoryObj<typeof Tag> = {
  render: () => {
    const items = [
      {
        component: (
          <Tag>
            <Icon size="small" type="bank" color="inherit" aria-hidden />
            <Text textStyle="body3Semi">Label</Text>
            Label
          </Tag>
        ),
      },
      {
        component: (
          <Tag>
            <Avatar size="small" src="/assets/Robin.jpeg" name="Robin the Dog" aria-hidden />
            <Text textStyle="body3Semi">Label</Text>
            Robin the Dog
          </Tag>
        ),
      },
      {
        component: (
          <Tag>
            <Group spacing="s">
              <Text textStyle="body3Semi">Label</Text>
              <Link href="#" variant="inline" label="Read more..." />
            </Group>
          </Tag>
        ),
      },
    ];
    return <Storybook.Row items={items} />;
  },
};

/**
 * This example demonstrates how to correctly render a group of `Tag` components as a list.
 * - The group of tags is wrapped in a `ul` element to provide semantic list structure.
 * - Each tag is wrapped in a `li` element with `role="listitem"` to ensure proper announcement by screen readers.
 * - The `aria-label="Removable tags"` describes the purpose of the list for assistive technologies.
 */
export const GroupOfTags: StoryObj<typeof Tag> = {
  render: () => {
    const tags = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];
    const [removedTags, setRemovedTags] = useState<string[]>([]);
    const filteredTags = tags.filter((tag) => !removedTags.includes(tag));

    return (
      <Group as="ul" role="list" aria-label="Removable tags">
        {filteredTags.map((tag) => (
          <Storybook.Container as="li" role="listitem" key={tag} listStyleType="none">
            <Tag removeButtonProps={{ onClick: () => setRemovedTags([...removedTags, tag]) }}>{tag}</Tag>
          </Storybook.Container>
        ))}
      </Group>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
