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

import { InteractiveTag } from './InteractiveTag';

const removeButtonPropsType = `{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  ref?: RefObject<HTMLButtonElement>
}`;

/**
 * The `InteractiveTag` component extends the `Tag` component to provide interactivity.
 *
 * ### Key Features:
 * - **Flexible Content**: Accepts any free content as children.
 * - **Automatic Styling**: Ensures 8px spacing between child elements and applies text styles based on design guidelines.
 *   - If text is inserted directly as a child (`<InteractiveTag>Label</InteractiveTag>`), it automatically inherits the default text styles, eliminating the need for wrapping it inside a `Text` component.
 * - **Clickable Interaction**: Supports hover and pressed interaction styles when `onClick` is provided.
 * - **Removable**: Can display a remove button with configurable `removeButtonProps`.
 * - **Accessible by Design**:
 *   - Prevents accessibility violations caused by nested interactive elements when combining clickable and removable functionalities.
 *   - Ensures focus management and correct ARIA attributes for assistive technologies.
 */
const meta: Meta<typeof InteractiveTag> = {
  title: 'Selection & Inputs Components/Tags/Interactive Tag [new]',
  component: InteractiveTag,
  argTypes: {
    children: {
      control: false,
      description: 'The content of the tag.',
      type: { required: true, name: 'string' },
      table: { type: { summary: 'ReactNode' }, category: 'props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Determines if the tag is disabled.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
    'data-testid': {
      control: 'text',
      description: 'The `data-testid` attribute for testing purposes.',
      table: { defaultValue: { summary: 'interactive-tag' }, type: { summary: 'string' }, category: 'tests' },
    },
    role: {
      control: 'text',
      description: "The semantic meaning of the element. when the onClick provided default set to 'button'",
      table: {
        type: { summary: 'AriaRole' },
        category: 'accessibility',
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Handles the click event of the InteractiveTag.',
      table: {
        type: { summary: 'MouseEventHandler<HTMLButtonElement>' },
        category: 'events',
      },
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
    'data-testid': 'interactive-tag',
    children: 'Label',
    disabled: false,
    onClick: undefined,
  },
};
export default meta;

export const Main: StoryObj<typeof InteractiveTag> = {
  render: (args) => (
    <InteractiveTag
      {...args}
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log('InteractiveTag clicked');
      }}
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Disabled: StoryObj<typeof InteractiveTag> = {
  render: (args) => (
    <InteractiveTag
      {...args}
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log('InteractiveTag clicked');
      }}
      disabled
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Clickable: StoryObj<typeof InteractiveTag> = {
  render: (args) => {
    const [counter, setCounter] = useState(0);
    return (
      <Group variant="vertical">
        <InteractiveTag
          {...args}
          onClick={() => {
            setCounter((prev) => prev + 1);
          }}
        >
          Clickable
        </InteractiveTag>
        {Boolean(counter) && <Text>InteractiveTag clicked {counter} times</Text>}
      </Group>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
      (args) => (
        <InteractiveTag {...args} onClick={() => {
          // eslint-disable-next-line no-console
          console.log('InteractiveTag clicked');
        }}
        >
          Clickable
        </InteractiveTag>
      )`,
      },
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Removable: StoryObj<typeof InteractiveTag> = {
  render: (args) => {
    const [showTag, setShowTag] = useBoolean(true);
    return showTag ? (
      <InteractiveTag {...args} removeButtonProps={{ onClick: setShowTag.off }}>
        Label
      </InteractiveTag>
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
        code: `
        (args) => (<InteractiveTag {...args} removeButtonProps={{ onClick: console.log('Remove') }} />)`,
      },
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const ClickableAndRemovable: StoryObj<typeof InteractiveTag> = {
  render: () => {
    const [showTag, setShowTag] = useBoolean(true);
    const [counter, setCounter] = useState(0);
    return (
      <Group variant="vertical">
        {showTag ? (
          <InteractiveTag
            onClick={() => {
              setCounter((prev) => prev + 1);
            }}
            removeButtonProps={{
              onClick: () => {
                setShowTag.off();
                setCounter(0);
              },
            }}
          >
            Clickable and Removable
          </InteractiveTag>
        ) : (
          <Group alignItems="center">
            {`You've removed the Tag, refresh the story.`}
            <IconButton aria-label="Refresh" variant="tertiary" icon="refresh" onClick={setShowTag.on} size="small" />
          </Group>
        )}
        {Boolean(counter) && <Text>InteractiveTag clicked {counter} times</Text>}
      </Group>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
        (args) => (
        <InteractiveTag {...args}
          onClick={() => {
            console.log('InteractiveTag clicked');
          }}
          removeButtonProps={{ onClick: console.log('Remove') }}
        >
          Clickable and Removable
        </InteractiveTag>)`,
      },
    },
  },
};

/**
 * `InteractiveTag` supports any content. When it has multiple children, a default gap of `xs` (8px) is applied between them.
 */
export const Anatomy: StoryObj<typeof InteractiveTag> = {
  render: () => {
    const items = [
      {
        component: (
          <InteractiveTag>
            <Storybook.ContentPlaceholder label="1" height="20px" width="fit-content" />
          </InteractiveTag>
        ),
      },
      {
        component: (
          <InteractiveTag>
            <Storybook.ContentPlaceholder label="1" height="20px" width="fit-content" />
            <Storybook.ContentPlaceholder label="2" height="20px" width="fit-content" />
            <Storybook.ContentPlaceholder label="3" height="20px" width="fit-content" />
          </InteractiveTag>
        ),
      },
      {
        component: (
          <InteractiveTag>
            <Storybook.ContentPlaceholder label="1" height="20px" width="fit-content" />
            Label
            <Storybook.ContentPlaceholder label="3" height="20px" width="fit-content" />
          </InteractiveTag>
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
 * Examples demonstrating how to override default behavior and styles:
 * - To customize tag spacing, wrap the content and apply a custom spacing.
 * - If using decorative icons or images, hide them with `aria-hidden="true"` (see the first and second tag examples).
 * - When rendering `children` as a React element, override the `aria-label` in `removeButtonProps` to ensure a proper accessible name (see the third tag example).
 * - When the tag is both clickable and removable and includes an additional interactive element, such as a link, wrap the content in a container with `position: relative` to ensure proper layering.
 */
export const OverrideDefaultStyle: StoryObj<typeof InteractiveTag> = {
  render: () => {
    const [showTag, setShowTag] = useBoolean(true);
    const items = [
      {
        component: (
          <InteractiveTag>
            <Icon size="small" type="bank" color="inherit" aria-hidden />
            <Text textStyle="body3Semi">Label</Text>
            Label
          </InteractiveTag>
        ),
      },
      {
        component: (
          <InteractiveTag>
            <Avatar size="small" src="/assets/Robin.jpeg" name="Robin the Dog" aria-hidden />
            <Text textStyle="body3Semi">Label</Text>
            Robin the Dog
          </InteractiveTag>
        ),
      },
      {
        component: showTag ? (
          <InteractiveTag
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('Clicked');
            }}
            removeButtonProps={{ onClick: setShowTag.off, 'aria-label': 'Remove Clickable tag' }}
          >
            <Group position="relative" spacing="xs">
              <Text textStyle="body3Semi">Clickable</Text>
              <Link href="#" variant="inline" label="Read more..." />
            </Group>
          </InteractiveTag>
        ) : (
          <Group alignItems="center">
            {`You've removed the Tag, refresh the story.`}
            <IconButton aria-label="Refresh" variant="tertiary" icon="refresh" onClick={setShowTag.on} size="small" />
          </Group>
        ),
      },
    ];
    return <Storybook.Row items={items} />;
  },
};

/**
 * This example demonstrates how to correctly render a group of `InteractiveTag` components as a list.
 * - The group of tags is wrapped in a `ul` element to provide semantic list structure.
 * - Each tag is wrapped in a `li` element with `role="listitem"` to ensure proper announcement by screen readers.
 * - The `aria-label="Removable interactive tags"` describes the purpose of the list for assistive technologies.
 */
export const GroupOfInteractiveTags: StoryObj<typeof InteractiveTag> = {
  render: () => {
    const tags = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];
    const [removedTags, setRemovedTags] = useState<string[]>([]);
    const filteredTags = tags.filter((tag) => !removedTags.includes(tag));

    return (
      <Group as="ul" role="list" aria-label="Removable interactive tags">
        {filteredTags.map((tag) => (
          <Storybook.Container as="li" role="listitem" key={tag} listStyleType="none">
            <InteractiveTag removeButtonProps={{ onClick: () => setRemovedTags([...removedTags, tag]) }}>
              {tag}
            </InteractiveTag>
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
