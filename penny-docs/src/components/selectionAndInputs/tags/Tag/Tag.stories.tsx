import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { RelatedComponent, RelatedComponents } from '@/storybook-utils/RelatedComponents';

import { Tag } from './Tag';

type PlaygroundArgs = {
  label: string;
  removable: boolean;
  clickable: boolean;
  disabled: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Selection & Inputs/Tag',
  argTypes: {
    label: { control: 'text', description: 'Tag content.', table: { category: 'content', type: { summary: 'ReactNode' } } },
    removable: {
      control: 'boolean',
      description: 'Demo only — renders a remove (close) button via `removeButtonProps`.',
      table: { category: 'props', type: { summary: 'boolean' } },
    },
    clickable: {
      control: 'boolean',
      description: 'Demo only — makes the tag interactive via `onClick`.',
      table: { category: 'props', type: { summary: 'boolean' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the tag.',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' }, category: 'props' },
    },
  },
  args: { label: 'Label', removable: false, clickable: false, disabled: false },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  name: 'Playground',
  parameters: { layout: 'fullscreen', controls: { include: ['label', 'removable', 'clickable', 'disabled'] } },
  render: ({ label, removable, clickable, disabled }) => (
    <div style={{ padding: '32px' }}>
      <Tag
        disabled={disabled}
        {...(clickable ? { onClick: () => {} } : {})}
        {...(removable ? { removeButtonProps: { onClick: () => {} } } : {})}
      >
        {label}
      </Tag>
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <Group spacing="s" alignItems="center">
      <Tag>Draft</Tag>
      <Tag>In review</Tag>
      <Tag>Approved</Tag>
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const Removable: Story = {
  render: () => (
    <Group spacing="s" alignItems="center">
      <Tag removeButtonProps={{ onClick: () => {} }}>Due date</Tag>
      <Tag removeButtonProps={{ onClick: () => {} }}>Vendor: Acme</Tag>
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const Clickable: Story = {
  render: () => (
    <Group spacing="s" alignItems="center">
      <Tag onClick={() => {}}>All bills</Tag>
      <Tag onClick={() => {}}>Unpaid</Tag>
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const WithLeftElement: Story = {
  render: () => (
    <Group spacing="s" alignItems="center">
      <Tag>
        <Icon type="info" size="small" color="inherit" aria-hidden />
        Info
      </Tag>
      <Tag removeButtonProps={{ onClick: () => {} }}>
        <Icon type="filter" size="small" color="inherit" aria-hidden />
        Filter
      </Tag>
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const Disabled: Story = {
  render: () => (
    <Group spacing="s" alignItems="center">
      <Tag disabled>Disabled</Tag>
      <Tag disabled onClick={() => {}}>
        Disabled clickable
      </Tag>
      <Tag disabled removeButtonProps={{ onClick: () => {} }}>
        Disabled removable
      </Tag>
    </Group>
  ),
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

const INITIAL = ['Due: this week', 'Created: May', 'Vendor: Acme', 'Status: Unpaid'];

export const GroupOfTags: Story = {
  render: function GroupOfTagsStory() {
    const [tags, setTags] = useState(INITIAL);
    return (
      <div style={{ fontFamily: 'Poppins, sans-serif' }}>
        <Group spacing="s" alignItems="center" allowOverflowX>
          {tags.map((t) => (
            <Tag key={t} removeButtonProps={{ onClick: () => setTags((prev) => prev.filter((x) => x !== t)) }}>
              {t}
            </Tag>
          ))}
        </Group>
        {tags.length === 0 && (
          <button
            type="button"
            onClick={() => setTags(INITIAL)}
            style={{ marginTop: '16px', fontSize: '13px', color: '#5C3EC5', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Reset
          </button>
        )}
      </div>
    );
  },
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
};

export const RelatedComponentsBlock: StoryObj = {
  name: 'Related',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <RelatedComponents>
      <RelatedComponent name="Pill" url="/?path=/docs/components-data-display-pill--docs" preview={<Tag>Label</Tag>} />
      <RelatedComponent
        name="Button"
        url="/?path=/docs/components-action-button--docs"
        preview={<Tag removeButtonProps={{ onClick: () => {} }}>Removable</Tag>}
      />
    </RelatedComponents>
  ),
};
